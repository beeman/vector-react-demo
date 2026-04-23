import {
  createLocalSolanaClient,
  type LocalSolanaClient,
  SolanaTestValidatorContainer,
  type StartedSolanaTestValidatorContainer,
} from '@beeman/testcontainers'
import { type Address, generateKeyPairSigner, type KeyPairSigner, lamports } from '@solana/kit'
import { Buffer } from 'node:buffer'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { createSolanaTransactionMessage } from '@/solana/data-access/create-solana-transaction-message'
import { executeSolanaTransactionMessageWithSigners } from '@/solana/data-access/execute-solana-transaction-message'
import { getVectorProgramAddress } from '@/vector/data-access/get-vector-program-address'
import {
  createInitializeInstruction,
  deserializeVectorAccount,
  findVectorPda,
  VECTOR_ACCOUNT_SIZE,
  vectorComputeBudget,
} from '@/vector/data-access/vector-protocol'

const FIXTURE_MINT_ADDRESS = 'EvFUfisEScFuZSqDXagC17m3bpP32B74dseMHtzQ5TNb'
const RENT_SYSVAR_ADDRESS = 'SysvarRent111111111111111111111111111111111'
const repoRoot = fileURLToPath(new URL('..', import.meta.url))

export interface TestValidator {
  client: LocalSolanaClient
  container: StartedSolanaTestValidatorContainer
  rpcUrl: string
  stop(): Promise<void>
}

export interface VectorAccountState {
  info: {
    data: [string, string]
    owner: Address
    space: bigint
  }
  vectorAccount: ReturnType<typeof deserializeVectorAccount>
  vectorAddress: Address
}

export async function createFundedWallet(client: LocalSolanaClient) {
  const transactionSigner = await generateKeyPairSigner()
  await client.airdrop(transactionSigner.address, lamports(2_000_000_000n))
  return transactionSigner
}

export async function fetchVectorAccountState({
  client,
  programAddress,
  signerAddress,
}: {
  client: LocalSolanaClient
  programAddress: Address
  signerAddress: Address
}): Promise<VectorAccountState> {
  const [vectorAddress] = await findVectorPda({ programAddress, signerAddress })
  const { value: info } = await client.rpc
    .getAccountInfo(vectorAddress, { commitment: 'confirmed', encoding: 'base64' })
    .send()

  if (!info) {
    throw new Error(`Missing Vector account ${vectorAddress}.`)
  }

  return {
    info,
    vectorAccount: deserializeVectorAccount(Buffer.from(info.data[0], 'base64')),
    vectorAddress,
  }
}

export async function initializeVectorForTests({
  client,
  programAddress = getVectorProgramAddress('solana:localnet'),
  signer,
  transactionSigner,
}: {
  client: LocalSolanaClient
  programAddress?: Address
  signer: KeyPairSigner
  transactionSigner: KeyPairSigner
}) {
  const instruction = await createInitializeInstruction({
    payer: transactionSigner,
    programAddress,
    signerAddress: signer.address,
  })
  const requiredRent = await client.rpc
    .getMinimumBalanceForRentExemption(BigInt(VECTOR_ACCOUNT_SIZE), { commitment: 'confirmed' })
    .send()
  const transactionMessage = await createSolanaTransactionMessage({
    client,
    computeBudget: vectorComputeBudget,
    instructions: [instruction],
    transactionSigner,
  })
  const signature = await executeSolanaTransactionMessageWithSigners({
    client,
    insufficientBalanceMessage: 'Not enough SOL to pay transaction fees and fund the Vector account on this cluster.',
    requiredBalance: requiredRent,
    transactionMessage,
  })
  const vectorState = await fetchVectorAccountState({
    client,
    programAddress,
    signerAddress: signer.address,
  })

  return {
    signature,
    vectorState,
  }
}

export async function startTestValidator(): Promise<TestValidator> {
  const programAddress = getVectorProgramAddress('solana:localnet')
  const vectorFixtureDirectory = join(repoRoot, 'fixtures/vector')
  const container = await new SolanaTestValidatorContainer()
    .withEntrypoint(['solana-test-validator'])
    .withCommand([
      '--ledger',
      '/tmp/test-ledger',
      '--bpf-program',
      programAddress,
      '/fixtures/vector_program.so',
      '--account',
      RENT_SYSVAR_ADDRESS,
      '/fixtures/rent.json',
      '--mint',
      FIXTURE_MINT_ADDRESS,
      '--reset',
    ])
    .withCopyFilesToContainer([
      {
        source: join(vectorFixtureDirectory, 'rent.json'),
        target: '/fixtures/rent.json',
      },
      {
        source: join(vectorFixtureDirectory, 'vector_program.so'),
        target: '/fixtures/vector_program.so',
      },
    ])
    .start()
  const client = await createLocalSolanaClient({ container })

  return {
    client,
    container,
    rpcUrl: container.url,
    async stop() {
      await container.stop()
    },
  }
}
