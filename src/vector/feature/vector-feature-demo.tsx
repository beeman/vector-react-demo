import { fetchMint, fetchToken } from '@solana-program/token'
import { type Address, type KeyPairSigner } from '@solana/kit'
import { useQuery } from '@tanstack/react-query'
import { type SolanaClusterId, type UiWalletAccount } from '@wallet-ui/react'

import { useSolanaClient } from '@/solana/data-access/use-solana-client'
import { useVectorAdvanceDemoMutation } from '@/vector/data-access/use-vector-advance-demo-mutation'
import { useVectorCloseMutation } from '@/vector/data-access/use-vector-close-mutation'
import {
  useVectorDemoSetupMutation,
  type VectorDemoSetupResult,
} from '@/vector/data-access/use-vector-demo-setup-mutation'
import { VectorUiAdvanceDemoCard } from '@/vector/ui/vector-ui-advance-demo-card'
import { VectorUiCloseCard } from '@/vector/ui/vector-ui-close-card'

export function VectorFeatureDemo({
  account,
  cluster,
  demoSetup,
  onDemoSetupChange,
  seed,
  signer,
  vectorAddress,
}: {
  account: UiWalletAccount
  cluster: SolanaClusterId
  demoSetup: null | VectorDemoSetupResult
  onDemoSetupChange(nextState: null | VectorDemoSetupResult): void
  seed: Uint8Array
  signer: KeyPairSigner
  vectorAddress: Address
}) {
  const client = useSolanaClient()
  const demoSetupMutation = useVectorDemoSetupMutation({
    account,
    client,
    vectorAddress,
  })
  const advanceDemoMutation = useVectorAdvanceDemoMutation({
    account,
    client,
    cluster,
    destinationAtaAddress: demoSetup?.destinationAtaAddress ?? null,
    mintAddress: demoSetup?.mintAddress ?? null,
    seed,
    signer,
    vectorAddress,
  })
  const closeMutation = useVectorCloseMutation({
    account,
    client,
    cluster,
    seed,
    signer,
  })
  // demoSetup and client.rpc are session-local inputs and should not change query cache identity.
  // eslint-disable-next-line @tanstack/query/exhaustive-deps
  const demoStateQuery = useQuery({
    enabled: !!demoSetup,
    queryFn: async () => {
      if (!demoSetup) {
        throw new Error('Prepare the demo assets before loading their state.')
      }

      const [mintAccount, tokenAccount] = await Promise.all([
        fetchMint(client.rpc, demoSetup.mintAddress),
        fetchToken(client.rpc, demoSetup.destinationAtaAddress),
      ])

      return {
        destinationAmount: tokenAccount.data.amount,
        destinationAtaAddress: demoSetup.destinationAtaAddress,
        mintAddress: demoSetup.mintAddress,
        mintAuthority: mintAccount.data.mintAuthority.__option === 'Some' ? mintAccount.data.mintAuthority.value : null,
      }
    },
    queryKey: ['vector-demo-state', cluster, demoSetup?.destinationAtaAddress ?? null, demoSetup?.mintAddress ?? null],
  })
  const demoState = demoStateQuery.data
    ? demoStateQuery.data
    : demoSetup
      ? {
          destinationAmount: null,
          destinationAtaAddress: demoSetup.destinationAtaAddress,
          mintAddress: demoSetup.mintAddress,
          mintAuthority: null,
        }
      : null

  async function handleAdvance() {
    const signature = await advanceDemoMutation.advanceDemo()

    if (!signature) {
      return null
    }

    void demoStateQuery.refetch()

    return signature
  }

  async function handleClose() {
    const signature = await closeMutation.closeVector()

    if (!signature) {
      return null
    }

    onDemoSetupChange(null)

    return signature
  }

  async function handlePrepare() {
    const nextSetup = await demoSetupMutation.prepareDemo()

    if (!nextSetup) {
      return null
    }

    onDemoSetupChange(nextSetup)

    return nextSetup
  }

  return (
    <div className="space-y-6">
      <VectorUiAdvanceDemoCard
        advanceErrorMessage={advanceDemoMutation.errorMessage}
        advanceIsLoading={advanceDemoMutation.isLoading}
        advanceSignature={advanceDemoMutation.signature}
        demoState={demoState}
        isRefreshing={demoStateQuery.isFetching}
        onAdvance={handleAdvance}
        onPrepare={handlePrepare}
        prepareErrorMessage={demoSetupMutation.errorMessage}
        prepareIsLoading={demoSetupMutation.isLoading}
        prepareSignature={demoSetupMutation.signature}
        vectorAddress={vectorAddress}
      />
      <VectorUiCloseCard
        closeErrorMessage={closeMutation.errorMessage}
        closeIsLoading={closeMutation.isLoading}
        closeSignature={closeMutation.signature}
        closeToAddress={account.address}
        onClose={handleClose}
      />
    </div>
  )
}
