import {
  assertIsTransactionMessageWithBlockhashLifetime,
  assertIsTransactionMessageWithSingleSendingSigner,
  assertIsTransactionWithBlockhashLifetime,
  type Commitment,
  compileTransactionMessage,
  getBase58Decoder,
  getBase64Decoder,
  getCompiledTransactionMessageEncoder,
  getSignatureFromTransaction,
  sendAndConfirmTransactionFactory,
  signAndSendTransactionMessageWithSigners,
  type Signature,
  signTransactionMessageWithSigners,
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
type ExecuteSolanaTransactionMessageInput = {
  client: SolanaClient
  insufficientBalanceMessage: string
  requiredBalance: bigint
  transactionMessage: ExecutableTransactionMessage
}

const COMMITMENT = 'confirmed' satisfies Commitment

export async function executeSolanaTransactionMessageWithSigners({
  client,
  insufficientBalanceMessage,
  requiredBalance,
  transactionMessage,
}: ExecuteSolanaTransactionMessageInput) {
  await assertSolanaTransactionMessageCanBeExecuted({
    client,
    insufficientBalanceMessage,
    requiredBalance,
    transactionMessage,
  })
  const signedTransaction = await signTransactionMessageWithSigners(transactionMessage)
  const signature = getSignatureFromTransaction(signedTransaction)

  if (!signature) {
    throw new Error('Transaction signed but no signature was returned by the signer set.')
  }

  assertIsTransactionWithBlockhashLifetime(signedTransaction)
  await sendAndConfirmTransactionFactory(client)(signedTransaction, { commitment: COMMITMENT })

  return signature
}

export async function executeSolanaTransactionMessageWithSingleSendingSigner({
  client,
  insufficientBalanceMessage,
  requiredBalance,
  transactionMessage,
}: ExecuteSolanaTransactionMessageInput) {
  await assertSolanaTransactionMessageCanBeExecuted({
    client,
    insufficientBalanceMessage,
    requiredBalance,
    transactionMessage,
  })
  assertIsTransactionMessageWithSingleSendingSigner(transactionMessage)

  const signatureBytes = await signAndSendTransactionMessageWithSigners(transactionMessage)
  const signature = getBase58Decoder().decode(signatureBytes) as Signature

  if (!signature) {
    throw new Error('Transaction submitted but no signature was returned by the wallet adapter.')
  }

  await confirmRecentSignature({
    client,
    lastValidBlockHeight: transactionMessage.lifetimeConstraint.lastValidBlockHeight,
    signature,
  })

  return signature
}

async function assertSolanaTransactionMessageCanBeExecuted({
  client,
  insufficientBalanceMessage,
  requiredBalance,
  transactionMessage,
}: ExecuteSolanaTransactionMessageInput) {
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
}

async function confirmRecentSignature({
  client,
  lastValidBlockHeight,
  signature,
}: {
  client: SolanaClient
  lastValidBlockHeight: ExecutableTransactionMessage['lifetimeConstraint']['lastValidBlockHeight']
  signature: Signature
}) {
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
        lastValidBlockHeight,
      }),
    ])
  } finally {
    abortController.abort()
  }
}
