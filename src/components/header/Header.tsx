import { A } from '@solidjs/router'
import { type Component, createEffect, createSignal } from 'solid-js'
import { useI18n } from '@/shared/context/I18nContext'
import styles from './Header.module.css'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

const Header: Component = () => {
  const { t } = useI18n()
  const [isScrolled, setIsScrolled] = createSignal(false)

  createEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header class={`${styles.header} ${isScrolled() ? styles.scrolled : ''}`}>
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
