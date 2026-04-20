import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card'

export function AboutFeature() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,1fr)]">
        <Card className="self-start border-border/60">
          <CardHeader className="gap-2">
            <CardTitle className="text-xl font-semibold tracking-tight">About This Demo</CardTitle>
            <CardDescription className="max-w-3xl text-sm/6">
              This app is a small UI for exploring{' '}
              <a
                className="text-foreground underline underline-offset-4 hover:text-primary"
                href="https://github.com/blueshift-gg/vector"
                rel="noreferrer"
                target="_blank"
              >
                Vector
              </a>
              , a Solana primitive for authorizing an exact transaction with an offchain Ed25519 key.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-sm font-medium">What Vector is doing</h2>
              <p className="text-muted-foreground">
                A session key signs a digest of the full transaction offchain. The Vector program recomputes that same
                digest onchain, verifies the signature, and only then allows the authorized instruction flow to proceed.
              </p>
              <p className="text-muted-foreground">
                After a successful `advance`, Vector installs a new seed so the same authorization cannot be replayed.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-medium">What this app demonstrates</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>Generate or import a session signing key in the browser.</li>
                <li>Initialize a Vector PDA for that key.</li>
                <li>Create a demo SPL mint whose authority starts on the Vector PDA.</li>
                <li>
                  Run the `advance` flow to hand authority to the connected wallet, mint tokens, and hand authority
                  back.
                </li>
                <li>Close the Vector account when the demo is complete.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-medium">How the demo is wired</h2>
              <p className="text-muted-foreground">
                The app ports the Vector client-side flow to `@solana/kit`, uses wallet-ui for connection and signing,
                and keeps the Vector signing key session-local in the browser.
              </p>
              <p className="text-muted-foreground">
                The global banner also checks cluster reachability and helps fund empty wallets with a 1 SOL airdrop on
                supported clusters.
              </p>
            </section>
          </CardContent>
        </Card>

        <div className="grid gap-6 self-start">
          <Card className="self-start border-border/60">
            <CardHeader>
              <CardTitle>Run The Flow</CardTitle>
              <CardDescription>Use the app in this order for the cleanest local demo run.</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-muted-foreground">
                <li>Start the validator.</li>
                <li>Open the app and select the right cluster.</li>
                <li>Connect a wallet and request an airdrop if needed.</li>
                <li>Open the Vector page.</li>
                <li>Generate a session key, initialize, prepare demo assets, advance, then close.</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="self-start border-border/60">
            <CardHeader>
              <CardTitle>Upstream Project</CardTitle>
              <CardDescription>Read the protocol details and SDK source in the original repository.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                className="block break-all text-foreground underline underline-offset-4 hover:text-primary"
                href="https://github.com/blueshift-gg/vector"
                rel="noreferrer"
                target="_blank"
              >
                https://github.com/blueshift-gg/vector
              </a>
              <p className="text-muted-foreground">
                That repo contains the program, the reference SDKs, and the original integration test flow this UI is
                based on.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export { AboutFeature as Component }
