import { type Address } from '@solana/kit'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type SolanaClusterId, type UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useState } from 'react'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { createSolanaTransactionMessage } from '@/solana/data-access/create-solana-transaction-message'
import { executeSolanaTransactionMessageWithSingleSendingSigner } from '@/solana/data-access/execute-solana-transaction-message'
import { assertVectorProgramIsAvailable } from '@/vector/data-access/assert-vector-program-is-available'
import { formatMutationError } from '@/vector/data-access/format-mutation-error'
import { getVectorProgramAddress } from '@/vector/data-access/get-vector-program-address'
import { getVectorAccountQueryKey } from '@/vector/data-access/use-vector-account-query'
import {
  createInitializeInstruction,
  VECTOR_ACCOUNT_SIZE,
  vectorComputeBudget,
} from '@/vector/data-access/vector-protocol'

export function useVectorInitializeMutation({
  account,
  client,
  cluster,
  signerAddress,
}: {
  account: UiWalletAccount
  client: SolanaClient
  cluster: SolanaClusterId
  signerAddress: Address
}) {
  const programAddress = getVectorProgramAddress(cluster)
  const queryClient = useQueryClient()
  const transactionSigner = useWalletUiSigner({ account })
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [signature, setSignature] = useState<null | string>(null)
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      await assertVectorProgramIsAvailable({ client, programAddress })

      const instruction = await createInitializeInstruction({
        payer: transactionSigner,
        programAddress,
        signerAddress,
      })
      const requiredRent = await client.rpc
        .getMinimumBalanceForRentExemption(BigInt(VECTOR_ACCOUNT_SIZE), { commitment: 'confirmed' })
        .send()
      const transactionMessage = await createSolanaTransactionMessage({
        client,
        computeBudget: vectorComputeBudget,
        instructions: [instruction],
        transactionSigner,
      })

      return await executeSolanaTransactionMessageWithSingleSendingSigner({
        client,
        insufficientBalanceMessage:
          'Not enough SOL to pay transaction fees and fund the Vector account on this cluster.',
        requiredBalance: requiredRent,
        transactionMessage,
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getVectorAccountQueryKey(cluster, signerAddress),
      })
    },
  })

  async function initialize() {
    setErrorMessage(null)
    setSignature(null)

    try {
      const nextSignature = await mutateAsync()

      setSignature(nextSignature)

      return nextSignature
    } catch (error) {
      setErrorMessage(formatMutationError(error))

      return null
    }
  }

  return {
    errorMessage,
    initialize,
    isLoading: isPending,
    signature,
  }
}
