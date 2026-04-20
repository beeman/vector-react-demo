import { SolanaUiWalletGuard } from '@/solana/ui/solana-ui-wallet-guard'
import { VectorFeatureConnected } from '@/vector/feature/vector-feature-connected'

export function VectorFeature() {
  return <SolanaUiWalletGuard render={VectorFeatureConnected} />
}

export { VectorFeature as Component }
