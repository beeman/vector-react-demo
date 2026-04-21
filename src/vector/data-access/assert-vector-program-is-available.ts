import { type Address } from '@solana/kit'

import type { SolanaClient } from '@/solana/data-access/solana-client'

export async function assertVectorProgramIsAvailable({
  client,
  programAddress,
}: {
  client: SolanaClient
  programAddress: Address
}) {
  const { value: maybeProgramAccount } = await client.rpc
    .getAccountInfo(programAddress, { commitment: 'confirmed', encoding: 'base64' })
    .send()

  if (!maybeProgramAccount) {
    throw new Error(`Program ${programAddress} is not deployed on this cluster.`)
  }
  if (!maybeProgramAccount.executable) {
    throw new Error(`Program ${programAddress} exists on this cluster but is not executable.`)
  }
}
