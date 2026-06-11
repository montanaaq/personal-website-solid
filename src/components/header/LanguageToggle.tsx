import type { Component } from 'solid-js'

import { Motion as m } from 'solid-motionone'

import { LOCALE_DISPLAY } from '@/shared/constants/i18n.const'
import { useI18n } from '@/shared/context/I18nContext'
import { getNextLocale } from '@/shared/helpers/get-next-locale'

import styles from './Header.module.css'

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
