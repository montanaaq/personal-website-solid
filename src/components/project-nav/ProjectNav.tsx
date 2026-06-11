import { type Component, For } from 'solid-js'

import type { TProject } from '@/shared/data/ProjectsList'

import { useI18n } from '@/shared/context/I18nContext'

import styles from './ProjectNav.module.css'

interface ProjectNavProps {
  projects: TProject[]
  activeProject: string
  onProjectAnchorClick: (projectUrl: string) => (event: MouseEvent) => void
}

const ProjectNav: Component<ProjectNavProps> = props => {
  const { t } = useI18n()

  return (
    <nav class={styles.project_nav} aria-label={t('info.content')}>
      <p class={styles.project_nav_title}>{t('info.on-this-page')}</p>
      <ul class={styles.project_nav_list}>
        <For each={props.projects}>
          {(project, index) => (
            <li
              class={styles.project_nav_item}
              style={`--project-index: ${index()}`}
            >
              <a
                href={`#${project.url}`}
                class={styles.project_nav_link}
                classList={{
                  [styles.active]: props.activeProject === project.url
                }}
                aria-current={
                  props.activeProject === project.url ? 'location' : undefined
                }
                onClick={props.onProjectAnchorClick(project.url)}
              >
                {t(project.nameKey)}
              </a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  )
}

export default ProjectNav
