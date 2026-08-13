import { useI18n } from '@/shared/contexts/I18nContext'
import { useTheme } from '@/shared/contexts/ThemeContext'
import { type Component, createMemo, Show } from 'solid-js'
import { Motion as m } from 'solid-motionone'
import { toast } from 'solid-sonner'

import MoonIcon from '../icons/MoonIcon'
import SunIcon from '../icons/SunIcon'
import styles from './Header.module.css'

const ThemeToggle: Component = () => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()

  const isLight = createMemo(() => theme() === 'light')

  const handleClick = (e: MouseEvent) => {
    if (!e.currentTarget) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }

    const activatingLightTheme = !isLight()
    toggleTheme(coords)
    toast.info(activatingLightTheme ? t('theme.light-activated') : t('theme.dark-activated'))
  }

  return (
    <div>
      <m.button
        onClick={handleClick}
        class={styles.toggle_light_mode}
        transition={{ easing: 'ease-in-out', duration: 0.3 }}
        aria-label={isLight() ? t('theme.switch-to-dark') : t('theme.switch-to-light')}
        title={isLight() ? t('theme.switch-to-dark') : t('theme.switch-to-light')}
      >
        <Show when={isLight()} fallback={<SunIcon stroke-width={1.5} />}>
          <MoonIcon stroke-width={1.5} />
        </Show>
      </m.button>
    </div>
  )
}

export default ThemeToggle
