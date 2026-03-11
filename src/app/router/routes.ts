import type { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('@/pages/home-page/HomePage'))
  },
  {
    path: '/info',
    component: lazy(() => import('@/pages/info-page/InfoPage'))
  },
  {
    path: '*404',
    component: lazy(() => import('@/pages/not-found-page/NotFoundPage'))
  }
]
