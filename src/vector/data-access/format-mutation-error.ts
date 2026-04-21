export function formatMutationError(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown error occurred.'
}
