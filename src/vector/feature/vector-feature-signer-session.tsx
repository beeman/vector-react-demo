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

export function VectorFeatureSignerSession({ onReady }: { onReady(state: VectorSignerSessionState): void }) {
  async function handleGenerate() {
    onReady(await createSignerSessionState(await generateKeyPairSigner(true)))
  }

  async function handleImport(bytes: Uint8Array) {
    try {
      onReady(
        await createSignerSessionState(
          bytes.length === 64
            ? await createKeyPairSignerFromBytes(bytes, true)
            : await createKeyPairSignerFromPrivateKeyBytes(bytes, true),
        ),
      )

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
