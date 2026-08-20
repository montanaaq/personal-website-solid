import type { TProject } from '@/shared/constants/project-list'

import ProjectCard from '@/components/project-card/ProjectCard'
import ProjectNav from '@/components/project-nav/ProjectNav'
import { LOCALE_DISPLAY } from '@/shared/constants/i18n.const'
import { useI18n } from '@/shared/contexts/I18nContext'
import {
  createProjectScrollDelay,
  getActiveProjectUrl,
  getProjectHeadings,
  isProjectAlignedToScrollTarget,
  scrollToProject
} from '@/shared/helpers/project-scroll'
import { type Component, createMemo, createSignal, For, onCleanup, onMount } from 'solid-js'

import styles from './ProjectShowcase.module.css'

interface ProjectShowcaseProps {
  projects: TProject[]
}

const ProjectShowcase: Component<ProjectShowcaseProps> = props => {
  const today = new Date()
  const { t, locale } = useI18n()
  const projectUrls = props.projects.map(project => project.url)
  const firstProjectUrl = projectUrls[0] ?? ''
  const [activeProject, setActiveProject] = createSignal(firstProjectUrl)
  const [pendingProjectUrl, setPendingProjectUrl] = createSignal<string>()
  const scrollDelay = createProjectScrollDelay()
  let scrollContainer: HTMLElement | undefined

  const formattedDate = createMemo(() =>
    new Intl.DateTimeFormat(LOCALE_DISPLAY[locale()], {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(today)
  )

  const updateActiveProject = (container: HTMLElement, headings: HTMLElement[]) => {
    const activeProjectUrl = getActiveProjectUrl({
      container,
      headings,
      projectUrls
    })

    if (!activeProjectUrl) return

    const pendingUrl = pendingProjectUrl()

    if (pendingUrl) {
      if (
        pendingUrl === activeProjectUrl ||
        isProjectAlignedToScrollTarget(container, pendingUrl)
      ) {
        setPendingProjectUrl(undefined)
      } else {
        return
      }
    }

    setActiveProject(activeProjectUrl)
  }

  const handleProjectSelect = (projectUrl: string) => {
    if (!scrollContainer) return

    setPendingProjectUrl(projectUrl)
    setActiveProject(projectUrl)

    if (window.location.hash !== `#${projectUrl}`) {
      window.history.pushState(null, '', `#${projectUrl}`)
    }

    scrollDelay.schedule(scrollContainer, projectUrl)
  }

  onMount(() => {
    if (!scrollContainer) return

    const container = scrollContainer
    const initialProject = window.location.hash.slice(1)
    const projectHeadings = getProjectHeadings(projectUrls)

    if (!projectHeadings.length) return

    let scrollFrame: number | undefined
    let historyFrame: number | undefined

    const updateScrollState = () => {
      scrollFrame = undefined
      document.documentElement.dataset.pageScrolled = String(container.scrollTop > 50)
      updateActiveProject(container, projectHeadings)
    }

    const handleScroll = () => {
      if (scrollFrame !== undefined) return
      scrollFrame = window.requestAnimationFrame(updateScrollState)
    }

    const syncFromLocation = () => {
      historyFrame = undefined
      const projectUrl = window.location.hash.slice(1)

      if (projectUrls.includes(projectUrl)) {
        setPendingProjectUrl(projectUrl)
        setActiveProject(projectUrl)
        scrollToProject(container, projectUrl, { focus: true })
      } else {
        setPendingProjectUrl(undefined)
        setActiveProject(firstProjectUrl)
        container.scrollTo({ top: 0, behavior: 'auto' })
      }

      handleScroll()
    }

    const handleHistoryNavigation = () => {
      if (historyFrame !== undefined) {
        window.cancelAnimationFrame(historyFrame)
      }
      historyFrame = window.requestAnimationFrame(syncFromLocation)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('popstate', handleHistoryNavigation)
    window.addEventListener('hashchange', handleHistoryNavigation)

    if (projectUrls.includes(initialProject)) {
      setActiveProject(initialProject)
      window.requestAnimationFrame(() => {
        scrollToProject(container, initialProject, { focus: true })
        updateActiveProject(container, projectHeadings)
      })
    } else {
      updateScrollState()
    }

    onCleanup(() => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('popstate', handleHistoryNavigation)
      window.removeEventListener('hashchange', handleHistoryNavigation)
      if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame)
      if (historyFrame !== undefined) window.cancelAnimationFrame(historyFrame)
      delete document.documentElement.dataset.pageScrolled
    })
  })

  onCleanup(() => {
    scrollDelay.clear()
  })

  return (
    <main class={styles.main_post} ref={element => (scrollContainer = element)}>
      <div class={styles.header}>
        <h1>
          {t('info.title')} <span>{t('info.title-highlight')}</span>
        </h1>
        <time datetime={today.toISOString().slice(0, 10)}>{formattedDate()}</time>
      </div>
      <div class={styles.post_content}>
        <div class={styles.projects_layout}>
          <ProjectNav
            projects={props.projects}
            activeProject={activeProject()}
            onProjectSelect={handleProjectSelect}
          />
          <div class={styles.projects_list}>
            <For each={props.projects}>
              {(project, index) => <ProjectCard project={project} priority={index() === 0} />}
            </For>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProjectShowcase
