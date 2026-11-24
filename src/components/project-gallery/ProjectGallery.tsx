import type { TProject } from '@/shared/constants/project-list'
import type { Component } from 'solid-js'

import { useI18n } from '@/shared/contexts/I18nContext'
import { Link } from '@solidjs/meta'
import { createSignal, For, Show } from 'solid-js'

import styles from './ProjectGallery.module.css'

interface ProjectGalleryProps {
  images: NonNullable<TProject['img']>
  projectName: string
  imageClassName?: string
  priority?: boolean
  preloadImages?: boolean
}

const ProjectGallery: Component<ProjectGalleryProps> = props => {
  const { t } = useI18n()
  const [activeImageIndex, setActiveImageIndex] = createSignal(0)
  const [previewOpen, setPreviewOpen] = createSignal(false)
  const activeImage = () => props.images[activeImageIndex()] ?? props.images[0]
  const imageDescription = () =>
    `${props.projectName} — ${t('info.project-screenshot')} ${activeImageIndex() + 1}`
  let previewDialog: HTMLDialogElement | undefined

  const openPreview = () => {
    if (!previewDialog) return
    setPreviewOpen(true)
    previewDialog.showModal()
  }

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
      <Show when={props.preloadImages}>
        <For each={props.images.slice(1)}>
          {image => <Link rel="preload" as="image" href={image.src} fetchpriority="low" />}
        </For>
      </Show>
      <div class={styles.gallery_frame}>
        <button
          type="button"
          class={styles.preview_trigger}
          aria-label={`${t('info.open-screenshot')}: ${imageDescription()}`}
          aria-haspopup="dialog"
          onClick={openPreview}
        >
          <img
            src={activeImage().src}
            alt={imageDescription()}
            width={activeImage().width}
            height={activeImage().height}
            loading={props.priority || props.preloadImages ? 'eager' : 'lazy'}
            fetchpriority={props.priority && activeImageIndex() === 0 ? 'high' : undefined}
            decoding="async"
            class={`${styles.project_image} ${
              props.imageClassName ? styles[props.imageClassName] : ''
            }`}
          />
        </button>
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
      <dialog
        ref={element => (previewDialog = element)}
        class={styles.preview_dialog}
        aria-label={imageDescription()}
        closedby="any"
        onClose={event => setPreviewOpen(event.currentTarget.open)}
        onClick={event => {
          const dialog = event.currentTarget
          if ('closedBy' in HTMLDialogElement.prototype || event.target !== dialog) return

          const bounds = dialog.getBoundingClientRect()
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          ) {
            dialog.close()
          }
        }}
      >
        <Show when={previewOpen()}>
          <img
            class={styles.preview_image}
            src={activeImage().src}
            alt={imageDescription()}
            width={activeImage().width}
            height={activeImage().height}
          />
        </Show>
        <form method="dialog" class={styles.preview_close}>
          <button class={styles.gallery_button} aria-label={t('info.close-screenshot')} autofocus>
            ×
          </button>
        </form>
      </dialog>
    </div>
  )
}

export default ProjectGallery
