import { Badge } from '@/core/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card'
import { Textarea } from '@/core/ui/textarea'
import { SolanaUiAddress } from '@/solana/ui/solana-ui-address'
import { SolanaUiExplorerLink } from '@/solana/ui/solana-ui-explorer-link'
import { type VectorProgramStatus } from '@/vector/data-access/use-vector-account-query'
import { type VectorAccount } from '@/vector/data-access/vector-protocol'

export function VectorUiAccountStateCard({
  exportKeyBytesJson,
  isLoading,
  isRefreshing,
  programAddress,
  programMessage,
  programStatus,
  queryErrorMessage,
  signerAddress,
  vectorAccount,
  vectorAddress,
}: {
  exportKeyBytesJson: string
  isLoading: boolean
  isRefreshing: boolean
  programAddress: string
  programMessage: null | string
  programStatus: VectorProgramStatus
  queryErrorMessage: null | string
  signerAddress: string
  vectorAccount: null | VectorAccount
  vectorAddress: null | string
}) {
  const isInitialized = vectorAccount !== null
  const statusLabel = isLoading
    ? 'Loading'
    : programStatus !== 'deployed'
      ? 'Unavailable'
      : isInitialized
        ? 'Initialized'
        : 'Uninitialized'
  const statusVariant = isLoading
    ? 'secondary'
    : programStatus !== 'deployed'
      ? 'destructive'
      : isInitialized
        ? 'default'
        : 'outline'

  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>Vector account state</CardTitle>
            <CardDescription>
              The Vector PDA is derived from the session signer address and stores the current seed, signer address, and
              bump.
            </CardDescription>
          </div>
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-4">
          <div className="text-sm font-medium">Addresses</div>
          <div className="space-y-2 text-xs">
            <div className="font-medium">Session signer</div>
            <div className="font-mono text-muted-foreground">{signerAddress}</div>
            <div className="font-medium">Vector program</div>
            <SolanaUiExplorerLink
              className="inline-flex gap-1 font-mono text-xs"
              label={<SolanaUiAddress address={programAddress} />}
              path={`/address/${programAddress}`}
            />
            <div className="font-medium">Vector PDA</div>
            {vectorAddress ? (
              <SolanaUiExplorerLink
                className="inline-flex gap-1 font-mono text-xs"
                label={<SolanaUiAddress address={vectorAddress} />}
                path={`/address/${vectorAddress}`}
              />
            ) : (
              <div className="text-muted-foreground">Deriving PDA...</div>
            )}
          </div>
        </div>
        <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-4">
          <div className="text-sm font-medium">On-chain data</div>
          <div className="space-y-2 text-xs">
            <div className="font-medium">Current seed</div>
            <div className="font-mono break-all text-muted-foreground">
              {vectorAccount ? bytesToHex(vectorAccount.seed) : 'Not initialized'}
            </div>
            <div className="font-medium">Stored signer address</div>
            <div className="font-mono text-muted-foreground">
              {vectorAccount ? vectorAccount.address : <SolanaUiAddress address={signerAddress} />}
            </div>
            <div className="font-medium">Bump</div>
            <div className="font-mono text-muted-foreground">
              {vectorAccount ? vectorAccount.bump : 'Not initialized'}
            </div>
            <div className="text-muted-foreground">
              {isRefreshing
                ? 'Refreshing on-chain state...'
                : programStatus !== 'deployed'
                  ? 'Switch to a cluster where the Vector program is deployed.'
                  : isInitialized
                    ? 'The next Vector authorization will be bound to the current seed above.'
                    : 'Initialize the Vector PDA before preparing the demo mint flow.'}
            </div>
          </div>
        </div>
        <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-4 lg:col-span-2">
          <div className="text-sm font-medium">Session key export</div>
          <CardDescription>
            Save these bytes if you want to reopen the same Vector session signer later. They are not persisted anywhere
            in the app.
          </CardDescription>
          <Textarea className="min-h-28 font-mono text-xs" readOnly value={exportKeyBytesJson} />
        </div>
        {programMessage ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-xs/relaxed text-destructive lg:col-span-2">
            {programMessage}
          </div>
        ) : null}
        {queryErrorMessage ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-xs/relaxed text-destructive lg:col-span-2">
            {queryErrorMessage}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('')
}
