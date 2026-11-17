import type { Component } from 'solid-js'

import { useLocation } from '@solidjs/router'

import styles from './Footer.module.css'

const Footer: Component = () => {
  const location = useLocation()
  const footerClass = () =>
    location.pathname === '/' ? styles.footer : `${styles.footer} ${styles.fixed}`

  const year = new Date().getFullYear()

  return (
    <footer class={footerClass()}>
      <span>
        © {year}&nbsp;
        <a href="/" class={styles.footer_span}>
          Montana
        </a>
        &nbsp;Powered by&nbsp;
        <a
          href="https://www.solidjs.com/"
          target="_blank"
          rel="noreferrer"
          class={styles.footer_span}
        >
          Solid
        </a>
      </span>
    </footer>
  )
}

export default Footer
