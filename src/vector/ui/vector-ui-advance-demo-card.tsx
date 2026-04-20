import { Alert, AlertDescription, AlertTitle } from '@/core/ui/alert'
import { Badge } from '@/core/ui/badge'
import { Button } from '@/core/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card'
import { Spinner } from '@/core/ui/spinner'
import { SolanaUiAddress } from '@/solana/ui/solana-ui-address'
import { SolanaUiExplorerLink } from '@/solana/ui/solana-ui-explorer-link'

export interface VectorUiAdvanceDemoState {
  destinationAmount: bigint | null
  destinationAtaAddress: string
  mintAddress: string
  mintAuthority: null | string
}

export function VectorUiAdvanceDemoCard({
  advanceErrorMessage,
  advanceIsLoading,
  advanceSignature,
  demoState,
  isRefreshing,
  onAdvance,
  onPrepare,
  prepareErrorMessage,
  prepareIsLoading,
  prepareSignature,
  vectorAddress,
}: {
  advanceErrorMessage: null | string
  advanceIsLoading: boolean
  advanceSignature: null | string
  demoState: null | VectorUiAdvanceDemoState
  isRefreshing: boolean
  onAdvance(): Promise<null | string>
  onPrepare(): Promise<unknown>
  prepareErrorMessage: null | string
  prepareIsLoading: boolean
  prepareSignature: null | string
  vectorAddress: string
}) {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>Advance demo flow</CardTitle>
        <CardDescription>
          Reproduces the integration test: Vector temporarily hands mint authority to the connected wallet, mints 10,000
          units, and restores authority back to the Vector PDA.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="space-y-2 rounded-lg border border-border/60 bg-muted/20 p-4 text-xs">
            <div className="flex items-center justify-between gap-3">
              <div className="font-medium">Demo assets</div>
              <Badge variant={demoState ? 'default' : 'outline'}>{demoState ? 'Prepared' : 'Not prepared'}</Badge>
            </div>
            <div className="text-muted-foreground">
              {demoState
                ? 'The session mint and ATA are ready for the Vector advance transaction.'
                : 'Prepare a session-local mint whose authority starts at the Vector PDA.'}
            </div>
            <div className="space-y-2">
              <div className="font-medium">Mint address</div>
              <div className="font-mono text-muted-foreground">
                {demoState ? <SolanaUiAddress address={demoState.mintAddress} /> : 'Not created yet'}
              </div>
              <div className="font-medium">Destination ATA</div>
              <div className="font-mono text-muted-foreground">
                {demoState ? <SolanaUiAddress address={demoState.destinationAtaAddress} /> : 'Not created yet'}
              </div>
              <div className="font-medium">Current mint authority</div>
              <div className="font-mono text-muted-foreground">
                {demoState?.mintAuthority ? <SolanaUiAddress address={demoState.mintAuthority} /> : 'Unknown'}
              </div>
              <div className="font-medium">Destination balance</div>
              <div className="font-mono text-muted-foreground">
                {demoState?.destinationAmount === null || demoState?.destinationAmount === undefined
                  ? 'Unknown'
                  : demoState.destinationAmount.toString()}
              </div>
              <div className="text-muted-foreground">
                {isRefreshing
                  ? 'Refreshing mint and token account state...'
                  : `Expected resting authority: ${vectorAddress}`}
              </div>
            </div>
          </div>
          <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-4">
            <div className="text-sm font-medium">Actions</div>
            <Button
              className="w-full"
              disabled={prepareIsLoading || !!demoState}
              onClick={() => void onPrepare()}
              variant="outline"
            >
              {prepareIsLoading ? <Spinner /> : null}
              {prepareIsLoading
                ? 'Preparing demo assets...'
                : demoState
                  ? 'Demo assets prepared'
                  : 'Prepare demo mint and ATA'}
            </Button>
            <Button
              className="w-full"
              disabled={!demoState || advanceIsLoading || prepareIsLoading}
              onClick={() => void onAdvance()}
            >
              {advanceIsLoading ? <Spinner /> : null}
              {advanceIsLoading ? 'Sending advance flow...' : 'Run advance demo'}
            </Button>
          </div>
        </div>
        {prepareErrorMessage ? (
          <Alert variant="destructive">
            <AlertTitle>Demo setup failed</AlertTitle>
            <AlertDescription>{prepareErrorMessage}</AlertDescription>
          </Alert>
        ) : null}
        {advanceErrorMessage ? (
          <Alert variant="destructive">
            <AlertTitle>Advance demo failed</AlertTitle>
            <AlertDescription>{advanceErrorMessage}</AlertDescription>
          </Alert>
        ) : null}
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="space-y-2 text-xs">
            <div className="font-medium">Setup signature</div>
            {prepareSignature ? (
              <SolanaUiExplorerLink
                className="inline-flex gap-1 font-mono text-xs"
                label={<SolanaUiAddress address={prepareSignature} />}
                path={`/tx/${prepareSignature}`}
              />
            ) : (
              <div className="text-muted-foreground">No setup transaction submitted yet.</div>
            )}
          </div>
          <div className="space-y-2 text-xs">
            <div className="font-medium">Advance signature</div>
            {advanceSignature ? (
              <SolanaUiExplorerLink
                className="inline-flex gap-1 font-mono text-xs"
                label={<SolanaUiAddress address={advanceSignature} />}
                path={`/tx/${advanceSignature}`}
              />
            ) : (
              <div className="text-muted-foreground">No advance transaction submitted yet.</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
