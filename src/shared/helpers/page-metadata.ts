const SITE_URL = 'https://montaanaq.netlify.app'

type PageMetadata = {
  title: string
  description: string
  path: string
  noIndex?: boolean
}

const setMetaContent = (selector: string, content: string) => {
  const element = document.querySelector<HTMLMetaElement>(selector)
  element?.setAttribute('content', content)
}

export const setPageMetadata = ({ title, description, path, noIndex = false }: PageMetadata) => {
  const canonicalUrl = new URL(path, SITE_URL).toString()

  document.title = title
  setMetaContent('meta[name="description"]', description)
  setMetaContent('meta[property="og:title"]', title)
  setMetaContent('meta[property="og:description"]', description)
  setMetaContent('meta[property="og:url"]', canonicalUrl)
  setMetaContent('meta[name="twitter:title"]', title)
  setMetaContent('meta[name="twitter:description"]', description)
  setMetaContent('meta[name="robots"]', noIndex ? 'noindex, nofollow' : 'index, follow')
  document
    .querySelector<HTMLLinkElement>('link[rel="canonical"]')
    ?.setAttribute('href', canonicalUrl)
}
