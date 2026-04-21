import {
  assertIsTransactionMessageWithBlockhashLifetime,
  type Commitment,
  compileTransactionMessage,
  getBase58Decoder,
  getBase64Decoder,
  getCompiledTransactionMessageEncoder,
  signAndSendTransactionMessageWithSigners,
  type Signature,
  type TransactionMessage,
  type TransactionMessageBytesBase64,
  type TransactionMessageWithBlockhashLifetime,
  type TransactionMessageWithFeePayerSigner,
  type TransactionMessageWithSigners,
} from '@solana/kit'
import { safeRace } from '@solana/promises'
import {
  createBlockHeightExceedencePromiseFactory,
  createRecentSignatureConfirmationPromiseFactory,
} from '@solana/transaction-confirmation'

import type { SolanaClient } from '@/solana/data-access/solana-client'

type ExecutableTransactionMessage = TransactionMessage &
  TransactionMessageWithBlockhashLifetime &
  TransactionMessageWithFeePayerSigner &
  TransactionMessageWithSigners

const COMMITMENT = 'confirmed' satisfies Commitment

export async function executeSolanaTransactionMessage({
  client,
  insufficientBalanceMessage,
  requiredBalance,
  transactionMessage,
}: {
  client: SolanaClient
  insufficientBalanceMessage: string
  requiredBalance: bigint
  transactionMessage: ExecutableTransactionMessage
}) {
  const encodedTransactionMessage = getCompiledTransactionMessageEncoder().encode(
    compileTransactionMessage(transactionMessage),
  )
  const [{ value: balance }, { value: fee }] = await Promise.all([
    client.rpc.getBalance(transactionMessage.feePayer.address, { commitment: COMMITMENT }).send(),
    client.rpc
      .getFeeForMessage(getBase64Decoder().decode(encodedTransactionMessage) as TransactionMessageBytesBase64, {
        commitment: COMMITMENT,
      })
      .send(),
  ])

  if (fee === null) {
    throw new Error('Unable to estimate the transaction fee. Try again with a fresh blockhash.')
  }
  if (balance < fee + requiredBalance) {
    throw new Error(insufficientBalanceMessage)
  }

  assertIsTransactionMessageWithBlockhashLifetime(transactionMessage)

  const signatureBytes = await signAndSendTransactionMessageWithSigners(transactionMessage)
  const signature = getBase58Decoder().decode(signatureBytes) as Signature

  if (!signature) {
    throw new Error('Transaction submitted but no signature was returned by the wallet adapter.')
  }

  const abortController = new AbortController()

  try {
    await safeRace([
      createRecentSignatureConfirmationPromiseFactory(client)({
        abortSignal: abortController.signal,
        commitment: COMMITMENT,
        signature,
      }),
      createBlockHeightExceedencePromiseFactory(client)({
        abortSignal: abortController.signal,
        commitment: COMMITMENT,
        lastValidBlockHeight: transactionMessage.lifetimeConstraint.lastValidBlockHeight,
      }),
    ])
  } finally {
    abortController.abort()
  }

  return signature
}
