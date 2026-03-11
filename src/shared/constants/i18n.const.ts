import type { Locale } from '../i18n/i18n'

export const SUPPORTED_LOCALES: Locale[] = ['en', 'ru'] as const

export const LOCALE_DISPLAY: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU'
}
