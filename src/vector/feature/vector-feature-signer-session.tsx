import {
  createKeyPairSignerFromBytes,
  createKeyPairSignerFromPrivateKeyBytes,
  generateKeyPairSigner,
  type KeyPairSigner,
} from '@solana/kit'

import { VectorUiSignerSessionCard } from '@/vector/ui/vector-ui-signer-session-card'

export interface VectorSignerSessionState {
  exportKeyBytesJson: string
  signer: KeyPairSigner
}

export async function createSignerSessionStateFromBytes(bytes: Uint8Array): Promise<VectorSignerSessionState> {
  return createSignerSessionState(
    bytes.length === 64
      ? await createKeyPairSignerFromBytes(bytes, true)
      : await createKeyPairSignerFromPrivateKeyBytes(bytes, true),
  )
}

export async function restoreSignerSessionState(exportKeyBytesJson: string): Promise<VectorSignerSessionState> {
  const parsed = JSON.parse(exportKeyBytesJson) as unknown

  if (!Array.isArray(parsed)) {
    throw new Error('Stored signer bytes must be a JSON array.')
  }

  const bytes = Uint8Array.from(
    parsed.map((item) => {
      if (!Number.isInteger(item) || item < 0 || item > 255) {
        throw new Error('Stored signer bytes must be integers between 0 and 255.')
      }

      return item
    }),
  )

  if (bytes.length !== 32 && bytes.length !== 64) {
    throw new Error('Stored signer bytes must contain exactly 32 or 64 bytes.')
  }

  return createSignerSessionStateFromBytes(bytes)
}

export function VectorFeatureSignerSession({ onReady }: { onReady(state: VectorSignerSessionState): void }) {
  async function handleGenerate() {
    onReady(await createSignerSessionState(await generateKeyPairSigner(true)))
  }

  async function handleImport(bytes: Uint8Array) {
    try {
      onReady(await createSignerSessionStateFromBytes(bytes))

      return null
    } catch (error) {
      return error instanceof Error ? error.message : 'Unable to import the signer.'
    }
  }

  return <VectorUiSignerSessionCard onGenerate={handleGenerate} onImport={handleImport} />
}

async function createSignerSessionState(signer: KeyPairSigner): Promise<VectorSignerSessionState> {
  return {
    exportKeyBytesJson: JSON.stringify(Array.from(await exportSignerBytes(signer))),
    signer,
  }
}

async function exportSignerBytes(signer: KeyPairSigner) {
  const [privateKeyPkcs8, publicKeyRaw] = await Promise.all([
    crypto.subtle.exportKey('pkcs8', signer.keyPair.privateKey),
    crypto.subtle.exportKey('raw', signer.keyPair.publicKey),
  ])
  const privateKeyBytes = new Uint8Array(privateKeyPkcs8).slice(16)
  const publicKeyBytes = new Uint8Array(publicKeyRaw)
  const bytes = new Uint8Array(64)

  bytes.set(privateKeyBytes, 0)
  bytes.set(publicKeyBytes, 32)

  return bytes
}
