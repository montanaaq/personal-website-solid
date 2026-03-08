/* @refresh reload */
import { render, Suspense } from 'solid-js/web'
import './index.css'
import { Router } from '@solidjs/router'
import LoadingFallback from './app/router/LoadingFallback'
import { routes } from './app/router/routes'

const root = document.getElementById('root')

const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Router>{routes}</Router>
    </Suspense>
  )
}

render(() => <App />, root as HTMLElement)
