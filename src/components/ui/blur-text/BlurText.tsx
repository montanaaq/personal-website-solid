import { useNavigate } from '@solidjs/router'
import { createMemo, mergeProps } from 'solid-js'
import { Motion as m } from 'solid-motionone'

type LinkConfig = {
  word: string | undefined
  url: string
}

type BlurTextProps = {
  text?: string
  delay?: number
  class?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  animationFrom?: Record<string, string | number>
  animationTo?: Array<Record<string, string | number>>
  easing?: (t: number) => number
  onAnimationComplete?: () => void
  stepDuration?: number
  linkWord?: string | null
  linkTo?: string | null
  links?: LinkConfig[]
}

const defaultEasing = (t: number) => t

const EMPTY_LINKS: LinkConfig[] = []

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap(s => Object.keys(s))
  ])

  const keyframes: Record<string, Array<string | number>> = {}
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])]
  })
  return keyframes
}

const BlurText = (rawProps: BlurTextProps) => {
  const props = mergeProps(
    {
      text: '',
      delay: 200,
      class: '',
      animateBy: 'words' as const,
      direction: 'top' as const,
      easing: defaultEasing,
      stepDuration: 0.35,
      linkWord: null as string | null,
      linkTo: null as string | null,
      links: EMPTY_LINKS
    },
    rawProps
  )
  const navigate = useNavigate()

  const elements = () =>
    props.animateBy === 'words' ? props.text.split(' ') : props.text.split('')

  const defaultFrom = () =>
    props.direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, y: -50 }
      : { filter: 'blur(10px)', opacity: 0, y: 50 }

  const defaultTo = () => [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      y: props.direction === 'top' ? 5 : -5
    },
    { filter: 'blur(0px)', opacity: 1, y: 0 }
  ]

  const fromSnapshot = props.animationFrom ?? defaultFrom()
  const toSnapshots = props.animationTo ?? defaultTo()

  const stepCount = toSnapshots.length + 1
  const totalDuration = createMemo(() => props.stepDuration * (stepCount - 1))
  const times = createMemo(() =>
    Array.from({ length: stepCount }, (_, i) =>
      stepCount === 1 ? 0 : i / (stepCount - 1)
    )
  )

  const findLinkForWord = (word: string) => {
    const linkConfig = props.links.find(
      link => link.word?.toLowerCase() === word.toLowerCase()
    )
    if (linkConfig) return linkConfig.url

    if (props.linkWord && word.toLowerCase() === props.linkWord.toLowerCase()) {
      return props.linkTo
    }

    return null
  }

  const handleLinkClick = (url: string) => (e: MouseEvent) => {
    if (
      url.startsWith('mailto:') ||
      url.startsWith('http://') ||
      url.startsWith('https://')
    ) {
      return
    }

    e.preventDefault()
    navigate(url)
  }

  const handleMouseEnter = (e: MouseEvent) => {
    ;(e.currentTarget as HTMLAnchorElement).style.opacity = '0.7'
  }

  const handleMouseLeave = (e: MouseEvent) => {
    ;(e.currentTarget as HTMLAnchorElement).style.opacity = '1'
  }

  const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots)

  const elementsWithIds = createMemo(() =>
    elements().map((segment, idx) => ({
      id: `${segment}-${idx}`,
      segment,
      index: idx
    }))
  )

  return (
    <p class={props.class} style="display: flex; flex-wrap: wrap;">
      {elementsWithIds().map(({ segment, index }) => {
        const linkUrl = findLinkForWord(segment)

        const spanTransition = {
          duration: totalDuration(),
          times: times(),
          delay: (index * props.delay) / 1000,
          ease: props.easing
        }

        const content = segment === ' ' ? '\u00A0' : segment

        return (
          <m.span
            initial={fromSnapshot}
            animate={animateKeyframes}
            transition={spanTransition}
            onMotionComplete={
              index === elements().length - 1
                ? props.onAnimationComplete
                : undefined
            }
            style="display: inline-block;"
          >
            {linkUrl ? (
              <a
                href={linkUrl}
                onClick={handleLinkClick(linkUrl)}
                target={
                  linkUrl.startsWith('http') || linkUrl.startsWith('https')
                    ? '_blank'
                    : undefined
                }
                rel={
                  linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined
                }
                style="color: var(--secondary); cursor: pointer; transition: opacity 0.2s;"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {content}
              </a>
            ) : (
              content
            )}
            {props.animateBy === 'words' &&
              index < elements().length - 1 &&
              '\u00A0'}
          </m.span>
        )
      })}
    </p>
  )
}

export default BlurText
