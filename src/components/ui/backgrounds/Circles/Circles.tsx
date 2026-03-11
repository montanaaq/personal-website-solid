import type { Component, JSX } from 'solid-js'
import styles from './Circles.module.css'

const Circles: Component<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <ul class={styles.circles}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      {children}
    </>
  )
}

export default Circles
