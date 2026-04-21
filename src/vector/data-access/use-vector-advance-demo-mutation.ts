import { AuthorityType, getMintToInstruction, getSetAuthorityInstruction } from '@solana-program/token'
import { type Address, type KeyPairSigner } from '@solana/kit'
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
import { signAdvanceInstruction } from '@/vector/data-access/vector-protocol'

export function useVectorAdvanceDemoMutation({
  account,
  client,
  cluster,
  destinationAtaAddress,
  mintAddress,
  seed,
  signer,
  vectorAddress,
}: {
  account: UiWalletAccount
  client: SolanaClient
  cluster: SolanaClusterId
  destinationAtaAddress: Address | null
  mintAddress: Address | null
  seed: Uint8Array
  signer: KeyPairSigner
  vectorAddress: Address
}) {
  const programAddress = getVectorProgramAddress(cluster)
  const queryClient = useQueryClient()
  const transactionSigner = useWalletUiSigner({ account })
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [signature, setSignature] = useState<null | string>(null)
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      await assertVectorProgramIsAvailable({ client, programAddress })

      if (!mintAddress || !destinationAtaAddress) {
        throw new Error('Prepare the demo mint before running the advance flow.')
      }

      const pdaToConnectedWalletInstruction = getSetAuthorityInstruction({
        authorityType: AuthorityType.MintTokens,
        newAuthority: transactionSigner.address,
        owned: mintAddress,
        owner: vectorAddress,
      })
      const mintToInstruction = getMintToInstruction({
        amount: 10_000n,
        mint: mintAddress,
        mintAuthority: transactionSigner,
        token: destinationAtaAddress,
      })
      const connectedWalletToPdaInstruction = getSetAuthorityInstruction({
        authorityType: AuthorityType.MintTokens,
        newAuthority: vectorAddress,
        owned: mintAddress,
        owner: transactionSigner,
      })
      const computeBudgetInstructions = getVectorComputeBudgetInstructions()
      const advanceInstruction = await signAdvanceInstruction({
        feePayer: transactionSigner.address,
        postInstructions: [mintToInstruction, connectedWalletToPdaInstruction],
        preInstructions: computeBudgetInstructions,
        programAddress,
        seed,
        signer,
        subInstructions: [pdaToConnectedWalletInstruction],
      })

      return await executeVectorTransaction({
        client,
        instructions: [advanceInstruction, mintToInstruction, connectedWalletToPdaInstruction],
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

  async function advanceDemo() {
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
    advanceDemo,
    errorMessage,
    isLoading: isPending,
    signature,
  }
}
