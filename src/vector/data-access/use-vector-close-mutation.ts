import { type KeyPairSigner } from '@solana/kit'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type SolanaClusterId, type UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useState } from 'react'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { assertVectorProgramIsAvailable } from '@/vector/data-access/assert-vector-program-is-available'
import { getVectorComputeBudgetInstructions } from '@/vector/data-access/create-vector-transaction-message'
import { executeVectorTransaction } from '@/vector/data-access/execute-vector-transaction'
import { formatMutationError } from '@/vector/data-access/format-mutation-error'
import { getVectorProgramAddress } from '@/vector/data-access/get-vector-program-address'
import { getVectorAccountQueryKey } from '@/vector/data-access/use-vector-account-query'
import { signCloseInstruction } from '@/vector/data-access/vector-protocol'

export function useVectorCloseMutation({
  account,
  client,
  cluster,
  seed,
  signer,
}: {
  account: UiWalletAccount
  client: SolanaClient
  cluster: SolanaClusterId
  seed: Uint8Array
  signer: KeyPairSigner
}) {
  const programAddress = getVectorProgramAddress(cluster)
  const queryClient = useQueryClient()
  const transactionSigner = useWalletUiSigner({ account })
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [signature, setSignature] = useState<null | string>(null)
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      await assertVectorProgramIsAvailable({ client, programAddress })

      const computeBudgetInstructions = getVectorComputeBudgetInstructions()
      const instruction = await signCloseInstruction({
        closeTo: transactionSigner.address,
        feePayer: transactionSigner.address,
        postInstructions: [],
        preInstructions: computeBudgetInstructions,
        programAddress,
        seed,
        signer,
      })

      return await executeVectorTransaction({
        client,
        instructions: [instruction],
        requiredBalance: {
          additionalLamports: 0n,
          insufficientFundsMessage: 'Not enough SOL to pay transaction fees on this cluster.',
        },
        transactionSigner,
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getVectorAccountQueryKey(cluster, signer.address),
      })
    },
  })

  async function closeVector() {
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
    closeVector,
    errorMessage,
    isLoading: isPending,
    signature,
  }
}
