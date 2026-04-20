import { useState } from 'react'

import type { SolanaUiWalletGuardRenderProps } from '@/solana/ui/solana-ui-wallet-guard'

import { type VectorDemoSetupResult } from '@/vector/data-access/use-vector-demo-setup-mutation'
import { VectorFeatureAccount } from '@/vector/feature/vector-feature-account'
import { VectorFeatureDemo } from '@/vector/feature/vector-feature-demo'
import {
  VectorFeatureSignerSession,
  type VectorSignerSessionState,
} from '@/vector/feature/vector-feature-signer-session'

export function VectorFeatureConnected({ account, cluster }: SolanaUiWalletGuardRenderProps) {
  const [demoSetup, setDemoSetup] = useState<null | VectorDemoSetupResult>(null)
  const [signerSession, setSignerSession] = useState<null | VectorSignerSessionState>(null)

  if (!signerSession) {
    return (
      <div className="mx-auto my-4 max-w-6xl px-4">
        <VectorFeatureSignerSession
          onReady={(nextSignerSession) => {
            setDemoSetup(null)
            setSignerSession(nextSignerSession)
          }}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto my-4 max-w-6xl px-4">
      <VectorFeatureAccount
        account={account}
        cluster={cluster.id}
        exportKeyBytesJson={signerSession.exportKeyBytesJson}
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
