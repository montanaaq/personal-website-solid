import * as i18n from '@solid-primitives/i18n'
import {
  createContext,
  createResource,
  createSignal,
  type JSX,
  useContext
} from 'solid-js'
import { fetchDictionary, type Locale } from '../i18n/i18n'
import { dict as en_dict } from '../i18n/locales/en'

type I18nContextValue = ReturnType<typeof useI18nState>

function useI18nState() {
  const [locale, setLocale] = createSignal<Locale>('en')
  const [dict] = createResource(locale, fetchDictionary, {
    initialValue: i18n.flatten(en_dict)
  })

  const translator = i18n.translator(
    () => dict.latest ?? i18n.flatten(en_dict),
    i18n.resolveTemplate
  )
  const t = translator as (key: string, ...args: any[]) => string

  return { t, locale, setLocale, dict }
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

interface ProviderProps {
  children: JSX.Element
}

export function I18nProvider(props: ProviderProps) {
  return (
    <I18nContext.Provider value={useI18nState()}>
      {props.children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within <I18nProvider>')
  return context
}
