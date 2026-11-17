import type { Component } from 'solid-js'

import PageMetadata from '@/components/page-metadata/PageMetadata'
import { useI18n } from '@/shared/contexts/I18nContext'
import { animate } from '@motionone/dom'
import { useLocation } from '@solidjs/router'
import { onSettled } from 'solid-js'

import styles from './NotFoundPage.module.css'

const NotFoundPage: Component = () => {
  const { t } = useI18n()
  const location = useLocation()

  let content: HTMLDivElement | undefined
  onSettled(() => {
    if (!content || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animation = animate(
      content,
      { y: [20, 0], opacity: [0, 1] },
      {
        delay: 0.2,
        duration: 0.5
      }
    )
    return () => animation.cancel()
  })

  return (
    <>
      <PageMetadata
        title={t('meta.not-found-title')}
        description={t('not-found.description')}
        path={location.pathname}
        noIndex
      />
      <main class={styles.container}>
        <div class={styles.content} ref={element => (content = element)}>
          <h1 class={styles.error_code}>404</h1>
          <h2 class={styles.error_message}>{t('not-found.title')}</h2>
          <p class={styles.description}>{t('not-found.description')}</p>
          <a href="/" class={styles.home_link}>
            {t('not-found.home-button')}
          </a>
        </div>
      </main>
    </>
  )
}

export default NotFoundPage
