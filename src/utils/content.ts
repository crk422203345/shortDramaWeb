/**
 * 内容安全工具：清洗服务端富文本，并限制外链仅使用 HTTP/HTTPS 协议。
 */
import DOMPurify from 'dompurify'

export const sanitizeArticleHtml = (html: string | null | undefined): string => {
  // 富文本会通过 v-html 渲染，必须先移除潜在的危险标签和属性。
  return DOMPurify.sanitize(html || '', {
    USE_PROFILES: { html: true },
  })
}

export const toSafeExternalUrl = (value: unknown): string => {
  // 只接受绝对 HTTP(S) 链接，避免将不可信字符串注入到 href。
  if (typeof value !== 'string' || !value.trim()) return ''

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : ''
  } catch {
    return ''
  }
}
