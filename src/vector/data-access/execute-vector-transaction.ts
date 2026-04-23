import { type Instruction, type TransactionSendingSigner } from '@solana/kit'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { createSolanaTransactionMessage } from '@/solana/data-access/create-solana-transaction-message'
import { executeSolanaTransactionMessageWithSingleSendingSigner } from '@/solana/data-access/execute-solana-transaction-message'
import { vectorComputeBudget } from '@/vector/data-access/vector-protocol'

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
  transactionSigner: TransactionSendingSigner
}) {
  const transactionMessage = await createSolanaTransactionMessage({
    client,
    computeBudget: vectorComputeBudget,
    instructions,
    transactionSigner,
  })

  return await executeSolanaTransactionMessageWithSingleSendingSigner({
    client,
    insufficientBalanceMessage: requiredBalance.insufficientFundsMessage,
    requiredBalance: requiredBalance.additionalLamports,
    transactionMessage,
  })
}
