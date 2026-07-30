import DOMPurify from 'dompurify'

export const sanitizeArticleHtml = (html: string | null | undefined): string => {
  return DOMPurify.sanitize(html || '', {
    USE_PROFILES: { html: true },
  })
}

export const toSafeExternalUrl = (value: unknown): string => {
  if (typeof value !== 'string' || !value.trim()) return ''

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : ''
  } catch {
    return ''
  }
}
