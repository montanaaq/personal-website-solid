import * as i18n from '@solid-primitives/i18n'
import { createResource, createSignal } from 'solid-js'
import { fetchDictionary, type Locale } from './i18n'

export function useI18n() {
  const [locale, setLocale] = createSignal<Locale>('en')
  const [dict] = createResource(locale, fetchDictionary)

  const t = i18n.translator(dict, i18n.resolveTemplate)

  return {
    t,
    locale,
    setLocale,
    dict
  }
}
