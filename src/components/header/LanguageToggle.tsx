import { m } from 'motion/react'
import type { Component } from 'solid-js'
import { useLanguage } from '@/shared/hooks/useLanguage'
import styles from './Header.module.css'

const LanguageToggle: Component = () => {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    const newLanguage = language === 'ru' ? 'en' : 'ru'
    setLanguage(newLanguage)
  }

  return (
    <m.button
      onClick={toggleLanguage}
      className={styles.language_toggle}
      whileHover={{
        scale: 1.05,
        transition: { type: 'spring', stiffness: 300, damping: 10 }
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {language === 'ru' ? 'EN' : 'RU'}
    </m.button>
  )
}

export default LanguageToggle
