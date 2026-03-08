import * as i18n from '@solid-primitives/i18n'

// use `type` to not include the actual dictionary in the bundle
import type * as en from './locales/en'

export type Locale = 'en' | 'ru'
export type RawDictionary = typeof en.dict
export type Dictionary = i18n.Flatten<RawDictionary>

export async function fetchDictionary(locale: Locale): Promise<Dictionary> {
  const dict: RawDictionary = (await import(`./locales/${locale}`)).dict
  return i18n.flatten(dict) // flatten the dictionary to make all nested keys available top-level
}
