import { Link, Meta, Title } from '@solidjs/meta'
import { type Component, createMemo } from 'solid-js'

const SITE_URL = 'https://montaanaq.netlify.app'

type PageMetadataProps = {
  title: string
  description: string
  path: string
  noIndex?: boolean
}

const PageMetadata: Component<PageMetadataProps> = props => {
  const canonicalUrl = createMemo(() => new URL(props.path, SITE_URL).toString())

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
      <Link rel="canonical" href={canonicalUrl()} />
    </>
  )
}

export default PageMetadata
