import { type Instruction } from '@solana/instructions'
import {
  type Address,
  appendTransactionMessageInstructions,
  createTransactionMessage,
  pipe,
  prependTransactionMessageInstructions,
  setTransactionMessageComputeUnitLimit,
  setTransactionMessageComputeUnitPrice,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  type TransactionSigner,
} from '@solana/kit'

import type { SolanaClient } from '@/solana/data-access/solana-client'

const VECTOR_COMPUTE_UNIT_LIMIT = 600_000
const VECTOR_COMPUTE_UNIT_PRICE = 125_000n

export async function createVectorTransactionMessage({
  client,
  instructions,
  transactionSigner,
}: {
  client: SolanaClient
  instructions: readonly Instruction[]
  transactionSigner: TransactionSigner
}) {
  const { value: latestBlockhash } = await client.rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()

  return pipe(
    createTransactionMessage({ version: 0 }),
    (message) => setTransactionMessageFeePayerSigner(transactionSigner, message),
    (message) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, message),
    (message) => appendTransactionMessageInstructions(instructions, message),
    (message) => prependTransactionMessageInstructions(getVectorComputeBudgetInstructions(), message),
  )
}

export function getVectorComputeBudgetInstructions() {
  const instructions = pipe(
    createTransactionMessage({ version: 0 }),
    (message) => setTransactionMessageComputeUnitPrice(VECTOR_COMPUTE_UNIT_PRICE, message),
    (message) => setTransactionMessageComputeUnitLimit(VECTOR_COMPUTE_UNIT_LIMIT, message),
  ).instructions as readonly {
    data: Uint8Array
    programAddress: Address
  }[]

  return instructions.map((instruction) => ({
    accounts: [],
    data: instruction.data,
    programAddress: instruction.programAddress,
  }))
}
