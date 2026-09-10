import Footer from '@/components/footer/Footer'
import PageMetadata from '@/components/page-metadata/PageMetadata'
import FaultyTerminal from '@/components/ui/backgrounds/FaultyTerminal/FaultyTerminal'
import BlurText from '@/components/ui/blur-text/BlurText'
import { useI18n } from '@/shared/contexts/I18nContext'
import { useTheme } from '@/shared/contexts/ThemeContext'
import { createMemo, createSignal, onCleanup, onMount, type Component } from 'solid-js'

import styles from './HomePage.module.css'

const FALLBACK_TINT = '#1876d2'

const readSecondaryColor = () => {
  if (typeof document === 'undefined') return FALLBACK_TINT

  const value = getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim()

  return value || FALLBACK_TINT
}

const HomePage: Component = () => {
  const { t } = useI18n()
  const { theme } = useTheme()

  const isLightTheme = createMemo(() => theme() === 'light')

  const [terminalTint, setTerminalTint] = createSignal(readSecondaryColor())

  onMount(() => {
    setTerminalTint(readSecondaryColor())

    const observer = new MutationObserver(() => {
      setTerminalTint(readSecondaryColor())
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    onCleanup(() => observer.disconnect())
  })

  const SOCIAL_LINKS = [
    {
      word: t('homepage.links-telegram'),
      url: 'https://t.me/montaanaq'
    },
    {
      word: t('homepage.links-email'),
      url: 'mailto:a.presovsky@list.ru'
    }
  ]

  return (
    <>
      <PageMetadata
        title={t('meta.home-title')}
        description={t('meta.home-description')}
        path="/"
      />
      <div class="App">
        <FaultyTerminal
          class={styles.faulty_background}
          scale={2.5}
          gridMul={[2, 1]}
          digitSize={1}
          timeScale={0.5}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint={terminalTint()}
          lightMode={isLightTheme()}
          mouseReact
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={0.3}
        />

        <main class={styles.main}>
          <div class={styles.info_container}>
            <BlurText
              as="h1"
              text={t('homepage.welcome') ?? ''}
              delay={200}
              animateBy="words"
              direction="top"
              class={styles.blurred_text}
            />

            <BlurText
              as="h2"
              text={t('homepage.projects') ?? ''}
              delay={150}
              animateBy="words"
              direction="top"
              linkWord={t('homepage.projects-word')}
              linkTo="/info"
              class={styles.blurred_text}
            />

            <BlurText
              as="h3"
              text={t('homepage.links') ?? ''}
              delay={150}
              animateBy="words"
              direction="bottom"
              links={SOCIAL_LINKS}
              class={styles.blurred_text}
            />
          </div>

          <Footer />
        </main>
      </div>
    </>
  )
}
export default HomePage
