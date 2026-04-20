import { type Address } from '@solana/kit'
import { useQuery } from '@tanstack/react-query'
import { type SolanaClusterId } from '@wallet-ui/react'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { getVectorProgramAddress } from '@/vector/data-access/get-vector-program-address'
import { deserializeVectorAccount, findVectorPda } from '@/vector/data-access/vector-protocol'

export type VectorProgramStatus = 'deployed' | 'loading' | 'missing' | 'not-executable'

export function getVectorAccountQueryKey(cluster: SolanaClusterId, signerAddress: string) {
  return ['vector-account', cluster, signerAddress] as const
}

export function useVectorAccountQuery({
  client,
  cluster,
  signerAddress,
}: {
  client: SolanaClient
  cluster: SolanaClusterId
  signerAddress: Address
}) {
  const programAddress = getVectorProgramAddress(cluster)
  // client.rpc is derived from the selected cluster and should not participate in cache identity.
  // eslint-disable-next-line @tanstack/query/exhaustive-deps
  const { data, error, isError, isFetching, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const [vectorAddress] = await findVectorPda({ programAddress, signerAddress })
      const [{ value: maybeVectorAccountInfo }, { value: maybeProgramAccountInfo }] = await Promise.all([
        client.rpc.getAccountInfo(vectorAddress, { commitment: 'confirmed', encoding: 'base64' }).send(),
        client.rpc.getAccountInfo(programAddress, { commitment: 'confirmed', encoding: 'base64' }).send(),
      ])

      if (!maybeProgramAccountInfo) {
        return {
          programMessage: `Program ${programAddress} is not deployed on this cluster.`,
          programStatus: 'missing',
          vectorAccount: null,
          vectorAddress,
        } as const
      }

      if (!maybeProgramAccountInfo.executable) {
        return {
          programMessage: `Program ${programAddress} exists on this cluster but is not executable.`,
          programStatus: 'not-executable',
          vectorAccount: null,
          vectorAddress,
        } as const
      }

      if (
        !maybeVectorAccountInfo ||
        maybeVectorAccountInfo.executable ||
        maybeVectorAccountInfo.owner !== programAddress ||
        maybeVectorAccountInfo.space === 0n
      ) {
        return {
          programMessage: null,
          programStatus: 'deployed',
          vectorAccount: null,
          vectorAddress,
        } as const
      }

      return {
        programMessage: null,
        programStatus: 'deployed',
        vectorAccount: deserializeVectorAccount(decodeBase64(maybeVectorAccountInfo.data[0])),
        vectorAddress,
      } as const
    },
    queryKey: getVectorAccountQueryKey(cluster, signerAddress),
  })

  return {
    error,
    isError,
    isLoading,
    isRefreshing: isFetching && !isLoading,
    programAddress,
    programMessage: data?.programMessage ?? null,
    programStatus: (data?.programStatus ?? 'loading') as VectorProgramStatus,
    refresh() {
      void refetch()
    },
    vectorAccount: data?.vectorAccount ?? null,
    vectorAddress: data?.vectorAddress ?? null,
  }
}

function decodeBase64(value: string) {
  const raw = globalThis.atob(value)
  const bytes = new Uint8Array(raw.length)

  for (let index = 0; index < raw.length; index += 1) {
    bytes[index] = raw.charCodeAt(index)
  }

  return bytes
}
