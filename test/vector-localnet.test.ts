import type { LocalSolanaClient } from '@beeman/testcontainers'

import { getCreateAccountInstruction } from '@solana-program/system'
import {
  AuthorityType,
  fetchMint,
  fetchToken,
  findAssociatedTokenPda,
  getCreateAssociatedTokenInstructionAsync,
  getInitializeMint2Instruction,
  getMintSize,
  getMintToInstruction,
  getSetAuthorityInstruction,
  TOKEN_PROGRAM_ADDRESS,
} from '@solana-program/token'
import { type Address, generateKeyPairSigner, type KeyPairSigner } from '@solana/kit'
import { afterAll, beforeAll, describe, expect, test } from 'bun:test'

import { createSolanaTransactionMessage } from '@/solana/data-access/create-solana-transaction-message'
import { executeSolanaTransactionMessageWithSigners } from '@/solana/data-access/execute-solana-transaction-message'
import { getVectorProgramAddress } from '@/vector/data-access/get-vector-program-address'
import {
  advanceVectorDigest,
  createSignedAdvanceTransactionMessage,
  createSignedCloseTransactionMessage,
  VECTOR_ACCOUNT_SIZE,
  vectorComputeBudget,
} from '@/vector/data-access/vector-protocol'

import {
  createFundedWallet,
  fetchVectorAccountState,
  initializeVectorForTests,
  startTestValidator,
  type TestValidator,
} from './test-utils'

