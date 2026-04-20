import { Alert, AlertDescription, AlertTitle } from '@/core/ui/alert'
import { Button } from '@/core/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card'
import { Spinner } from '@/core/ui/spinner'
import { SolanaUiAddress } from '@/solana/ui/solana-ui-address'
import { SolanaUiExplorerLink } from '@/solana/ui/solana-ui-explorer-link'

export function VectorUiCloseCard({
  closeErrorMessage,
  closeIsLoading,
  closeSignature,
  closeToAddress,
  onClose,
}: {
  closeErrorMessage: null | string
  closeIsLoading: boolean
  closeSignature: null | string
  closeToAddress: string
  onClose(): Promise<null | string>
}) {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>Close Vector</CardTitle>
        <CardDescription>
          Signs the close instruction with the session signer and drains the Vector PDA lamports back to{' '}
          <SolanaUiAddress address={closeToAddress} />.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full" disabled={closeIsLoading} onClick={() => void onClose()} variant="destructive">
          {closeIsLoading ? <Spinner /> : null}
          {closeIsLoading ? 'Sending close...' : 'Close Vector account'}
        </Button>
        {closeErrorMessage ? (
          <Alert variant="destructive">
            <AlertTitle>Close failed</AlertTitle>
            <AlertDescription>{closeErrorMessage}</AlertDescription>
          </Alert>
        ) : null}
        {closeSignature ? (
          <div className="space-y-2 text-xs">
            <div className="font-medium">Latest close signature</div>
            <SolanaUiExplorerLink
              className="inline-flex gap-1 font-mono text-xs"
              label={<SolanaUiAddress address={closeSignature} />}
              path={`/tx/${closeSignature}`}
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
