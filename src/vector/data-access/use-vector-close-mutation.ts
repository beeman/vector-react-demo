import {
  type Address,
  assertIsTransactionMessageWithSingleSendingSigner,
  compileTransactionMessage,
  getBase58Decoder,
  getBase64Decoder,
  getCompiledTransactionMessageEncoder,
  type Instruction,
  type KeyPairSigner,
  signAndSendTransactionMessageWithSigners,
  type TransactionMessageBytesBase64,
  type TransactionSigner,
} from '@solana/kit'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type SolanaClusterId, type UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useState } from 'react'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import {
  createVectorTransactionMessage,
  getVectorComputeBudgetInstructions,
} from '@/vector/data-access/create-vector-transaction-message'
import { getVectorProgramAddress } from '@/vector/data-access/get-vector-program-address'
import { getVectorAccountQueryKey } from '@/vector/data-access/use-vector-account-query'
import { signCloseInstruction } from '@/vector/data-access/vector-protocol'

export function useVectorCloseMutation({
  account,
  client,
  cluster,
  seed,
  signer,
}: {
  account: UiWalletAccount
  client: SolanaClient
  cluster: SolanaClusterId
  seed: Uint8Array
  signer: KeyPairSigner
}) {
  const programAddress = getVectorProgramAddress(cluster)
  const queryClient = useQueryClient()
  const transactionSigner = useWalletUiSigner({ account })
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [signature, setSignature] = useState<null | string>(null)
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      await assertVectorProgramIsAvailable({ client, programAddress })

      const computeBudgetInstructions = getVectorComputeBudgetInstructions()
      const instruction = await signCloseInstruction({
        closeTo: transactionSigner.address,
        feePayer: transactionSigner.address,
        postInstructions: [],
        preInstructions: computeBudgetInstructions,
        programAddress,
        seed,
        signer,
      })

      return await executeCloseInstruction({
        client,
        instruction,
        transactionSigner,
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getVectorAccountQueryKey(cluster, signer.address),
      })
    },
  })

  async function closeVector() {
    setErrorMessage(null)
    setSignature(null)

    try {
      const nextSignature = await mutateAsync()

      setSignature(nextSignature)

      return nextSignature
    } catch (error) {
      setErrorMessage(formatMutationError(error))

      return null
    }
  }

  return {
    closeVector,
    errorMessage,
    isLoading: isPending,
    signature,
  }
}

async function assertVectorProgramIsAvailable({
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

async function executeCloseInstruction({
  client,
  instruction,
  transactionSigner,
}: {
  client: SolanaClient
  instruction: Instruction
  transactionSigner: TransactionSigner
}) {
  const transactionMessage = await createVectorTransactionMessage({
    client,
    instructions: [instruction],
    transactionSigner,
  })

  assertIsTransactionMessageWithSingleSendingSigner(transactionMessage)

  const encodedTransactionMessage = getCompiledTransactionMessageEncoder().encode(
    compileTransactionMessage(transactionMessage),
  )
  const [{ value: balance }, { value: fee }] = await Promise.all([
    client.rpc.getBalance(transactionSigner.address, { commitment: 'confirmed' }).send(),
    client.rpc
      .getFeeForMessage(getBase64Decoder().decode(encodedTransactionMessage) as TransactionMessageBytesBase64, {
        commitment: 'confirmed',
      })
      .send(),
  ])

  if (fee === null) {
    throw new Error('Unable to estimate the transaction fee. Try again with a fresh blockhash.')
  }
  if (balance < fee) {
    throw new Error('Not enough SOL to pay transaction fees on this cluster.')
  }

  const signatureBytes = await signAndSendTransactionMessageWithSigners(transactionMessage)
  const signature = getBase58Decoder().decode(signatureBytes)

  if (!signature) {
    throw new Error('Transaction submitted but no signature was returned by the wallet adapter.')
  }

  return signature
}

function formatMutationError(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown error occurred.'
}
