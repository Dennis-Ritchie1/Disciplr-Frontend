/**
 * Validates if a URL is safe to render as a link.
 * Only allows http and https schemes.
 * Rejects javascript:, data:, and other potentially dangerous schemes.
 */
export function normalizeEvidenceUrl(value: string): string | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? trimmed : null
  } catch {
    return null
  }
}

export function isSafeEvidenceUrl(value: string): boolean {
  return normalizeEvidenceUrl(value) !== null
}
