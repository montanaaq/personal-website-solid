import { motion as m, LazyMotion, domAnimation } from 'motion/react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'

type LinkConfig = {
  word: string
  url: string
}

type BlurTextProps = {
  text?: string
  delay?: number
  className?: string
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

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  animationFrom,
  animationTo,
  easing = defaultEasing,
  onAnimationComplete,
  stepDuration = 0.35,
  linkWord = null,
  linkTo = null,
  links = EMPTY_LINKS
}) => {
  const navigate = useNavigate()

  const elements = useMemo(
    () => (animateBy === 'words' ? text.split(' ') : text.split('')),
    [text, animateBy]
  )

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  )

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  const { totalDuration, times } = useMemo(() => {
    const stepCount = toSnapshots.length + 1
    const duration = stepDuration * (stepCount - 1)
    const timeArray = Array.from({ length: stepCount }, (_, i) =>
      stepCount === 1 ? 0 : i / (stepCount - 1)
    )
    return { totalDuration: duration, times: timeArray }
  }, [toSnapshots.length, stepDuration])

  const findLinkForWord = (word: string) => {
    const linkConfig = links.find(
      link => link.word.toLowerCase() === word.toLowerCase()
    )
    if (linkConfig) return linkConfig.url

    if (linkWord && word.toLowerCase() === linkWord.toLowerCase()) {
      return linkTo
    }

    return null
  }

  const handleLinkClick = (url: string) => (e: React.MouseEvent) => {
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

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.opacity = '0.7'
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.opacity = '1'
  }

  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, toSnapshots),
    [fromSnapshot, toSnapshots]
  )

  const elementsWithIds = useMemo(
    () =>
      elements.map((segment, idx) => ({
        id: `${segment}-${idx}`,
        segment,
        index: idx
      })),
    [elements]
  )

  return (
    <LazyMotion features={domAnimation}>
    <p className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elementsWithIds.map(({ id, segment, index }) => {
        const linkUrl = findLinkForWord(segment)

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        }

        const content = segment === ' ' ? '\u00A0' : segment

        return (
          <m.span
            key={id}
            initial={fromSnapshot}
            animate={animateKeyframes}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
            style={{ display: 'inline-block' }}
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
                style={{
                  color: 'var(--secondary)',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {content}
              </a>
            ) : (
              content
            )}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </m.span>
        )
      })}
    </p>
    </LazyMotion>
  )
}

export default BlurText
