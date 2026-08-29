import type { TProject } from '@/shared/constants/project-list'
import type { Component } from 'solid-js'

import { useI18n } from '@/shared/contexts/I18nContext'
import { createSignal, Show } from 'solid-js'

import styles from './ProjectGallery.module.css'

interface ProjectGalleryProps {
  images: TProject['img']
  projectName: string
  imageClassName?: string
  priority?: boolean
}

const ProjectGallery: Component<ProjectGalleryProps> = props => {
  const { t } = useI18n()
  const [activeImageIndex, setActiveImageIndex] = createSignal(0)
  const activeImage = () => props.images[activeImageIndex()] ?? props.images[0]

  const showPreviousImage = () => {
    setActiveImageIndex(current => (current - 1 + props.images.length) % props.images.length)
  }

  const showNextImage = () => {
    setActiveImageIndex(current => (current + 1) % props.images.length)
  }

  return (
    <div
      class={styles.project_gallery}
      role="group"
      aria-label={t('info.project-gallery', { project: props.projectName })}
    >
      <div class={styles.gallery_frame}>
        <img
          src={activeImage().src}
          alt={`${props.projectName} — ${t('info.project-screenshot')} ${activeImageIndex() + 1}`}
          width={activeImage().width}
          height={activeImage().height}
          loading={props.priority ? 'eager' : 'lazy'}
          fetchpriority={props.priority ? 'high' : undefined}
          decoding="async"
          class={`${styles.project_image} ${
            props.imageClassName ? styles[props.imageClassName] : ''
          }`}
        />
        <Show when={props.images.length > 1}>
          <div class={styles.gallery_controls}>
            <button
              type="button"
              class={styles.gallery_button}
              aria-label={t('info.previous-screenshot')}
              onClick={showPreviousImage}
            >
              ←
            </button>
            <span
              class={styles.gallery_position}
              aria-label={t('info.screenshot-position', {
                current: activeImageIndex() + 1,
                total: props.images.length
              })}
              aria-live="polite"
            >
              {activeImageIndex() + 1} / {props.images.length}
            </span>
            <button
              type="button"
              class={styles.gallery_button}
              aria-label={t('info.next-screenshot')}
              onClick={showNextImage}
            >
              →
            </button>
          </div>
        </Show>
      </div>
    </div>
  )
}

export default ProjectGallery
