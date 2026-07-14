import { Router, type RouteSectionProps } from '@solidjs/router'

import './index.css'
/* @refresh reload */
import { render, Suspense } from 'solid-js/web'

import LoadingFallback from './app/router/LoadingFallback'
import { routes } from './app/router/routes'
import Header from './components/header/Header'
import { I18nProvider } from './shared/contexts/I18nContext'
import { ThemeProvider } from './shared/contexts/ThemeContext'

const root = document.getElementById('root')
const RootLayout = (props: RouteSectionProps) => {
  return (
    <I18nProvider>
      <ThemeProvider>
        <Header />
        {props.children}
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
render(() => <App />, root as HTMLElement)
