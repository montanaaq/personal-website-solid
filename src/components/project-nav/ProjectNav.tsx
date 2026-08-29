import type { TProject } from '@/shared/constants/project-list'

import { useI18n } from '@/shared/contexts/I18nContext'
import { type Component, For } from 'solid-js'

import styles from './ProjectNav.module.css'

interface ProjectNavProps {
  projects: TProject[]
  activeProject: string
  onProjectSelect: (projectUrl: string) => void
}

const ProjectNav: Component<ProjectNavProps> = props => {
  const { t } = useI18n()
  let projectDialog: HTMLDialogElement | undefined

  const selectProject = (projectUrl: string) => {
    projectDialog?.close()
    props.onProjectSelect(projectUrl)
  }

  return (
    <>
      <nav class={styles.project_nav} aria-label={t('info.content')}>
        <p class={styles.project_nav_title}>{t('info.on-this-page')}</p>
        <ul class={styles.project_nav_list}>
          <For each={props.projects}>
            {(project, index) => (
              <li class={styles.project_nav_item} style={`--project-index: ${index()}`}>
                <a
                  href={`#${project.url}`}
                  class={styles.project_nav_link}
                  classList={{
                    [styles.active]: props.activeProject === project.url
                  }}
                  aria-current={props.activeProject === project.url ? 'location' : undefined}
                  onClick={event => {
                    event.preventDefault()
                    props.onProjectSelect(project.url)
                  }}
                >
                  {t(project.nameKey)}
                </a>
              </li>
            )}
          </For>
        </ul>
      </nav>
      <dialog
        id="project-navigation-dialog"
        class={styles.project_dialog}
        aria-labelledby="project-navigation-dialog-title"
        ref={element => (projectDialog = element)}
        onClick={event => {
          if (event.target === event.currentTarget) projectDialog?.close()
        }}
      >
        <div class={styles.project_dialog_header}>
          <h2 id="project-navigation-dialog-title">{t('info.projects-menu-title')}</h2>
          <button
            type="button"
            class={styles.project_dialog_close}
            aria-label={t('info.close-project-menu')}
            onClick={() => projectDialog?.close()}
          >
            ×
          </button>
        </div>
        <nav aria-label={t('info.content')}>
          <ul class={styles.project_dialog_list}>
            <For each={props.projects}>
              {project => (
                <li>
                  <a
                    href={`#${project.url}`}
                    class={styles.project_dialog_link}
                    classList={{
                      [styles.active]: props.activeProject === project.url
                    }}
                    aria-current={props.activeProject === project.url ? 'location' : undefined}
                    onClick={event => {
                      event.preventDefault()
                      selectProject(project.url)
                    }}
                  >
                    {t(project.nameKey)}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </dialog>
    </>
  )
}

export default ProjectNav
