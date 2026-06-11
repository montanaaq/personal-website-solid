const ACTIVE_LINE_OFFSET = 24
const SCROLL_TARGET_TOLERANCE = 8

const getScrollPaddingTop = (container: HTMLElement) => {
  const computedStyle = window.getComputedStyle(container)

  return Number.parseFloat(computedStyle.scrollPaddingTop) || 0
}

const hasReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const getProjectHeadings = (projectUrls: string[]) =>
  projectUrls
    .map(projectUrl => document.getElementById(projectUrl))
    .filter((heading): heading is HTMLElement => Boolean(heading))

export const isProjectAlignedToScrollTarget = (
  container: HTMLElement,
  projectUrl: string
) => {
  const target = document.getElementById(projectUrl)

  if (!target) {
    return false
  }

  const targetBlockStart =
    target.getBoundingClientRect().top - container.getBoundingClientRect().top

  return (
    Math.abs(targetBlockStart - getScrollPaddingTop(container)) <=
    SCROLL_TARGET_TOLERANCE
  )
}

export const scrollToProject = (container: HTMLElement, projectUrl: string) => {
  const target = document.getElementById(projectUrl)

  if (!target) {
    return
  }

  const top =
    container.scrollTop +
    target.getBoundingClientRect().top -
    container.getBoundingClientRect().top -
    getScrollPaddingTop(container)

  container.scrollTo({
    top,
    behavior: hasReducedMotion() ? 'auto' : 'smooth'
  })
}

export const getActiveProjectUrl = ({
  container,
  headings,
  projectUrls
}: {
  container: HTMLElement
  headings: HTMLElement[]
  projectUrls: string[]
}) => {
  if (!headings.length) {
    return
  }

  const lastProjectUrl = projectUrls.at(-1)
  const isAtScrollEnd =
    Math.ceil(container.scrollTop + container.clientHeight) >=
    container.scrollHeight - 2

  if (isAtScrollEnd && lastProjectUrl) {
    return lastProjectUrl
  }

  const activationLine =
    container.getBoundingClientRect().top +
    getScrollPaddingTop(container) +
    ACTIVE_LINE_OFFSET
  let currentHeading = headings[0]
  let closestDistance = Number.POSITIVE_INFINITY

  for (const heading of headings) {
    const distance = Math.abs(
      heading.getBoundingClientRect().top - activationLine
    )

    if (distance < closestDistance) {
      closestDistance = distance
      currentHeading = heading
    }
  }

  return currentHeading.id
}

export const createProjectScrollDelay = (delay = 110) => {
  let timer: number | undefined

  const clear = () => {
    if (!timer) {
      return
    }

    window.clearTimeout(timer)
    timer = undefined
  }

  const schedule = (container: HTMLElement, projectUrl: string) => {
    clear()

    timer = window.setTimeout(
      () => scrollToProject(container, projectUrl),
      hasReducedMotion() ? 0 : delay
    )
  }

  return {
    clear,
    schedule
  }
}
