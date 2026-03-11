import { type Component, Show } from 'solid-js'
import { Motion as m } from 'solid-motionone'
import { toast } from 'sonner'
import { useI18n } from '@/shared/context/I18nContext'
import { useTheme } from '@/shared/context/ThemeContext'
import MoonIcon from '../icons/MoonIcon'
import SunIcon from '../icons/SunIcon'
import styles from './Header.module.css'

const ThemeToggle: Component = () => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()

  const isLight = theme() === 'light'

  const handleClick = (e: MouseEvent) => {
    if (!e.currentTarget) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }

    toggleTheme(coords)

    toast.info(isLight ? t('theme.dark-activated') : t('theme.light-activated'))
  }

  return (
    <div>
      <m.button
        onClick={handleClick}
        class={styles.toggle_light_mode}
        transition={{ easing: 'ease-in-out', duration: 0.3 }}
        aria-label={
          isLight ? t('theme.dark-activated') : t('theme.light-activated')
        }
        title={isLight ? t('theme.dark-activated') : t('theme.light-activated')}
      >
        <Show when={isLight} fallback={<SunIcon stroke-width={1.5} />}>
          <MoonIcon stroke-width={1.5} />
        </Show>
      </m.button>
    </div>
  )
}

export default ThemeToggle
