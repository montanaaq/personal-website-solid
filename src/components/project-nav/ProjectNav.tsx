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

  return (
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
      <div class={styles.project_nav_mobile}>
        <label for="mobile-project-navigation">{t('info.on-this-page')}</label>
        <div class={styles.project_nav_select_wrapper}>
          <select
            id="mobile-project-navigation"
            value={props.activeProject}
            onChange={event => props.onProjectSelect(event.currentTarget.value)}
          >
            <For each={props.projects}>
              {project => <option value={project.url}>{t(project.nameKey)}</option>}
            </For>
          </select>
        </div>
      </div>
    </nav>
  )
}

export default ProjectNav
