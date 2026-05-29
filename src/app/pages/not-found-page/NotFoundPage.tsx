import { A } from '@solidjs/router'
import type { Component } from 'solid-js'
import { Motion as m } from 'solid-motionone'
import { useI18n } from '@/shared/context/I18nContext'
import styles from './NotFoundPage.module.css'

const NotFoundPage: Component = () => {
  const { t } = useI18n()
  return (
    <m.div
      class={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
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
    </m.div>
  )
}

export default NotFoundPage
