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
          <header style={{ margin: '20px 0px 40px 0px' }}>
            <h1 style={{ 'font-size': '2.375rem', 'font-weight': 600 }}>
              {t('info.title')}{' '}
              <span style={{ color: 'var(--secondary)' }}>
                {t('info.title-highlight')}
              </span>
            </h1>
            <div>
              <span>{formattedDate()}</span>
            </div>
          </header>
          <div class={styles.post_content}>
            <h2 style={{ 'text-align': 'left', 'margin-bottom': '15px' }}>
              {t('info.content')}
            </h2>
            <ul
              style={{
                'text-align': 'left',
                'margin-left': '20px',
                'margin-bottom': '35px'
              }}
            >
              <For each={projectsList}>
                {el => (
                  <li style={{ 'margin-bottom': '15px' }}>
                    <a
                      href={`#${el.url}`}
                      style={{
                        color: 'var(--lower-text-color)',
                        'text-decoration-thickness': '1px'
                      }}
                    >
                      {t(el.nameKey)}
                    </a>
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
