import type { JSX } from '@solidjs/web'

import * as i18n from '@solid-primitives/i18n'
import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  onSettled,
  useContext
} from 'solid-js'

import { SUPPORTED_LOCALES } from '../constants/i18n.const'
import { fetchDictionary, type Locale } from '../i18n/i18n'
import en from '../i18n/locales/en.json'

type I18nContextValue = ReturnType<typeof useI18nState>
const LANG_STORAGE_KEY = 'language'
const DEFAULT_LOCALE = 'en' as const satisfies Locale

const isLocale = (value: string | null): value is Locale =>
  SUPPORTED_LOCALES.includes(value as Locale)

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  try {
    const storedLocale = localStorage.getItem(LANG_STORAGE_KEY)
    if (isLocale(storedLocale)) return storedLocale
  } catch {
    return DEFAULT_LOCALE
  }

  const browserLocale = navigator.language.split('-')[0] ?? null
  return isLocale(browserLocale) ? browserLocale : DEFAULT_LOCALE
}

function useI18nState() {
  const [locale, setLocale] = createSignal<Locale>(getInitialLocale())

  createEffect(locale, selectedLocale => {
    localStorage.setItem(LANG_STORAGE_KEY, selectedLocale)
    document.documentElement.lang = selectedLocale
  })

  onSettled(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== LANG_STORAGE_KEY) return

      const nextLocale = isLocale(event.newValue) ? event.newValue : DEFAULT_LOCALE

      if (nextLocale !== locale()) {
        setLocale(nextLocale)
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => window.removeEventListener('storage', handleStorage)
  })

  const dict = createMemo(
    () => {
      const selectedLocale = locale()
      return selectedLocale === DEFAULT_LOCALE ? en : fetchDictionary(selectedLocale)
    },
    { loadingValue: en }
  )

  const translator = i18n.translator(dict, i18n.resolveTemplate)

  return { t: translator, locale, setLocale, dict }
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

interface ProviderProps {
  children: JSX.Element
}

export function I18nProvider(props: ProviderProps) {
  return <I18nContext value={useI18nState()}>{props.children}</I18nContext>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within <I18nProvider>')
  return context
}
