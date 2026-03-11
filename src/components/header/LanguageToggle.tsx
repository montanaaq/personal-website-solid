import type { Component } from 'solid-js'
import { Motion as m } from 'solid-motionone'
import {
  LOCALE_DISPLAY,
  SUPPORTED_LOCALES
} from '@/shared/constants/i18n.const'
import { useI18n } from '@/shared/context/I18nContext'
import type { Locale } from '@/shared/i18n/i18n'
import styles from './Header.module.css'

const getNextLocale = (current: Locale): Locale => {
  const currentIndex = SUPPORTED_LOCALES.indexOf(current as Locale)
  const nextIndex = (currentIndex + 1) % SUPPORTED_LOCALES.length
  return SUPPORTED_LOCALES[nextIndex]
}

const LanguageToggle: Component = () => {
  const { locale, setLocale } = useI18n()

  const toggleLanguage = () => {
    const next = getNextLocale(locale())
    setLocale(next)
  }
  return (
    <m.button
      onClick={toggleLanguage}
      class={styles.language_toggle}
      transition={{ easing: 'ease-in-out', duration: 0.3 }}
    >
      {LOCALE_DISPLAY[locale()]}
    </m.button>
  )
}

export default LanguageToggle
