// i18n.ts
import * as i18n from '@solid-primitives/i18n'
import type * as en from './locales/en.ts'

export type Locale = 'en' | 'ru'
export type RawDictionary = typeof en.dict
export type Dictionary = i18n.Flatten<RawDictionary>

const dictionaries: Record<Locale, () => Promise<{ dict: RawDictionary }>> = {
  en: () => import('./locales/en.ts') as any,
  ru: () => import('./locales/ru.ts') as any
}

export async function fetchDictionary(locale: Locale): Promise<Dictionary> {
  const { dict } = await dictionaries[locale]()
  return i18n.flatten(dict)
}
