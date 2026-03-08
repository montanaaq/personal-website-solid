import { m } from 'motion/react'
import type { Component } from 'solid-js'
import { toast } from 'sonner'
import { useTheme } from '@/shared/contexts/ThemeContext'
import { useLanguage } from '@/shared/hooks/useLanguage'
import SunIcon from '../icons/SunIcon'
import styles from './Header.module.css'

const ThemeToggle: Component = () => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  const isLight = theme === 'light'

  const handleClick = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }

    toggleTheme(coords)

    toast.info(isLight ? t.theme.darkActivated : t.theme.lightActivated)
  }

  return (
    <div>
      <m.button
        onClick={handleClick}
        className={styles.toggle_light_mode}
        whileHover={{
          scale: 1.1,
          rotate: 180,
          transition: { type: 'spring', stiffness: 300, damping: 10 }
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        aria-label={isLight ? t.theme.darkActivated : t.theme.lightActivated}
        title={isLight ? t.theme.darkActivated : t.theme.lightActivated}
      >
        {isLight ? (
          <MoonIcon strokeWidth={1.5} />
        ) : (
          <SunIcon strokeWidth={1.5} />
        )}
      </m.button>
    </div>
  )
}

export default ThemeToggle
