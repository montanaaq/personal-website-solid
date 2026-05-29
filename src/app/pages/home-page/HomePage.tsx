import { type Component, createEffect, createSignal } from 'solid-js'
import { Motion as m } from 'solid-motionone'
import Footer from '@/components/footer/Footer'
import Circles from '@/components/ui/backgrounds/Circles/Circles'
import BlurText from '@/components/ui/blur-text/BlurText'
import { useI18n } from '@/shared/context/I18nContext'
import styles from './HomePage.module.css'

const ViewPage: Component = () => {
  const [showSecondMessage, setShowSecondMessage] = createSignal(false)
  const [showThirdMessage, setShowThirdMessage] = createSignal(false)
  const { t, locale } = useI18n()

  createEffect(() => {
    locale()
    setShowSecondMessage(false)
    setShowThirdMessage(false)
  })

  return (
    <div class="App">
      <Circles>
        <m.div
          class={styles.main}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          role="contentinfo"
        >
          <m.div class={styles.info_container}>
            <BlurText
              text={t('homepage.welcome') ?? ''}
              delay={200}
              animateBy="words"
              direction="top"
              onAnimationComplete={() => setShowSecondMessage(true)}
              class={styles.blurred_text}
            />

            {showSecondMessage() && (
              <BlurText
                text={t('homepage.projects') ?? ''}
                delay={150}
                animateBy="words"
                direction="top"
                linkWord={t('homepage.projects-word')}
                linkTo="/info"
                onAnimationComplete={() => setShowThirdMessage(true)}
                class={styles.blurred_text}
              />
            )}

            {showThirdMessage() && (
              <BlurText
                text={t('homepage.links') ?? ''}
                delay={150}
                animateBy="words"
                direction="bottom"
                links={[
                  {
                    word: t('homepage.links-telegram'),
                    url: 'https://t.me/montaanaq'
                  },
                  {
                    word: t('homepage.links-email'),
                    url: 'mailto:a.presovsky@list.ru'
                  }
                ]}
                class={styles.blurred_text}
              />
            )}
          </m.div>

          <Footer />
        </m.div>
      </Circles>
    </div>
  )
}

export default ViewPage
