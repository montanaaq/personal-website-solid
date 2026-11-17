import { Link, Meta, Title } from '@solidjs/meta'
import { type Component, createMemo, onSettled } from 'solid-js'

type PageMetadataProps = {
  title: string
  description: string
  path: string
  noIndex?: boolean
}

const PageMetadata: Component<PageMetadataProps> = props => {
  const canonicalUrl = createMemo(() =>
    new URL(props.path, import.meta.env.VITE_SITE_URL).toString()
  )

  onSettled(() => {
    document.head.querySelectorAll('meta[data-sm], link[data-sm]').forEach(tag => tag.remove())
  })

  return (
    <>
      <Title>{props.title}</Title>
      <Meta name="description" content={props.description} />
      <Meta property="og:title" content={props.title} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:url" content={canonicalUrl()} />
      <Meta name="twitter:title" content={props.title} />
      <Meta name="twitter:description" content={props.description} />
      <Meta name="robots" content={props.noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <Link key="canonical" rel="canonical" href={canonicalUrl()} />
    </>
  )
}

export default PageMetadata
