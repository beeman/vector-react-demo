import {
  assertIsTransactionMessageWithSingleSendingSigner,
  compileTransactionMessage,
  getBase58Decoder,
  getBase64Decoder,
  getCompiledTransactionMessageEncoder,
  type Instruction,
  signAndSendTransactionMessageWithSigners,
  type TransactionMessageBytesBase64,
  type TransactionSigner,
} from '@solana/kit'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { createVectorTransactionMessage } from '@/vector/data-access/create-vector-transaction-message'

const FAILED_TO_ESTIMATE_TRANSACTION_FEE_ERROR =
  'Unable to estimate the transaction fee. Try again with a fresh blockhash.'
const MISSING_TRANSACTION_SIGNATURE_ERROR = 'Transaction submitted but no signature was returned by the wallet adapter.'

export async function executeVectorTransaction({
  client,
  instructions,
  requiredBalance,
  transactionSigner,
}: {
  client: SolanaClient
  instructions: readonly Instruction[]
  requiredBalance: {
    additionalLamports: bigint
    insufficientFundsMessage: string
  }
  transactionSigner: TransactionSigner
}) {
  const transactionMessage = await createVectorTransactionMessage({
    client,
    instructions,
    transactionSigner,
  })

  assertIsTransactionMessageWithSingleSendingSigner(transactionMessage)

  const encodedTransactionMessage = getCompiledTransactionMessageEncoder().encode(
    compileTransactionMessage(transactionMessage),
  )
  const [{ value: balance }, { value: fee }] = await Promise.all([
    client.rpc.getBalance(transactionSigner.address, { commitment: 'confirmed' }).send(),
    client.rpc
      .getFeeForMessage(getBase64Decoder().decode(encodedTransactionMessage) as TransactionMessageBytesBase64, {
        commitment: 'confirmed',
      })
      .send(),
  ])

  if (fee === null) {
    throw new Error(FAILED_TO_ESTIMATE_TRANSACTION_FEE_ERROR)
  }
  if (balance < fee + requiredBalance.additionalLamports) {
    throw new Error(requiredBalance.insufficientFundsMessage)
  }

  const signatureBytes = await signAndSendTransactionMessageWithSigners(transactionMessage)
  const signature = getBase58Decoder().decode(signatureBytes)

  if (!signature) {
    throw new Error(MISSING_TRANSACTION_SIGNATURE_ERROR)
  }

  return signature
}
