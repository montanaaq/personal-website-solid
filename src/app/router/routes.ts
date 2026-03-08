import { lazy } from 'solid-js'

export const routes = [
  {
    path: '/',
    component: lazy(() => import('@/app/screens/home-page/HomePage'))
  },
  {
    path: '/info',
    component: lazy(() => import('@/app/screens/info-page/InfoPage'))
  },
  {
    path: '*404',
    component: lazy(() => import('@/app/screens/not-found-page/NotFoundPage'))
  }
]
