import { type Instruction } from '@solana/instructions'
import {
  appendTransactionMessageInstructions,
  createTransactionMessage,
  pipe,
  setTransactionMessageComputeUnitLimit,
  setTransactionMessageComputeUnitPrice,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  type TransactionSigner,
} from '@solana/kit'

import type { SolanaClient } from '@/solana/data-access/solana-client'

export type SolanaComputeBudget = Readonly<{
  limit: number
  price: bigint
}>

export async function createSolanaTransactionMessage({
  client,
  computeBudget,
  instructions,
  transactionSigner,
}: {
  client: SolanaClient
  computeBudget: SolanaComputeBudget
  instructions: readonly Instruction[]
  transactionSigner: TransactionSigner
}) {
  const { value: latestBlockhash } = await client.rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()
  const computeBudgetInstructions = getSolanaComputeBudgetInstructions(computeBudget)

  return pipe(
    createTransactionMessage({ version: 0 }),
    (message) => setTransactionMessageFeePayerSigner(transactionSigner, message),
    (message) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, message),
    (message) => appendTransactionMessageInstructions([...computeBudgetInstructions, ...instructions], message),
  )
}

export function getSolanaComputeBudgetInstructions({ limit, price }: SolanaComputeBudget) {
  return pipe(
    createTransactionMessage({ version: 0 }),
    (message) => setTransactionMessageComputeUnitPrice(price, message),
    (message) => setTransactionMessageComputeUnitLimit(limit, message),
  ).instructions as readonly Instruction[]
}
