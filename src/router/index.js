import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import UserSettings from '@/views/parts/UserSettings'
import UserProfile from '@/views/parts/UserProfile'

// Full pages
import Login from '@/views/pages/Login'
import Page404 from '@/views/pages/Page404'
import Callback from '@/utils/Callback'

// Auth0 check
import { requireAuth } from '../utils/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'home',
      component: Full,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/usersettings',
          name: 'user_settings',
          beforeEnter: requireAuth,
          component: UserSettings

        },
        {
          path: '/userprofile',
          name: 'user_profile',
          beforeEnter: requireAuth,
          component: UserProfile
        }
      ]
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
