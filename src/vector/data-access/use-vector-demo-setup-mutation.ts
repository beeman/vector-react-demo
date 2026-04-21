import { getCreateAccountInstruction } from '@solana-program/system'
import {
  findAssociatedTokenPda,
  getCreateAssociatedTokenInstructionAsync,
  getInitializeMint2Instruction,
  getMintSize,
  TOKEN_PROGRAM_ADDRESS,
} from '@solana-program/token'
import { type Address, generateKeyPairSigner, type Instruction } from '@solana/kit'
import { useMutation } from '@tanstack/react-query'
import { type UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useState } from 'react'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { createSolanaTransactionMessage } from '@/solana/data-access/create-solana-transaction-message'
import { executeSolanaTransactionMessage } from '@/solana/data-access/execute-solana-transaction-message'
import { vectorComputeBudget } from '@/vector/data-access/vector-protocol'

export interface VectorDemoSetupResult {
  destinationAtaAddress: Address
  mintAddress: Address
}

export function useVectorDemoSetupMutation({
  account,
  client,
  vectorAddress,
}: {
  account: UiWalletAccount
  client: SolanaClient
  vectorAddress: Address
}) {
  const transactionSigner = useWalletUiSigner({ account })
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [signature, setSignature] = useState<null | string>(null)
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      const mintSigner = await generateKeyPairSigner()
      const [destinationAtaAddress] = await findAssociatedTokenPda({
        mint: mintSigner.address,
        owner: transactionSigner.address,
        tokenProgram: TOKEN_PROGRAM_ADDRESS,
      })
      const createAssociatedTokenInstruction = await getCreateAssociatedTokenInstructionAsync({
        mint: mintSigner.address,
        owner: transactionSigner.address,
        payer: transactionSigner,
      })
      const mintRent = await client.rpc
        .getMinimumBalanceForRentExemption(BigInt(getMintSize()), { commitment: 'confirmed' })
        .send()
      const tokenAccountRent = await client.rpc
        .getMinimumBalanceForRentExemption(165n, { commitment: 'confirmed' })
        .send()
      const instructions: readonly Instruction[] = [
        getCreateAccountInstruction({
          lamports: mintRent,
          newAccount: mintSigner,
          payer: transactionSigner,
          programAddress: TOKEN_PROGRAM_ADDRESS,
          space: BigInt(getMintSize()),
        }),
        getInitializeMint2Instruction({
          decimals: 6,
          freezeAuthority: null,
          mint: mintSigner.address,
          mintAuthority: vectorAddress,
        }),
        createAssociatedTokenInstruction,
      ] as const
      const transactionMessage = await createSolanaTransactionMessage({
        client,
        computeBudget: vectorComputeBudget,
        instructions,
        transactionSigner,
      })
      const signature = await executeSolanaTransactionMessage({
        client,
        insufficientBalanceMessage:
          'Not enough SOL to pay transaction fees and fund the demo mint and token account on this cluster.',
        requiredBalance: mintRent + tokenAccountRent,
        transactionMessage,
      })

      return {
        destinationAtaAddress,
        mintAddress: mintSigner.address,
        signature,
      }
    },
  })

  async function prepareDemo() {
    setErrorMessage(null)
    setSignature(null)

    try {
      const result = await mutateAsync()

      setSignature(result.signature)

      return {
        destinationAtaAddress: result.destinationAtaAddress,
        mintAddress: result.mintAddress,
      } satisfies VectorDemoSetupResult
    } catch (error) {
      setErrorMessage(formatMutationError(error))

      return null
    }
  }

  return {
    errorMessage,
    isLoading: isPending,
    prepareDemo,
    signature,
  }
}

function formatMutationError(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown error occurred.'
}
