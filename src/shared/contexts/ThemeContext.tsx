import type { JSX } from '@solidjs/web'

import { createContext, createEffect, createSignal, untrack, flush, useContext } from 'solid-js'

type Theme = 'dark' | 'light'

type Coords = { x: number; y: number }

type ThemeContextValue = {
  theme: () => Theme
  setTheme: (theme: Theme) => void
  toggleTheme: (coords?: Coords) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'app-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    return 'dark'
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

type ThemeProviderProps = {
  children: JSX.Element
  defaultTheme?: Theme
}

export function ThemeProvider(props: ThemeProviderProps) {
  const [theme, setThemeState] = createSignal<Theme>(
    untrack(() => props.defaultTheme ?? getInitialTheme())
  )

  createEffect(theme, selectedTheme => {
    const root = document.documentElement
    root.setAttribute('data-theme', selectedTheme)
    localStorage.setItem(STORAGE_KEY, selectedTheme)
  })

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const toggleTheme = (coords?: Coords) => {
    const newTheme: Theme = theme() === 'light' ? 'dark' : 'light'

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(newTheme)
      return
    }

    const root = document.documentElement
    if (coords) {
      root.style.setProperty('--vt-x', `${coords.x}px`)
      root.style.setProperty('--vt-y', `${coords.y}px`)
    } else {
      root.style.setProperty('--vt-x', '50vw')
      root.style.setProperty('--vt-y', '50vh')
    }

    root.setAttribute('data-theme-transitioning', newTheme)

    const transition = document.startViewTransition(() => {
      flush(() => setTheme(newTheme))
    })

    void transition.finished.finally(() => {
      root.removeAttribute('data-theme-transitioning')
    })
  }

  return <ThemeContext value={{ theme, setTheme, toggleTheme }}>{props.children}</ThemeContext>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }
  return context
}
