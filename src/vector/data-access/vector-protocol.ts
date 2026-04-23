import { SYSTEM_PROGRAM_ADDRESS } from '@solana-program/system'
import {
  AccountRole,
  type Address,
  address,
  getAddressDecoder,
  getAddressEncoder,
  getProgramDerivedAddress,
  type Instruction,
  isSignerRole,
  isWritableRole,
  type KeyPairSigner,
  mergeRoles,
  type ReadonlyUint8Array,
  signBytes,
  type TransactionSigner,
} from '@solana/kit'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import {
  createSolanaTransactionMessage,
  getSolanaComputeBudgetInstructions,
  type SolanaComputeBudget,
} from '@/solana/data-access/create-solana-transaction-message'

export const ADVANCE_DISCRIMINATOR = 1
export const CLOSE_DISCRIMINATOR = 2
export const INITIALIZE_DISCRIMINATOR = 0
export const INSTRUCTIONS_SYSVAR_ADDRESS = address('Sysvar1nstructions1111111111111111111111111')
export const VECTOR_ACCOUNT_SIZE = 65
export const vectorComputeBudget: SolanaComputeBudget = { limit: 600_000, price: 125_000n }

const SIGNATURE_LENGTH = 64
const VECTOR_PDA_SEED = 'vector'

const addressDecoder = getAddressDecoder()
const addressEncoder = getAddressEncoder()

export interface VectorAccount {
  address: Address
  bump: number
  seed: Uint8Array
}
type InstructionAccount = Readonly<{
  address: Address
  role: AccountRole
  signer?: TransactionSigner
}>

type ResolvedInstruction = {
  accounts: readonly InstructionAccount[]
  data: ReadonlyUint8Array
} & Instruction

export async function advanceVectorDigest({
  feePayer,
  instructions,
  programAddress,
  seed,
  signerAddress,
  subInstructions,
}: {
  feePayer?: Address
  instructions: readonly Instruction[]
  programAddress: Address
  seed: Uint8Array
  signerAddress: Address
  subInstructions: readonly Instruction[]
}) {
  const advanceInstruction = await createAdvanceInstruction({
    programAddress,
    signerAddress,
    subInstructions,
    vectorSignature: new Uint8Array(SIGNATURE_LENGTH),
  })

  return createVectorDigest({
    feePayer,
    instructions,
    seed,
    signerAddress,
    vectorInstruction: advanceInstruction,
  })
}

export async function createInitializeInstruction({
  payer,
  programAddress,
  signerAddress,
}: {
  payer: TransactionSigner
  programAddress: Address
  signerAddress: Address
}): Promise<ResolvedInstruction> {
  const [vectorAddress] = await findVectorPda({ programAddress, signerAddress })
  const data = new Uint8Array(1 + 32)

  data[0] = INITIALIZE_DISCRIMINATOR
  data.set(addressEncoder.encode(signerAddress), 1)

  return {
    accounts: [
      {
        address: payer.address,
        role: AccountRole.WRITABLE_SIGNER,
        signer: payer,
      },
      { address: vectorAddress, role: AccountRole.WRITABLE },
      { address: SYSTEM_PROGRAM_ADDRESS, role: AccountRole.READONLY },
    ],
    data,
    programAddress,
  } as ResolvedInstruction
}

export async function createSignedAdvanceTransactionMessage({
  client,
  instructions,
  programAddress,
  seed,
  signer,
  subInstructions,
  transactionSigner,
}: {
  client: SolanaClient
  instructions: readonly Instruction[]
  programAddress: Address
  seed: Uint8Array
  signer: KeyPairSigner
  subInstructions: readonly Instruction[]
  transactionSigner: TransactionSigner
}) {
  const advanceInstruction = await signAdvanceInstruction({
    feePayer: transactionSigner.address,
    instructions,
    programAddress,
    seed,
    signer,
    subInstructions,
  })

  return await createSolanaTransactionMessage({
    client,
    computeBudget: vectorComputeBudget,
    instructions: [advanceInstruction, ...instructions],
    transactionSigner,
  })
}

export async function createSignedCloseTransactionMessage({
  client,
  closeTo,
  programAddress,
  seed,
  signer,
  transactionSigner,
}: {
  client: SolanaClient
  closeTo: Address
  programAddress: Address
  seed: Uint8Array
  signer: KeyPairSigner
  transactionSigner: TransactionSigner
}) {
  const closeInstruction = await signCloseInstruction({
    closeTo,
    feePayer: transactionSigner.address,
    programAddress,
    seed,
    signer,
  })

  return await createSolanaTransactionMessage({
    client,
    computeBudget: vectorComputeBudget,
    instructions: [closeInstruction],
    transactionSigner,
  })
}

export function deserializeVectorAccount(data: Uint8Array): VectorAccount {
  if (data.length < VECTOR_ACCOUNT_SIZE) {
    throw new Error(`Vector account data too short: ${data.length} < ${VECTOR_ACCOUNT_SIZE}.`)
  }

  return {
    address: addressDecoder.decode(data.slice(32, 64)),
    bump: data[64],
    seed: data.slice(0, 32),
  }
}

