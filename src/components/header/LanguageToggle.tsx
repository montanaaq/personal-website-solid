import type { Component } from 'solid-js'

import { LOCALE_DISPLAY } from '@/shared/constants/i18n.const'
import { useI18n } from '@/shared/contexts/I18nContext'
import { getNextLocale } from '@/shared/helpers/get-next-locale'
import { Motion as m } from 'solid-motionone'

import styles from './Header.module.css'

const LanguageToggle: Component = () => {
  const { locale, setLocale, t } = useI18n()

  const toggleLanguage = () => {
    const next = getNextLocale(locale())
    setLocale(next)
  }
  return (
    <m.button
      onClick={toggleLanguage}
      class={styles.language_toggle}
      transition={{ easing: 'ease-in-out', duration: 0.3 }}
      aria-label={t('language.switch', { language: LOCALE_DISPLAY[getNextLocale(locale())] })}
      title={t('language.switch', { language: LOCALE_DISPLAY[getNextLocale(locale())] })}
    >
      {LOCALE_DISPLAY[locale()]}
    </m.button>
  )
}

export default LanguageToggle
