import { useI18n } from '@/shared/contexts/I18nContext'
import { useTheme } from '@/shared/contexts/ThemeContext'
import { Portal } from '@solidjs/web'
import { type Component, createMemo, createSignal, onCleanup, Show } from 'solid-js'

import MoonIcon from '../icons/MoonIcon'
import SunIcon from '../icons/SunIcon'
import styles from './Header.module.css'

const ThemeToggle: Component = () => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()

  const [message, setMessage] = createSignal('')
  let dismissTimer: ReturnType<typeof setTimeout> | undefined
  onCleanup(() => clearTimeout(dismissTimer))

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
    setMessage(activatingLightTheme ? t('theme.light-activated') : t('theme.dark-activated'))
    clearTimeout(dismissTimer)
    dismissTimer = setTimeout(() => setMessage(''), 2500)
  }

  return (
    <>
      <button
        onClick={handleClick}
        class={styles.toggle_light_mode}
        aria-label={isLight() ? t('theme.switch-to-dark') : t('theme.switch-to-light')}
        title={isLight() ? t('theme.switch-to-dark') : t('theme.switch-to-light')}
      >
        <Show when={isLight()} fallback={<SunIcon stroke-width={1.5} />}>
          <MoonIcon stroke-width={1.5} />
        </Show>
      </button>
      <Portal>
        <div role="status" aria-live="polite" class={styles.theme_notice} hidden={!message()}>
          {message()}
        </div>
      </Portal>
    </>
  )
}

export default ThemeToggle
