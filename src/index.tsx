/* @refresh reload */
import './index.css'
import { createRouter, type RouteSectionProps } from '@solidjs/router'
import { render } from '@solidjs/web'
import { Loading } from 'solid-js'

import LoadingFallback from './app/router/LoadingFallback'
import { routes } from './app/router/routes'
import Header from './components/header/Header'
import { I18nProvider } from './shared/contexts/I18nContext'
import { ThemeProvider } from './shared/contexts/ThemeContext'

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

const Router = createRouter({ routes })

const App = () => {
  return (
    <Loading fallback={<LoadingFallback />}>
      <Router>{RootLayout}</Router>
    </Loading>
  )
}
render(() => <App />, document.getElementById('root')!)
