import type en from './locales/en.json'

export type Locale = 'en' | 'ru'
export type Dictionary = { [Key in keyof typeof en]: string }
export type TranslationKey = keyof Dictionary

type LazyLocale = Exclude<Locale, 'en'>

const dictionaries: Record<LazyLocale, () => Promise<{ default: Dictionary }>> = {
  ru: () => import('./locales/ru.json')
}

export async function fetchDictionary(locale: LazyLocale): Promise<Dictionary> {
  const { default: dictionary } = await dictionaries[locale]()
  return dictionary
}
