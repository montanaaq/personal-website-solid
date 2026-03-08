import { useLocation } from '@solidjs/router'
import type { Component } from 'solid-js'
import styles from './Footer.module.css'

const Footer: Component = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const footerClass = isHomePage
    ? styles.footer
    : `${styles.footer} ${styles.fixed}`

  const year = new Date().getFullYear()

  return (
    <footer class={footerClass}>
      <span style={{ opacity: '.6' }}>
        © {year}
        <a href="https://montaanaq.netlify.app" class={styles.footer_span}>
          Montana
        </a>
        &nbsp;Powered by
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
