import type { Component } from 'solid-js'

import { A, useLocation } from '@solidjs/router'

import styles from './Footer.module.css'

const Footer: Component = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const footerClass = isHomePage ? styles.footer : `${styles.footer} ${styles.fixed}`

  const year = new Date().getFullYear()

  return (
    <footer class={footerClass}>
      <span>
        © {year}&nbsp;
        <A href="/" class={styles.footer_span}>
          Montana
        </A>
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
