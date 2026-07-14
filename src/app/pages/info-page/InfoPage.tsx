import Footer from '@/components/footer/Footer'
import ProjectCard from '@/components/project-card/ProjectCard'
import ProjectNav from '@/components/project-nav/ProjectNav'
import Circles from '@/components/ui/backgrounds/Circles/Circles'
import { LOCALE_DISPLAY } from '@/shared/constants/i18n.const'
import { PROJECTS_LIST } from '@/shared/constants/project-list'
import { useI18n } from '@/shared/contexts/I18nContext'
import {
  createProjectScrollDelay,
  getActiveProjectUrl,
  getProjectHeadings,
  isProjectAlignedToScrollTarget,
  scrollToProject
} from '@/shared/helpers/project-scroll'
import { type Component, createMemo, createSignal, For, onCleanup, onMount } from 'solid-js'

import styles from './InfoPage.module.css'

const projectUrls = PROJECTS_LIST.map(project => project.url)

const Info: Component = () => {
  const today = new Date()
  const { t, locale } = useI18n()
  const [activeProject, setActiveProject] = createSignal(PROJECTS_LIST[0]?.url ?? '')
  const [pendingProjectUrl, setPendingProjectUrl] = createSignal<string>()
  const [scrollContainer, setScrollContainer] = createSignal<HTMLDivElement>()
  const scrollDelay = createProjectScrollDelay()

  const formattedDate = createMemo(() =>
    new Intl.DateTimeFormat(LOCALE_DISPLAY[locale()], {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(today)
  )

  const updateActiveProject = (container: HTMLDivElement, headings: HTMLElement[]) => {
    const activeProjectUrl = getActiveProjectUrl({
      container,
      headings,
      projectUrls
    })

    if (!activeProjectUrl) {
      return
    }

    const pendingUrl = pendingProjectUrl()

    if (pendingUrl) {
      if (isProjectAlignedToScrollTarget(container, pendingUrl)) {
        setPendingProjectUrl(undefined)
      } else {
        return
      }
    }

    setActiveProject(activeProjectUrl)
  }

  const handleProjectAnchorClick = (projectUrl: string) => (event: MouseEvent) => {
    event.preventDefault()
    const container = scrollContainer()

    if (!container) {
      return
    }

    setPendingProjectUrl(projectUrl)
    setActiveProject(projectUrl)
    window.history.pushState(null, '', `#${projectUrl}`)
    scrollDelay.schedule(container, projectUrl)
  }

  onMount(() => {
    const initialProject = window.location.hash.slice(1)
    const projectHeadings = getProjectHeadings(projectUrls)
    const container = scrollContainer()

    if (!container || !projectHeadings.length) {
      return
    }

    const handleScroll = () => updateActiveProject(container, projectHeadings)

    container.addEventListener('scroll', handleScroll, { passive: true })

    if (projectUrls.includes(initialProject)) {
      setActiveProject(initialProject)
      window.requestAnimationFrame(() => {
        scrollToProject(container, initialProject)
        updateActiveProject(container, projectHeadings)
      })
    } else {
      updateActiveProject(container, projectHeadings)
    }

    onCleanup(() => {
      container.removeEventListener('scroll', handleScroll)
    })
  })

  onCleanup(() => {
    scrollDelay.clear()
  })

  return (
    <Circles>
      <div>
        <div class={styles.main_post} ref={setScrollContainer}>
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
            <div class={styles.projects_layout}>
              <ProjectNav
                projects={PROJECTS_LIST}
                activeProject={activeProject()}
                onProjectAnchorClick={handleProjectAnchorClick}
              />
              <div class={styles.projects_list}>
                <For each={PROJECTS_LIST}>{project => <ProjectCard project={project} />}</For>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Circles>
  )
}

export default Info
