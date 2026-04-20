import { type Address, type KeyPairSigner } from '@solana/kit'
import { type SolanaClusterId, type UiWalletAccount } from '@wallet-ui/react'
import { type ReactNode } from 'react'

import { useSolanaClient } from '@/solana/data-access/use-solana-client'
import { useVectorAccountQuery } from '@/vector/data-access/use-vector-account-query'
import { useVectorInitializeMutation } from '@/vector/data-access/use-vector-initialize-mutation'
import { VectorUiAccountStateCard } from '@/vector/ui/vector-ui-account-state-card'
import { VectorUiInitializeCard } from '@/vector/ui/vector-ui-initialize-card'

export interface VectorFeatureAccountReadyProps {
  seed: Uint8Array
  vectorAddress: Address
}

export function VectorFeatureAccount({
  account,
  cluster,
  exportKeyBytesJson,
  renderReady,
  signer,
}: {
  account: UiWalletAccount
  cluster: SolanaClusterId
  exportKeyBytesJson: string
  renderReady(props: VectorFeatureAccountReadyProps): ReactNode
  signer: KeyPairSigner
}) {
  const client = useSolanaClient()
  const vectorAccountQuery = useVectorAccountQuery({
    client,
    cluster,
    signerAddress: signer.address,
  })
  const initializeMutation = useVectorInitializeMutation({
    account,
    client,
    cluster,
    signerAddress: signer.address,
  })
  const isInitialized = vectorAccountQuery.vectorAccount !== null
  const queryErrorMessage = vectorAccountQuery.isError
    ? vectorAccountQuery.error instanceof Error
      ? vectorAccountQuery.error.message
      : 'Unable to load the Vector account.'
    : null

  return (
    <div className="space-y-6">
      <VectorUiAccountStateCard
        exportKeyBytesJson={exportKeyBytesJson}
        isLoading={vectorAccountQuery.isLoading}
        isRefreshing={vectorAccountQuery.isRefreshing}
        programAddress={vectorAccountQuery.programAddress}
        programMessage={vectorAccountQuery.programMessage}
        programStatus={vectorAccountQuery.programStatus}
        queryErrorMessage={queryErrorMessage}
        signerAddress={signer.address}
        vectorAccount={vectorAccountQuery.vectorAccount}
        vectorAddress={vectorAccountQuery.vectorAddress}
      />
      {vectorAccountQuery.vectorAddress ? (
        <VectorUiInitializeCard
          disabled={
            initializeMutation.isLoading ||
            isInitialized ||
            vectorAccountQuery.isLoading ||
            vectorAccountQuery.isError ||
            vectorAccountQuery.programStatus !== 'deployed'
          }
          errorMessage={initializeMutation.errorMessage}
          isInitialized={isInitialized}
          isLoading={initializeMutation.isLoading}
          onInitialize={initializeMutation.initialize}
          signature={initializeMutation.signature}
          vectorAddress={vectorAccountQuery.vectorAddress}
        />
      ) : null}
      {isInitialized && vectorAccountQuery.vectorAddress
        ? renderReady({
            seed: vectorAccountQuery.vectorAccount!.seed,
            vectorAddress: vectorAccountQuery.vectorAddress,
          })
        : null}
    </div>
  )
}
