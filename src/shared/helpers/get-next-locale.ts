import type { Locale } from '@/shared/i18n/i18n'

import { SUPPORTED_LOCALES } from '@/shared/constants/i18n.const'

export const getNextLocale = (current: Locale): Locale => {
  const currentIndex = SUPPORTED_LOCALES.indexOf(current)
  const nextIndex = (currentIndex + 1) % SUPPORTED_LOCALES.length
  return SUPPORTED_LOCALES[nextIndex] ?? SUPPORTED_LOCALES[0]
}
