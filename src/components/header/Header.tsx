import type { Component } from 'solid-js'

import { useI18n } from '@/shared/contexts/I18nContext'
import { A, useLocation } from '@solidjs/router'
import { Show } from 'solid-js'

import styles from './Header.module.css'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

const Header: Component = () => {
  const { t } = useI18n()
  const location = useLocation()

  const openProjectMenu = () => {
    const dialog = document.querySelector<HTMLDialogElement>('#project-navigation-dialog')

    if (dialog && !dialog.open) dialog.showModal()
  }

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
          <Show when={location.pathname === '/info'}>
            <button
              type="button"
              class={styles.project_menu_button}
              aria-label={t('info.open-project-menu')}
              aria-haspopup="dialog"
              aria-controls="project-navigation-dialog"
              onClick={openProjectMenu}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </Show>
        </div>
      </div>
    </header>
  )
}

export default Header
