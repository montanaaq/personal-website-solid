import type { RouteDefinition } from '@solidjs/router'

import { lazy } from 'solid-js'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('@/app/pages/home-page/HomePage'))
  },
  {
    path: '/info',
    component: lazy(() => import('@/app/pages/info-page/InfoPage'))
  },
  {
    path: '*404',
    component: lazy(() => import('@/app/pages/not-found-page/NotFoundPage'))
  }
]