describe('vector localnet', () => {
  let client: LocalSolanaClient
  let currentSeed: Uint8Array
  let transactionSigner: KeyPairSigner
  let validator: TestValidator
  let vectorAddress: Address
  let vectorSigner: KeyPairSigner

  const programAddress = getVectorProgramAddress('solana:localnet')

  beforeAll(async () => {
    validator = await startTestValidator()
    client = validator.client
    transactionSigner = await createFundedWallet(client)
    vectorSigner = await generateKeyPairSigner()
  }, 120_000)

  afterAll(async () => {
    if (validator) {
      await validator.stop()
    }
  })

  test('initialize vector account', async () => {
    const { vectorState } = await initializeVectorForTests({
      client,
      signer: vectorSigner,
      transactionSigner,
    })

    currentSeed = vectorState.vectorAccount.seed
    vectorAddress = vectorState.vectorAddress

    expect(vectorState.info.owner).toBe(programAddress)
    expect(vectorState.info.space).toBe(BigInt(VECTOR_ACCOUNT_SIZE))
    expect(vectorState.vectorAccount.address).toBe(vectorSigner.address)
    expect(vectorState.vectorAccount.bump).toBeGreaterThanOrEqual(0)
  }, 20_000)

  test('advance empty', async () => {
    const nextSeed = await advanceVectorDigest({
      feePayer: transactionSigner.address,
      instructions: [],
      programAddress,
      seed: currentSeed,
      signerAddress: vectorSigner.address,
      subInstructions: [],
    })
    const transactionMessage = await createSignedAdvanceTransactionMessage({
      client,
      instructions: [],
      programAddress,
      seed: currentSeed,
      signer: vectorSigner,
      subInstructions: [],
      transactionSigner,
    })

    await executeSolanaTransactionMessageWithSigners({
      client,
      insufficientBalanceMessage: 'Not enough SOL to pay transaction fees on this cluster.',
      requiredBalance: 0n,
      transactionMessage,
    })

    const vectorState = await fetchVectorAccountState({
      client,
      programAddress,
      signerAddress: vectorSigner.address,
    })

    expect([...vectorState.vectorAccount.seed]).toEqual([...nextSeed])

    currentSeed = nextSeed
  }, 20_000)

  test('advance round trips spl mint authority', async () => {
    const mintSigner = await generateKeyPairSigner()
    const [destinationAtaAddress] = await findAssociatedTokenPda({
      mint: mintSigner.address,
      owner: transactionSigner.address,
      tokenProgram: TOKEN_PROGRAM_ADDRESS,
    })
    const createAssociatedTokenInstruction = await getCreateAssociatedTokenInstructionAsync({
      mint: mintSigner.address,
      owner: transactionSigner.address,
      payer: transactionSigner,
    })
    const mintRent = await client.rpc
      .getMinimumBalanceForRentExemption(BigInt(getMintSize()), { commitment: 'confirmed' })
      .send()
    const tokenAccountRent = await client.rpc
      .getMinimumBalanceForRentExemption(165n, { commitment: 'confirmed' })
      .send()
    const setupTransactionMessage = await createSolanaTransactionMessage({
      client,
      computeBudget: vectorComputeBudget,
      instructions: [
        getCreateAccountInstruction({
          lamports: mintRent,
          newAccount: mintSigner,
          payer: transactionSigner,
          programAddress: TOKEN_PROGRAM_ADDRESS,
          space: BigInt(getMintSize()),
        }),
        getInitializeMint2Instruction({
          decimals: 6,
          freezeAuthority: null,
          mint: mintSigner.address,
          mintAuthority: vectorAddress,
        }),
        createAssociatedTokenInstruction,
      ],
      transactionSigner,
    })

    await executeSolanaTransactionMessageWithSigners({
      client,
      insufficientBalanceMessage:
        'Not enough SOL to pay transaction fees and fund the demo mint and token account on this cluster.',
      requiredBalance: mintRent + tokenAccountRent,
      transactionMessage: setupTransactionMessage,
    })

    const pdaToWalletInstruction = getSetAuthorityInstruction({
      authorityType: AuthorityType.MintTokens,
      newAuthority: transactionSigner.address,
      owned: mintSigner.address,
      owner: vectorAddress,
    })
    const mintToInstruction = getMintToInstruction({
      amount: 10_000n,
      mint: mintSigner.address,
      mintAuthority: transactionSigner,
      token: destinationAtaAddress,
    })
    const walletToPdaInstruction = getSetAuthorityInstruction({
      authorityType: AuthorityType.MintTokens,
      newAuthority: vectorAddress,
      owned: mintSigner.address,
      owner: transactionSigner,
    })
    const nextSeed = await advanceVectorDigest({
      feePayer: transactionSigner.address,
      instructions: [mintToInstruction, walletToPdaInstruction],
      programAddress,
      seed: currentSeed,
      signerAddress: vectorSigner.address,
      subInstructions: [pdaToWalletInstruction],
    })
    const advanceTransactionMessage = await createSignedAdvanceTransactionMessage({
      client,
      instructions: [mintToInstruction, walletToPdaInstruction],
      programAddress,
      seed: currentSeed,
      signer: vectorSigner,
      subInstructions: [pdaToWalletInstruction],
      transactionSigner,
    })

    await executeSolanaTransactionMessageWithSigners({
      client,
      insufficientBalanceMessage: 'Not enough SOL to pay transaction fees on this cluster.',
      requiredBalance: 0n,
      transactionMessage: advanceTransactionMessage,
    })

    const mintAccount = await fetchMint(client.rpc, mintSigner.address)
    const tokenAccount = await fetchToken(client.rpc, destinationAtaAddress)
    const vectorState = await fetchVectorAccountState({
      client,
      programAddress,
      signerAddress: vectorSigner.address,
    })

    expect([...vectorState.vectorAccount.seed]).toEqual([...nextSeed])
    expect(tokenAccount.data.amount).toBe(10_000n)
    expect(mintAccount.data.mintAuthority.__option).toBe('Some')
    expect(mintAccount.data.mintAuthority.__option === 'Some' ? mintAccount.data.mintAuthority.value : null).toBe(
      vectorAddress,
    )

    currentSeed = nextSeed
  }, 20_000)

  test('close vector account', async () => {
    const { value: preCloseBalance } = await client.rpc
      .getBalance(transactionSigner.address, {
        commitment: 'confirmed',
      })
      .send()
    const transactionMessage = await createSignedCloseTransactionMessage({
      client,
      closeTo: transactionSigner.address,
      programAddress,
      seed: currentSeed,
      signer: vectorSigner,
      transactionSigner,
    })

    await executeSolanaTransactionMessageWithSigners({
      client,
      insufficientBalanceMessage: 'Not enough SOL to pay transaction fees on this cluster.',
      requiredBalance: 0n,
      transactionMessage,
    })

    const { value: maybeVectorAccountInfo } = await client.rpc
      .getAccountInfo(vectorAddress, { commitment: 'confirmed', encoding: 'base64' })
      .send()
    const { value: postCloseBalance } = await client.rpc
      .getBalance(transactionSigner.address, {
        commitment: 'confirmed',
      })
      .send()

    expect(maybeVectorAccountInfo).toBeNull()
    expect(postCloseBalance).toBeGreaterThan(preCloseBalance)
  }, 20_000)
})
