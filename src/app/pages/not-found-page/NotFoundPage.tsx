import type { Component } from 'solid-js'

import { useI18n } from '@/shared/contexts/I18nContext'
import { setPageMetadata } from '@/shared/helpers/page-metadata'
import { A } from '@solidjs/router'
import { createEffect } from 'solid-js'
import { Motion as m } from 'solid-motionone'

import styles from './NotFoundPage.module.css'

const NotFoundPage: Component = () => {
  const { t } = useI18n()
  createEffect(() => {
    setPageMetadata({
      title: t('meta.not-found-title'),
      description: t('not-found.description'),
      path: window.location.pathname,
      noIndex: true
    })
  })
  return (
    <main class={styles.container}>
      <m.div
        class={styles.content}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 class={styles.error_code}>404</h1>
        <h2 class={styles.error_message}>{t('not-found.title')}</h2>
        <p class={styles.description}>{t('not-found.description')}</p>
        <A href="/" class={styles.home_link}>
          {t('not-found.home-button')}
        </A>
      </m.div>
    </main>
  )
}

export default NotFoundPage
