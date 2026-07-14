import * as i18n from '@solid-primitives/i18n'
import {
  createContext,
  createEffect,
  createResource,
  createSignal,
  type JSX,
  onCleanup,
  onMount,
  useContext
} from 'solid-js'

import { SUPPORTED_LOCALES } from '../constants/i18n.const'
import { fetchDictionary, type Locale } from '../i18n/i18n'
import { enFlat } from '../i18n/locales/en'

type I18nContextValue = ReturnType<typeof useI18nState>
const LANG_STORAGE_KEY = 'language'
const DEFAULT_LOCALE: Locale = 'en'

const isLocale = (value: string | null): value is Locale =>
  SUPPORTED_LOCALES.includes(value as Locale)

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  const storedLocale = localStorage.getItem(LANG_STORAGE_KEY)
  return isLocale(storedLocale) ? storedLocale : DEFAULT_LOCALE
}

function useI18nState() {
  const [locale, setLocale] = createSignal<Locale>(getInitialLocale())

  createEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, locale())
    document.documentElement.lang = locale()
  })

  onMount(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== LANG_STORAGE_KEY) return

      const nextLocale = isLocale(event.newValue) ? event.newValue : DEFAULT_LOCALE

      if (nextLocale !== locale()) {
        setLocale(nextLocale)
      }
    }

    window.addEventListener('storage', handleStorage)

    onCleanup(() => {
      window.removeEventListener('storage', handleStorage)
    })
  })

  const [dict] = createResource(locale, fetchDictionary, {
    initialValue: enFlat
  })

  const translator = i18n.translator(() => dict.latest ?? enFlat, i18n.resolveTemplate)
  const t = translator as (key: string, ...args: any[]) => string

  return { t, locale, setLocale, dict }
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

interface ProviderProps {
  children: JSX.Element
}

export function I18nProvider(props: ProviderProps) {
  return <I18nContext.Provider value={useI18nState()}>{props.children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within <I18nProvider>')
  return context
}
