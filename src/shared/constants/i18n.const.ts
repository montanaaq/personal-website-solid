import type { Locale } from '../i18n/i18n'

export const SUPPORTED_LOCALES = ['en', 'ru'] as const satisfies readonly Locale[]

export const LOCALE_DISPLAY: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU'
}
