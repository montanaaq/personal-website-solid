import type { TProject } from '@/shared/constants/project-list'
import type { Component } from 'solid-js'

import ProjectGallery from '@/components/project-gallery/ProjectGallery'
import { useI18n } from '@/shared/contexts/I18nContext'
import { animate, inView } from '@motionone/dom'
import { onSettled } from 'solid-js'

import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: TProject
  priority?: boolean
  preloadImages?: boolean
}

const ProjectCard: Component<ProjectCardProps> = props => {
  const { t } = useI18n()

  let container: HTMLDivElement | undefined
  onSettled(() => {
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = container
    let animation: ReturnType<typeof animate> | undefined
    const stop = inView(
      element,
      () => {
        animation = animate(
          element,
          { opacity: [0, 1], y: [50, 0] },
          {
            duration: 0.4,
            easing: 'ease-out'
          }
        )
      },
      { amount: 0.2 }
    )
    return () => {
      stop()
      animation?.cancel()
    }
  })

  return (
    <div
      class={styles.container}
      role="article"
      aria-labelledby={props.project.url}
      ref={element => (container = element)}
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
      {props.project.img && (
        <ProjectGallery
          images={props.project.img}
          projectName={t(props.project.nameKey)}
          imageClassName={props.project.imageClassName}
          priority={props.priority}
          preloadImages={props.preloadImages}
        />
      )}
    </div>
  )
}

export default ProjectCard
