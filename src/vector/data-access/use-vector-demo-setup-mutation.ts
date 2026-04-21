import { getCreateAccountInstruction } from '@solana-program/system'
import {
  findAssociatedTokenPda,
  getCreateAssociatedTokenInstructionAsync,
  getInitializeMint2Instruction,
  getMintSize,
  TOKEN_PROGRAM_ADDRESS,
} from '@solana-program/token'
import {
  type Address,
  assertIsTransactionMessageWithSingleSendingSigner,
  compileTransactionMessage,
  generateKeyPairSigner,
  getBase58Decoder,
  getBase64Decoder,
  getCompiledTransactionMessageEncoder,
  type Instruction,
  signAndSendTransactionMessageWithSigners,
  type TransactionMessageBytesBase64,
  type TransactionSigner,
} from '@solana/kit'
import { useMutation } from '@tanstack/react-query'
import { type UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useState } from 'react'

import type { SolanaClient } from '@/solana/data-access/solana-client'

import { createVectorTransactionMessage } from '@/vector/data-access/create-vector-transaction-message'

export interface VectorDemoSetupResult {
  destinationAtaAddress: Address
  mintAddress: Address
}

export function useVectorDemoSetupMutation({
  account,
  client,
  vectorAddress,
}: {
  account: UiWalletAccount
  client: SolanaClient
  vectorAddress: Address
}) {
  const transactionSigner = useWalletUiSigner({ account })
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [signature, setSignature] = useState<null | string>(null)
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
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
      const instructions: readonly Instruction[] = [
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
      ] as const
      const signature = await executeSetupInstructions({
        client,
        instructions,
        requiredRent: mintRent + tokenAccountRent,
        transactionSigner,
      })

      return {
        destinationAtaAddress,
        mintAddress: mintSigner.address,
        signature,
      }
    },
  })

  async function prepareDemo() {
    setErrorMessage(null)
    setSignature(null)

    try {
      const result = await mutateAsync()

      setSignature(result.signature)

      return {
        destinationAtaAddress: result.destinationAtaAddress,
        mintAddress: result.mintAddress,
      } satisfies VectorDemoSetupResult
    } catch (error) {
      setErrorMessage(formatMutationError(error))

      return null
    }
  }

  return {
    errorMessage,
    isLoading: isPending,
    prepareDemo,
    signature,
  }
}

async function executeSetupInstructions({
  client,
  instructions,
  requiredRent,
  transactionSigner,
}: {
  client: SolanaClient
  instructions: readonly Instruction[]
  requiredRent: bigint
  transactionSigner: TransactionSigner
}) {
  const transactionMessage = await createVectorTransactionMessage({
    client,
    instructions,
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
  if (balance < fee + requiredRent) {
    throw new Error('Not enough SOL to pay transaction fees and fund the demo mint and token account on this cluster.')
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
