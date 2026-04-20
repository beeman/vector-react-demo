import { useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/core/ui/alert'
import { Button } from '@/core/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/ui/card'
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from '@/core/ui/field'
import { Spinner } from '@/core/ui/spinner'
import { Textarea } from '@/core/ui/textarea'

export function VectorUiSignerSessionCard({
  onGenerate,
  onImport,
}: {
  onGenerate(): Promise<void>
  onImport(bytes: Uint8Array): Promise<null | string>
}) {
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [importText, setImportText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  async function handleGenerate() {
    setErrorMessage(null)
    setIsGenerating(true)

    try {
      await onGenerate()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to generate a signer.')
    } finally {
      setIsGenerating(false)
    }
  }

  async function handleImport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    let nextBytes: Uint8Array

    try {
      nextBytes = parseSignerBytes(importText)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to parse the signer bytes.')
      return
    }

    setErrorMessage(null)
    setIsImporting(true)

    try {
      const nextErrorMessage = await onImport(nextBytes)

      if (!nextErrorMessage) {
        return
      }

      setErrorMessage(nextErrorMessage)
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>Vector signer session</CardTitle>
        <CardDescription>
          Generate a session-only Ed25519 key for Vector or import a saved 32-byte seed or 64-byte keypair JSON array.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full" disabled={isGenerating || isImporting} onClick={() => void handleGenerate()}>
          {isGenerating ? <Spinner /> : null}
          {isGenerating ? 'Generating signer...' : 'Generate signer'}
        </Button>
        <form className="space-y-3" onSubmit={(event) => void handleImport(event)}>
          <Field>
            <FieldLabel htmlFor="vector-signer-import">Import signer bytes</FieldLabel>
            <FieldContent>
              <Textarea
                className="min-h-32 font-mono text-xs"
                disabled={isGenerating || isImporting}
                id="vector-signer-import"
                onChange={(event) => {
                  setErrorMessage(null)
                  setImportText(event.currentTarget.value)
                }}
                placeholder="[12,34,...]"
                value={importText}
              />
              <FieldDescription>
                Use the exported JSON array from a previous session. Vector accepts either a 32-byte private seed or a
                64-byte keypair.
              </FieldDescription>
              <FieldError>{errorMessage}</FieldError>
            </FieldContent>
          </Field>
          <Button className="w-full" disabled={isGenerating || isImporting} type="submit" variant="outline">
            {isImporting ? <Spinner /> : null}
            {isImporting ? 'Importing signer...' : 'Import signer'}
          </Button>
        </form>
        <Alert>
          <AlertTitle>Session-only by design</AlertTitle>
          <AlertDescription>
            The generated signer stays in memory only. Export its bytes from the next screen if you want to reuse the
            same Vector account after a refresh.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

function parseSignerBytes(value: string) {
  const parsed = JSON.parse(value) as unknown

  if (!Array.isArray(parsed)) {
    throw new Error('Enter a JSON array of 32 or 64 integers.')
  }

  const bytes = Uint8Array.from(
    parsed.map((item) => {
      if (!Number.isInteger(item) || item < 0 || item > 255) {
        throw new Error('Signer bytes must be integers between 0 and 255.')
      }

      return item
    }),
  )

  if (bytes.length !== 32 && bytes.length !== 64) {
    throw new Error('Signer imports must contain exactly 32 or 64 bytes.')
  }

  return bytes
}
