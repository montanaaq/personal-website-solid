import Footer from '@/components/footer/Footer'
import ProjectCard from '@/components/project-card/ProjectCard'
import ProjectNav from '@/components/project-nav/ProjectNav'
import Circles from '@/components/ui/backgrounds/Circles/Circles'
import { LOCALE_DISPLAY } from '@/shared/constants/i18n.const'
import { PROJECTS_LIST } from '@/shared/constants/project-list'
import { useI18n } from '@/shared/contexts/I18nContext'
import { setPageMetadata } from '@/shared/helpers/page-metadata'
import {
  createProjectScrollDelay,
  getActiveProjectUrl,
  getProjectHeadings,
  isProjectAlignedToScrollTarget,
  scrollToProject
} from '@/shared/helpers/project-scroll'
import {
  type Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount
} from 'solid-js'

import styles from './InfoPage.module.css'

const projectUrls = PROJECTS_LIST.map(project => project.url)

const Info: Component = () => {
  const today = new Date()
  const { t, locale } = useI18n()
  const [activeProject, setActiveProject] = createSignal(PROJECTS_LIST[0]?.url ?? '')
  const [pendingProjectUrl, setPendingProjectUrl] = createSignal<string>()
  const [scrollContainer, setScrollContainer] = createSignal<HTMLElement>()
  const scrollDelay = createProjectScrollDelay()

  createEffect(() => {
    setPageMetadata({
      title: t('meta.projects-title'),
      description: t('meta.projects-description'),
      path: '/info'
    })
  })

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

    if (!activeProjectUrl) {
      return
    }

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
    const container = scrollContainer()

    if (!container) {
      return
    }

    setPendingProjectUrl(projectUrl)
    setActiveProject(projectUrl)
    if (window.location.hash !== `#${projectUrl}`) {
      window.history.pushState(null, '', `#${projectUrl}`)
    }
    scrollDelay.schedule(container, projectUrl)
  }

  onMount(() => {
    const initialProject = window.location.hash.slice(1)
    const projectHeadings = getProjectHeadings(projectUrls)
    const container = scrollContainer()

    if (!container || !projectHeadings.length) {
      return
    }

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
        setActiveProject(PROJECTS_LIST[0]?.url ?? '')
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
    <Circles>
      <div>
        <main class={styles.main_post} ref={setScrollContainer}>
          <div class={styles.header}>
            <h1>
              {t('info.title')} <span>{t('info.title-highlight')}</span>
            </h1>
            <time datetime={today.toISOString().slice(0, 10)}>{formattedDate()}</time>
          </div>
          <div class={styles.post_content}>
            <div class={styles.projects_layout}>
              <ProjectNav
                projects={PROJECTS_LIST}
                activeProject={activeProject()}
                onProjectSelect={handleProjectSelect}
              />
              <div class={styles.projects_list}>
                <For each={PROJECTS_LIST}>
                  {(project, index) => <ProjectCard project={project} priority={index() === 0} />}
                </For>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Circles>
  )
}

export default Info
