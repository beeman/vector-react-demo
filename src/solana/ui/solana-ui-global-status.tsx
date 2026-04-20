import { address, airdropFactory, lamports } from '@solana/kit'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type SolanaClusterId, type UiWalletAccount, useWalletUi } from '@wallet-ui/react'
import { toast } from 'sonner'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/core/ui/alert'
import { Button } from '@/core/ui/button'
import { Spinner } from '@/core/ui/spinner'
import { useSolanaClient } from '@/solana/data-access/use-solana-client'
import { SolanaUiExplorerLink } from '@/solana/ui/solana-ui-explorer-link'
import { useWalletBalanceQuery } from '@/wallet/data-access/use-wallet-balance-query'

const ONE_SOL = lamports(1_000_000_000n)

export function SolanaUiGlobalStatus() {
  const client = useSolanaClient()
  const { account, cluster } = useWalletUi()
  // client.rpc is derived from the selected cluster and should not participate in cache identity.
  // eslint-disable-next-line @tanstack/query/exhaustive-deps
  const clusterHealthQuery = useQuery({
    queryFn: async () => await client.rpc.getVersion().send(),
    queryKey: ['solana-cluster-health', cluster.id],
    retry: false,
  })

  if (clusterHealthQuery.isError) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 pt-4">
        <Alert variant="destructive">
          <AlertTitle>Cluster unreachable</AlertTitle>
          <AlertDescription>
            Could not reach {cluster.label} at {cluster.url}. {formatError(clusterHealthQuery.error)}
          </AlertDescription>
          <AlertAction>
            <Button
              disabled={clusterHealthQuery.isFetching}
              onClick={() => {
                void clusterHealthQuery.refetch()
              }}
              size="sm"
              variant="outline"
            >
              {clusterHealthQuery.isFetching ? <Spinner /> : null}
              Retry
            </Button>
          </AlertAction>
        </Alert>
      </div>
    )
  }

  if (!account || clusterHealthQuery.isLoading) {
    return null
  }

  return <SolanaUiWalletFundingAlert account={account} client={client} cluster={cluster.id} />
}

function formatError(error: unknown) {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }
  if (typeof error === 'string' && error.trim().length > 0) {
    return error
  }

  return 'Unknown error occurred.'
}

function SolanaUiWalletFundingAlert({
  account,
  client,
  cluster,
}: {
  account: UiWalletAccount
  client: SolanaClient
  cluster: SolanaClusterId
}) {
  const { refresh, state } = useWalletBalanceQuery({ account, client, cluster })
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      const airdrop = airdropFactory({
        rpc: client.rpc,
        rpcSubscriptions: client.rpcSubscriptions,
      })

      return await airdrop({
        commitment: 'confirmed',
        lamports: ONE_SOL,
        recipientAddress: address(account.address),
      })
    },
    onSuccess: async (signature) => {
      toast.success('Airdrop requested', {
        description: (
          <SolanaUiExplorerLink
            className="inline-flex items-center gap-1 underline underline-offset-4"
            label="View on Solana Explorer"
            path={`/tx/${signature}`}
          />
        ),
      })

      refresh()
    },
  })

  if (state.status !== 'success' || state.balance > 0n) {
    return null
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-4">
      <Alert>
        <AlertTitle>Wallet has no SOL</AlertTitle>
        <AlertDescription>
          This wallet has a zero balance on the selected cluster. Request a 1 SOL airdrop to fund fees and local
          testing.
        </AlertDescription>
        <AlertAction>
          <Button
            disabled={isPending}
            onClick={() => {
              void mutateAsync().catch((error: unknown) => {
                toast.error('Airdrop failed', {
                  description: formatError(error),
                })
              })
            }}
            size="sm"
            variant="outline"
          >
            {isPending ? <Spinner /> : null}
            Request 1 SOL
          </Button>
        </AlertAction>
      </Alert>
    </div>
  )
}