export async function findVectorPda({
  programAddress,
  signerAddress,
}: {
  programAddress: Address
  signerAddress: Address
}) {
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [VECTOR_PDA_SEED, addressEncoder.encode(signerAddress)],
  })
}

async function closeVectorDigest({
  closeTo,
  feePayer,
  programAddress,
  seed,
  signerAddress,
}: {
  closeTo: Address
  feePayer?: Address
  programAddress: Address
  seed: Uint8Array
  signerAddress: Address
}) {
  const closeInstruction = await createCloseInstruction({
    closeTo,
    programAddress,
    signerAddress,
    vectorSignature: new Uint8Array(SIGNATURE_LENGTH),
  })

  return createVectorDigest({
    feePayer,
    instructions: [],
    seed,
    signerAddress,
    vectorInstruction: closeInstruction,
  })
}

function concatBytes(chunks: readonly ReadonlyUint8Array[]) {
  const totalLength = chunks.reduce((length, chunk) => length + chunk.length, 0)
  const data = new Uint8Array(totalLength)
  let offset = 0

  chunks.forEach((chunk) => {
    data.set(chunk, offset)
    offset += chunk.length
  })

  return data
}

function constructInstructionsData({
  currentInstructionIndex,
  instructions,
}: {
  currentInstructionIndex: number
  instructions: readonly ResolvedInstruction[]
}) {
  const totalSize =
    2 +
    2 * instructions.length +
    instructions.reduce(
      (size, instruction) => size + 2 + 33 * instruction.accounts.length + 32 + 2 + instruction.data.length,
      0,
    ) +
    2
  const data = new Uint8Array(totalSize)
  let offset = 0

  writeU16LE(data, instructions.length, offset)
  offset += 2

  const offsetsStart = offset
  offset += 2 * instructions.length

  instructions.forEach((instruction, index) => {
    writeU16LE(data, offset, offsetsStart + 2 * index)

    writeU16LE(data, instruction.accounts.length, offset)
    offset += 2

    instruction.accounts.forEach((account) => {
      let flags = 0

      if (isSignerRole(account.role)) {
        flags |= 0x01
      }
      if (isWritableRole(account.role)) {
        flags |= 0x02
      }

      data[offset++] = flags
      data.set(addressEncoder.encode(account.address), offset)
      offset += 32
    })

    data.set(addressEncoder.encode(instruction.programAddress), offset)
    offset += 32

    writeU16LE(data, instruction.data.length, offset)
    offset += 2

    data.set(instruction.data, offset)
    offset += instruction.data.length
  })

  writeU16LE(data, currentInstructionIndex, offset)

  return data
}

async function createAdvanceInstruction({
  programAddress,
  signerAddress,
  subInstructions,
  vectorSignature,
}: {
  programAddress: Address
  signerAddress: Address
  subInstructions: readonly Instruction[]
  vectorSignature: Uint8Array
}): Promise<ResolvedInstruction> {
  if (subInstructions.length > 255) {
    throw new Error(`Too many sub-instructions: ${subInstructions.length} (max 255).`)
  }

  const [vectorAddress] = await findVectorPda({ programAddress, signerAddress })
  const accounts: InstructionAccount[] = [
    { address: vectorAddress, role: AccountRole.WRITABLE },
    { address: INSTRUCTIONS_SYSVAR_ADDRESS, role: AccountRole.READONLY },
  ]
  const dataLength = subInstructions.reduce(
    (length, instruction) => {
      const resolvedInstruction = resolveInstruction(instruction)

      if (resolvedInstruction.accounts.length > 255) {
        throw new Error(`Sub-instruction has too many accounts: ${resolvedInstruction.accounts.length} (max 255).`)
      }
      if (resolvedInstruction.data.length > 65_535) {
        throw new Error(`Sub-instruction data too long: ${resolvedInstruction.data.length} (max 65535).`)
      }

      accounts.push({ address: resolvedInstruction.programAddress, role: AccountRole.READONLY })
      resolvedInstruction.accounts.forEach((account) => {
        accounts.push({
          address: account.address,
          role: downgradeSignerRole(account.role),
        })
      })

      return length + 1 + 2 + resolvedInstruction.data.length
    },
    1 + SIGNATURE_LENGTH + 1,
  )
  const data = new Uint8Array(dataLength)
  let offset = 0

  data[offset++] = ADVANCE_DISCRIMINATOR
  data.set(vectorSignature, offset)
  offset += SIGNATURE_LENGTH
  data[offset++] = subInstructions.length

  subInstructions.forEach((instruction) => {
    const resolvedInstruction = resolveInstruction(instruction)

    data[offset++] = resolvedInstruction.accounts.length
    writeU16LE(data, resolvedInstruction.data.length, offset)
    offset += 2
    data.set(resolvedInstruction.data, offset)
    offset += resolvedInstruction.data.length
  })

  return {
    accounts,
    data,
    programAddress,
  } as ResolvedInstruction
}

