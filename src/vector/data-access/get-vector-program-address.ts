import { address, type Address } from '@solana/kit'
import { type SolanaClusterId } from '@wallet-ui/react'

const VECTOR_DEVNET_PROGRAM_ADDRESS = address('VeCtoy9RLkSnY4YdfzNZbZFxzMksMCkt25B6kX58rSp')
const VECTOR_LOCALNET_PROGRAM_ADDRESS = address('vectorcLBXJ2TuoKuUygkEi6FWqvBnbHDEDWoYamfjV')

export function getVectorProgramAddress(cluster: SolanaClusterId): Address {
  switch (cluster) {
    case 'solana:localnet':
      // Swap this to your own local deployment if your validator loads Vector under a different program ID.
      return VECTOR_LOCALNET_PROGRAM_ADDRESS
    case 'solana:devnet':
    default:
      return VECTOR_DEVNET_PROGRAM_ADDRESS
  }
}
