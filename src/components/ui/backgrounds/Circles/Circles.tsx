import type { FC, ReactElement, ReactNode } from 'react'
import styles from './Circles.module.css'

const Circles: FC<{ children: ReactElement<ReactNode> }> = ({ children }) => {
  return (
    <>
      <ul className={styles.circles}>
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
