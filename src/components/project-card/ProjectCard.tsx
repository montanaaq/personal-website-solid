import { domAnimation, LazyMotion, m } from 'motion/react'
import type { FC } from 'react'
import type { TProject } from '@/shared/data/Projects/ProjectsListLocalized'
import { useLanguage } from '@/shared/hooks/useLanguage'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: TProject
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { t } = useLanguage()

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={styles.container}
        key={project.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <h2 style={{ marginBottom: '10px' }} id={project.url}>
          {project.main_name} ({project.date})
        </h2>
        <p
          style={{
            marginBottom: '10px',
            color: 'var(--lower-text-color)'
          }}
        >
          {project.p}
        </p>
        <p className={styles.status}>
          {t.info.status}{' '}
          {project.isSupport ? (
            <span className={styles.support}>{t.info.supported}</span>
          ) : (
            <span className={styles.not_support}>{t.info.notSupported}</span>
          )}
        </p>
        {project.link && (
          <div style={{ marginTop: '15px' }}>
            <a
              rel="noreferrer"
              target="_blank"
              href={project.link}
              style={{
                color: 'var(--text-color)'
              }}
            >
              {t.info.link}
            </a>
          </div>
        )}
        {project.source_code && (
          <div style={{ marginTop: '5px' }}>
            <a
              href={project.source_code}
              target="_blank"
              rel="noreferrer"
              style={{
                color: 'var(--lower-text-color)'
              }}
            >
              {t.info.sourceCode}
            </a>
          </div>
        )}
        <m.img
          src={project.img}
          alt="not downloaded"
          className={
            project.imageClassName ? styles[project.imageClassName] : ''
          }
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
      </m.div>
    </LazyMotion>
  )
}

export default ProjectCard
