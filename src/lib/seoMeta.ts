const BASE_IMAGE = 'https://www.byebyeblood.fr/og-image.png'

function setMeta(selector: string, value: string): string {
  const el = document.querySelector(selector)
  const prev = el?.getAttribute('content') ?? ''
  el?.setAttribute('content', value)
  return prev
}

export function injectOgMeta(opts: {
  title: string
  description: string
  url: string
  type?: 'article' | 'website'
  image?: string
}): () => void {
  const { title, description, url, type = 'article', image = BASE_IMAGE } = opts

  const pairs: [string, string][] = [
    ['meta[property="og:title"]', title],
    ['meta[property="og:description"]', description],
    ['meta[property="og:url"]', url],
    ['meta[property="og:type"]', type],
    ['meta[property="og:image"]', image],
    ['meta[name="twitter:title"]', title],
    ['meta[name="twitter:description"]', description],
    ['meta[name="twitter:image"]', image],
  ]

  const prevValues = pairs.map(([sel, val]) => [sel, setMeta(sel, val)] as [string, string])

  return () => prevValues.forEach(([sel, prev]) => setMeta(sel, prev))
}
