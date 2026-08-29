import type { TProject } from '@/shared/constants/project-list'
import type { Component } from 'solid-js'

import ProjectGallery from '@/components/project-gallery/ProjectGallery'
import { useI18n } from '@/shared/contexts/I18nContext'
import { Motion as m } from 'solid-motionone'

import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: TProject
  priority?: boolean
}

const ProjectCard: Component<ProjectCardProps> = props => {
  const { t } = useI18n()

  return (
    <m.div
      class={styles.container}
      role="article"
      aria-labelledby={props.project.url}
      initial={{ opacity: 0, y: 50 }}
      inView={{ opacity: 1, y: 0 }}
      inViewOptions={{ amount: 0.2, once: true }}
      transition={{ duration: 0.4, easing: 'ease-out' }}
    >
      <h2 id={props.project.url} tabindex="-1">
        {t(props.project.nameKey)} ({t(props.project.dateKey)})
      </h2>
      <p class={styles.description}>{t(props.project.pKey)}</p>
      <p class={styles.status}>
        {t('info.status')}{' '}
        {props.project.isSupport ? (
          <span class={styles.support}>{t('info.supported')}</span>
        ) : (
          <span class={styles.not_support}>{t('info.not-supported')}</span>
        )}
      </p>
      {props.project.link && (
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={props.project.link}
          class={styles.link}
          aria-label={`${t('info.link')}: ${t(props.project.nameKey)}`}
        >
          {t('info.link')}
        </a>
      )}
      {props.project.source_code && (
        <a
          href={props.project.source_code}
          target="_blank"
          rel="noopener noreferrer"
          class={styles.source_code}
          aria-label={`${t('info.source-code')}: ${t(props.project.nameKey)}`}
        >
          {t('info.source-code')}
        </a>
      )}
      <ProjectGallery
        images={props.project.img}
        projectName={t(props.project.nameKey)}
        imageClassName={props.project.imageClassName}
        priority={props.priority}
      />
    </m.div>
  )
}

export default ProjectCard
