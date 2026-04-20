import { useEffect, useState } from 'react'

import type { SolanaUiWalletGuardRenderProps } from '@/solana/ui/solana-ui-wallet-guard'

import { Card, CardContent } from '@/core/ui/card'
import { Spinner } from '@/core/ui/spinner'
import { type VectorDemoSetupResult } from '@/vector/data-access/use-vector-demo-setup-mutation'
import { VectorFeatureAccount } from '@/vector/feature/vector-feature-account'
import { VectorFeatureDemo } from '@/vector/feature/vector-feature-demo'
import {
  restoreSignerSessionState,
  VectorFeatureSignerSession,
  type VectorSignerSessionState,
} from '@/vector/feature/vector-feature-signer-session'

const vectorSignerStorageKey = 'vector-signer-export-key-bytes'

export function VectorFeatureConnected({ account, cluster }: SolanaUiWalletGuardRenderProps) {
  const [demoSetup, setDemoSetup] = useState<null | VectorDemoSetupResult>(null)
  const [isRestoringSigner, setIsRestoringSigner] = useState(true)
  const [signerSession, setSignerSession] = useState<null | VectorSignerSessionState>(null)

  useEffect(() => {
    let isCancelled = false

    async function restoreSignerSession() {
      try {
        const storedSignerSession = localStorage.getItem(vectorSignerStorageKey)

        if (!storedSignerSession) {
          return
        }

        const nextSignerSession = await restoreSignerSessionState(storedSignerSession)

        if (!isCancelled) {
          setSignerSession(nextSignerSession)
        }
      } catch {
        try {
          localStorage.removeItem(vectorSignerStorageKey)
        } catch {
          // Ignore localStorage failures and leave the user on the manual signer flow.
        }
      } finally {
        if (!isCancelled) {
          setIsRestoringSigner(false)
        }
      }
    }

    void restoreSignerSession()

    return () => {
      isCancelled = true
    }
  }, [])

  function handleForgetSigner() {
    setDemoSetup(null)
    setSignerSession(null)

    try {
      localStorage.removeItem(vectorSignerStorageKey)
    } catch {
      // Ignore localStorage failures and still reset the in-memory session.
    }
  }

  function handleSignerSessionReady(nextSignerSession: VectorSignerSessionState) {
    setDemoSetup(null)
    setSignerSession(nextSignerSession)

    try {
      localStorage.setItem(vectorSignerStorageKey, nextSignerSession.exportKeyBytesJson)
    } catch {
      // Ignore localStorage failures so signer creation/import still works in restricted browsers.
    }
  }

  if (isRestoringSigner) {
    return (
      <div className="mx-auto my-4 max-w-6xl px-4">
        <Card className="border-border/60">
          <CardContent className="flex min-h-40 items-center justify-center gap-3 pt-6 text-sm text-muted-foreground">
            <Spinner />
            Restoring saved signer...
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!signerSession) {
    return (
      <div className="mx-auto my-4 max-w-6xl px-4">
        <VectorFeatureSignerSession onReady={handleSignerSessionReady} />
      </div>
    )
  }

  return (
    <div className="mx-auto my-4 max-w-6xl px-4">
      <VectorFeatureAccount
        account={account}
        cluster={cluster.id}
        exportKeyBytesJson={signerSession.exportKeyBytesJson}
        onForgetSigner={handleForgetSigner}
        renderReady={({ seed, vectorAddress }) => (
          <VectorFeatureDemo
            account={account}
            cluster={cluster.id}
            demoSetup={demoSetup}
            onDemoSetupChange={setDemoSetup}
            seed={seed}
            signer={signerSession.signer}
            vectorAddress={vectorAddress}
          />
        )}
        signer={signerSession.signer}
      />
    </div>
  )
}
