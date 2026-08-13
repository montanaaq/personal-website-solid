import type { Component } from 'solid-js'

import { useI18n } from '@/shared/contexts/I18nContext'
import { A } from '@solidjs/router'

import styles from './Header.module.css'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

const Header: Component = () => {
  const { t } = useI18n()

  return (
    <header class={styles.header}>
      <div class={styles.wrapper}>
        <div>
          <A
            href="/"
            style={{
              'text-decoration': 'none'
            }}
          >
            <h4 class={styles.name}>{t('header.name')}</h4>
          </A>
          <div>
            <ThemeToggle />
          </div>
        </div>
        <div>
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
