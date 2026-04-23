import { getAddMemoInstruction } from '@solana-program/memo'
import {
  appendTransactionMessageInstruction,
  createTransactionMessage,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  type TransactionSendingSigner,
} from '@solana/kit'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { executeSolanaTransactionMessageWithSingleSendingSigner } from '@/solana/data-access/execute-solana-transaction-message'

export async function executeWalletSignAndSendTransaction({
  client,
  text,
  transactionSigner,
}: {
  client: SolanaClient
  text: string
  transactionSigner: TransactionSendingSigner
}) {
  const { value: latestBlockhash } = await client.rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()
  const message = pipe(
    createTransactionMessage({ version: 0 }),
    (transactionMessage) => setTransactionMessageFeePayerSigner(transactionSigner, transactionMessage),
    (transactionMessage) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, transactionMessage),
    (transactionMessage) =>
      appendTransactionMessageInstruction(getAddMemoInstruction({ memo: text }), transactionMessage),
  )

  return await executeSolanaTransactionMessageWithSingleSendingSigner({
    client,
    insufficientBalanceMessage: 'Not enough SOL to pay transaction fees on this cluster.',
    requiredBalance: 0n,
    transactionMessage: message,
  })
}
