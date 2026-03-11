import type { Component } from 'solid-js'
import { Motion as m } from 'solid-motionone'
import { useI18n } from '@/shared/context/I18nContext'
import type { TProject } from '@/shared/data/ProjectsList'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: TProject
}

const ProjectCard: Component<ProjectCardProps> = props => {
  const { t } = useI18n()

  return (
    <m.div
      class={styles.container}
      initial={{ opacity: 0, y: 50 }}
      inView={{ opacity: 1, y: 0 }}
      inViewOptions={{ amount: 0.2, once: true }}
      transition={{ duration: 0.4, easing: 'ease-out' }}
    >
      <h2 style={{ 'margin-bottom': '10px' }} id={props.project.url}>
        {props.project.main_name} ({t(props.project.dateKey)})
      </h2>
      <p style={{ 'margin-bottom': '10px', color: 'var(--lower-text-color)' }}>
        {t(props.project.pKey)}
      </p>
      <p class={styles.status}>
        {t('info.status')}{' '}
        {props.project.isSupport ? (
          <span class={styles.support}>{t('info.supported')}</span>
        ) : (
          <span class={styles.not_support}>{t('info.not-supported')}</span>
        )}
      </p>
      {props.project.link && (
        <div style={{ 'margin-top': '15px' }}>
          <a
            rel="noreferrer"
            target="_blank"
            href={props.project.link}
            style={{ color: 'var(--text-color)' }}
          >
            {t('info.link')}
          </a>
        </div>
      )}
      {props.project.source_code && (
        <div style={{ 'margin-top': '5px' }}>
          <a
            href={props.project.source_code}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--lower-text-color)' }}
          >
            {t('info.source-code')}
          </a>
        </div>
      )}
      <m.img
        src={props.project.img}
        alt="not downloaded"
        class={
          props.project.imageClassName
            ? styles[props.project.imageClassName]
            : ''
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </m.div>
  )
}

export default ProjectCard
