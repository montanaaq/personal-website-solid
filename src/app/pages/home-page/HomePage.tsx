import Footer from '@/components/footer/Footer'
import Circles from '@/components/ui/backgrounds/Circles/Circles'
import BlurText from '@/components/ui/blur-text/BlurText'
import { useI18n } from '@/shared/contexts/I18nContext'
import { setPageMetadata } from '@/shared/helpers/page-metadata'
import { type Component, createEffect } from 'solid-js'

import styles from './HomePage.module.css'

const HomePage: Component = () => {
  const { t } = useI18n()

  createEffect(() => {
    setPageMetadata({
      title: t('meta.home-title'),
      description: t('meta.home-description'),
      path: '/'
    })
  })

  return (
    <div class="App">
      <Circles>
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
          </div>

          <Footer />
        </main>
      </Circles>
    </div>
  )
}
export default HomePage
