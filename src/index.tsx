/* @refresh reload */
import type { JSX } from 'solid-js'

import './index.css'
import { Router, type RouteSectionProps } from '@solidjs/router'
import { render, Suspense } from 'solid-js/web'
import { Toaster } from 'solid-sonner'

import LoadingFallback from './app/router/LoadingFallback'
import { routes } from './app/router/routes'
import Header from './components/header/Header'
import { I18nProvider } from './shared/contexts/I18nContext'
import { ThemeProvider, useTheme } from './shared/contexts/ThemeContext'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element #root was not found')
}

const ThemedLayout = (props: { children: JSX.Element }) => {
  const { theme } = useTheme()

  return (
    <>
      <Header />
      <Toaster position="top-right" theme={theme()} duration={2500} />
      {props.children}
    </>
  )
}

const RootLayout = (props: RouteSectionProps) => {
  return (
    <I18nProvider>
      <ThemeProvider>
        <ThemedLayout>{props.children}</ThemedLayout>
      </ThemeProvider>
    </I18nProvider>
  )
}

const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Router root={RootLayout}>{routes}</Router>
    </Suspense>
  )
}
render(() => <App />, root)