async function createCloseInstruction({
  closeTo,
  programAddress,
  signerAddress,
  vectorSignature,
}: {
  closeTo: Address
  programAddress: Address
  signerAddress: Address
  vectorSignature: Uint8Array
}): Promise<ResolvedInstruction> {
  const [vectorAddress] = await findVectorPda({ programAddress, signerAddress })
  const data = new Uint8Array(1 + SIGNATURE_LENGTH)

  data[0] = CLOSE_DISCRIMINATOR
  data.set(vectorSignature, 1)

  return {
    accounts: [
      { address: vectorAddress, role: AccountRole.WRITABLE },
      { address: INSTRUCTIONS_SYSVAR_ADDRESS, role: AccountRole.READONLY },
      { address: closeTo, role: AccountRole.WRITABLE },
    ],
    data,
    programAddress,
  } as ResolvedInstruction
}

async function createVectorDigest({
  feePayer,
  instructions,
  seed,
  signerAddress,
  vectorInstruction,
}: {
  feePayer?: Address
  instructions: readonly Instruction[]
  seed: Uint8Array
  signerAddress: Address
  vectorInstruction: Instruction
}) {
  const computeBudgetInstructions = getSolanaComputeBudgetInstructions(vectorComputeBudget)
  const messageInstructions = promoteToMessageFlags({
    feePayer,
    instructions: [...computeBudgetInstructions, vectorInstruction, ...instructions].map(resolveInstruction),
  })
  const buffer = constructInstructionsData({
    currentInstructionIndex: computeBudgetInstructions.length,
    instructions: messageInstructions,
  })
  const targetIndex = computeBudgetInstructions.length
  const instructionOffsetPosition = 2 + 2 * targetIndex
  const instructionOffset = readU16LE(buffer, instructionOffsetPosition)
  const accountCount = readU16LE(buffer, instructionOffset)
  const signatureStart = instructionOffset + 2 + 33 * accountCount + 32 + 2 + 1
  const signatureEnd = signatureStart + SIGNATURE_LENGTH
  const signerBytes = addressEncoder.encode(signerAddress)
  const digest = await crypto.subtle.digest(
    'SHA-256',
    concatBytes([buffer.slice(0, signatureStart), seed, signerBytes, buffer.slice(signatureEnd)]),
  )

  return new Uint8Array(digest)
}

function downgradeSignerRole(role: AccountRole) {
  switch (role) {
    case AccountRole.READONLY_SIGNER:
      return AccountRole.READONLY
    case AccountRole.WRITABLE_SIGNER:
      return AccountRole.WRITABLE
    default:
      return role
  }
}

function promoteToMessageFlags({
  feePayer,
  instructions,
}: {
  feePayer?: Address
  instructions: readonly ResolvedInstruction[]
}) {
  const roles = new Map<string, AccountRole>()

  if (feePayer) {
    roles.set(feePayer, AccountRole.WRITABLE_SIGNER)
  }

  instructions.forEach((instruction) => {
    instruction.accounts.forEach((account) => {
      roles.set(
        account.address,
        roles.has(account.address) ? mergeRoles(roles.get(account.address)!, account.role) : account.role,
      )
    })
  })

  return instructions.map((instruction) => ({
    ...instruction,
    accounts: instruction.accounts.map((account) => ({
      ...account,
      role: roles.get(account.address) ?? account.role,
    })),
  }))
}

function readU16LE(data: Uint8Array, offset: number) {
  return data[offset]! | (data[offset + 1]! << 8)
}

function resolveInstruction(instruction: Instruction) {
  if (!instruction.accounts || !instruction.data) {
    throw new Error('Vector instructions must include accounts and data.')
  }

  return instruction as ResolvedInstruction
}

async function signAdvanceInstruction({
  feePayer,
  instructions,
  programAddress,
  seed,
  signer,
  subInstructions,
}: {
  feePayer?: Address
  instructions: readonly Instruction[]
  programAddress: Address
  seed: Uint8Array
  signer: KeyPairSigner
  subInstructions: readonly Instruction[]
}) {
  const vectorSignature = new Uint8Array(
    await signBytes(
      signer.keyPair.privateKey,
      await advanceVectorDigest({
        feePayer,
        instructions,
        programAddress,
        seed,
        signerAddress: signer.address,
        subInstructions,
      }),
    ),
  )

  return await createAdvanceInstruction({
    programAddress,
    signerAddress: signer.address,
    subInstructions,
    vectorSignature,
  })
}

async function signCloseInstruction({
  closeTo,
  feePayer,
  programAddress,
  seed,
  signer,
}: {
  closeTo: Address
  feePayer?: Address
  programAddress: Address
  seed: Uint8Array
  signer: KeyPairSigner
}) {
  const vectorSignature = new Uint8Array(
    await signBytes(
      signer.keyPair.privateKey,
      await closeVectorDigest({
        closeTo,
        feePayer,
        programAddress,
        seed,
        signerAddress: signer.address,
      }),
    ),
  )

  return await createCloseInstruction({
    closeTo,
    programAddress,
    signerAddress: signer.address,
    vectorSignature,
  })
}

function writeU16LE(data: Uint8Array, value: number, offset: number) {
  data[offset] = value & 0xff
  data[offset + 1] = (value >> 8) & 0xff
}
