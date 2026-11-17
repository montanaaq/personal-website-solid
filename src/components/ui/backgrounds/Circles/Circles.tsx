import type { JSX } from '@solidjs/web'
import type { Component } from 'solid-js'

import styles from './Circles.module.css'

const Circles: Component<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <div class={styles.circles} aria-hidden="true">
        {Array.from({ length: 10 }, () => (
          <span />
        ))}
      </div>
      {children}
    </>
  )
}

export default Circles
