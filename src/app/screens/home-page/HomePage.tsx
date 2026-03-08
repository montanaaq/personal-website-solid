import { A } from '@solidjs/router'
import type { Component } from 'solid-js'
import MoonIcon from '@/components/icons/MoonIcon'
import SunIcon from '@/components/icons/SunIcon'
import { useI18n } from '@/shared/i18n/useI18n'

const HomePage: Component = () => {
  const { t } = useI18n()
  
  return (
    <div>
      Homepage
      <A href="/info">{t('buttonLink')}</A>
      <SunIcon stroke-width={1.5} />
      <MoonIcon stroke-width={1.5} />
    </div>
  )
}

export default HomePage
