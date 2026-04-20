import { Alert, AlertDescription, AlertTitle } from '@/core/ui/alert'
import { Button } from '@/core/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card'
import { Spinner } from '@/core/ui/spinner'
import { SolanaUiAddress } from '@/solana/ui/solana-ui-address'
import { SolanaUiExplorerLink } from '@/solana/ui/solana-ui-explorer-link'

export function VectorUiInitializeCard({
  disabled,
  errorMessage,
  isInitialized,
  isLoading,
  onInitialize,
  signature,
  vectorAddress,
}: {
  disabled: boolean
  errorMessage: null | string
  isInitialized: boolean
  isLoading: boolean
  onInitialize(): Promise<null | string>
  signature: null | string
  vectorAddress: string
}) {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>Initialize Vector</CardTitle>
        <CardDescription>
          Creates the canonical Vector PDA at <SolanaUiAddress address={vectorAddress} /> and derives the initial seed
          on-chain.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full" disabled={disabled} onClick={() => void onInitialize()}>
          {isLoading ? <Spinner /> : null}
          {isLoading ? 'Sending initialize...' : isInitialized ? 'Already initialized' : 'Initialize Vector account'}
        </Button>
        {errorMessage ? (
          <Alert variant="destructive">
            <AlertTitle>Initialize failed</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : null}
        {signature ? (
          <div className="space-y-2 text-xs">
            <div className="font-medium">Latest initialize signature</div>
            <SolanaUiExplorerLink
              className="inline-flex gap-1 font-mono text-xs"
              label={<SolanaUiAddress address={signature} />}
              path={`/tx/${signature}`}
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
