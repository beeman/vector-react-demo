import { type KeyPairSigner } from '@solana/kit'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type SolanaClusterId, type UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useState } from 'react'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { executeSolanaTransactionMessageWithSingleSendingSigner } from '@/solana/data-access/execute-solana-transaction-message'
import { assertVectorProgramIsAvailable } from '@/vector/data-access/assert-vector-program-is-available'
import { formatMutationError } from '@/vector/data-access/format-mutation-error'
import { getVectorProgramAddress } from '@/vector/data-access/get-vector-program-address'
import { getVectorAccountQueryKey } from '@/vector/data-access/use-vector-account-query'
import { createSignedCloseTransactionMessage } from '@/vector/data-access/vector-protocol'

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

      const transactionMessage = await createSignedCloseTransactionMessage({
        client,
        closeTo: transactionSigner.address,
        programAddress,
        seed,
        signer,
        transactionSigner,
      })

      return await executeSolanaTransactionMessageWithSingleSendingSigner({
        client,
        insufficientBalanceMessage: 'Not enough SOL to pay transaction fees on this cluster.',
        requiredBalance: 0n,
        transactionMessage,
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
