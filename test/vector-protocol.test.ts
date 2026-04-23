import { address, generateKeyPairSigner } from '@solana/kit'
import { describe, expect, it } from 'bun:test'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { createSignedAdvanceTransactionMessage, deserializeVectorAccount } from '@/vector/data-access/vector-protocol'

describe('createSignedAdvanceTransactionMessage', () => {
  it('accepts normalized compute budget instructions in the signed digest', async () => {
    const instruction = {
      accounts: [],
      data: new Uint8Array([1]),
      programAddress: address('11111111111111111111111111111111'),
    }
    const client = {
      rpc: {
        getLatestBlockhash: () => ({
          send: async () => ({
            value: {
              blockhash: '11111111111111111111111111111111',
              lastValidBlockHeight: 1n,
            },
          }),
        }),
      },
    } as SolanaClient
    const signer = await generateKeyPairSigner()
    const transactionSigner = await generateKeyPairSigner()

    await expect(
      createSignedAdvanceTransactionMessage({
        client,
        instructions: [instruction],
        programAddress: address('vectorcLBXJ2TuoKuUygkEi6FWqvBnbHDEDWoYamfjV'),
        seed: new Uint8Array(32),
        signer,
        subInstructions: [instruction],
        transactionSigner,
      }),
    ).resolves.toMatchObject({
      instructions: expect.any(Array),
    })
  })

  it('rejects too-short vector account data', () => {
    expect(() => deserializeVectorAccount(new Uint8Array(64))).toThrow('Vector account data too short')
  })
})
