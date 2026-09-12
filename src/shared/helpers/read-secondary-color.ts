const FALLBACK_TINT = '#1876d2'

export const readSecondaryColor = () => {
  if (typeof document === 'undefined') return FALLBACK_TINT

  const value = getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim()

  return value || FALLBACK_TINT
}
