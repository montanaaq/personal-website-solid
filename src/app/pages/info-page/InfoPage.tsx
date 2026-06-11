import { type Component, createMemo, For } from 'solid-js'
import Footer from '@/components/footer/Footer'
import ProjectCard from '@/components/project-card/ProjectCard'
import Circles from '@/components/ui/backgrounds/Circles/Circles'
import { LOCALE_DISPLAY } from '@/shared/constants/i18n.const'
import { useI18n } from '@/shared/context/I18nContext'
import { projectsList } from '@/shared/data/ProjectsList'
import styles from './InfoPage.module.css'

const Info: Component = () => {
  const today = new Date()
  const { t, locale } = useI18n()

  const formattedDate = createMemo(() =>
    new Intl.DateTimeFormat(LOCALE_DISPLAY[locale()], {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(today)
  )
  return (
    <Circles>
      <div>
        <div class={styles.main_post}>
          <div class={styles.header}>
            <h1>
              {t('info.title')} <span>{t('info.title-highlight')}</span>
            </h1>
            <div>
              <span>{formattedDate()}</span>
            </div>
          </div>
          <div class={styles.post_content}>
            <h2>{t('info.content')}</h2>
            <ul>
              <For each={projectsList}>
                {el => (
                  <li>
                    <a href={`#${el.url}`}>{t(el.nameKey)}</a>
                  </li>
                )}
              </For>
            </ul>
            <For each={projectsList}>
              {project => <ProjectCard project={project} />}
            </For>
          </div>
        </div>
        <Footer />
      </div>
    </Circles>
  )
}

export default Info
