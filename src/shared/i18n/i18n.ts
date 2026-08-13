import type * as en from './locales/en.ts'

import * as i18n from '@solid-primitives/i18n'

export type Locale = 'en' | 'ru'
type StringDictionary<T> = {
  [Key in keyof T]: T[Key] extends string ? string : StringDictionary<T[Key]>
}

export type RawDictionary = StringDictionary<typeof en.dict>
export type Dictionary = i18n.Flatten<RawDictionary>
export type TranslationKey = {
  [Key in keyof Dictionary]: Dictionary[Key] extends string ? Key : never
}[keyof Dictionary]

type LazyLocale = Exclude<Locale, 'en'>

const dictionaries: Record<LazyLocale, () => Promise<{ dict: RawDictionary }>> = {
  ru: () => import('./locales/ru.ts')
}

export async function fetchDictionary(locale: LazyLocale): Promise<Dictionary> {
  const { dict } = await dictionaries[locale]()
  return i18n.flatten(dict)
}
