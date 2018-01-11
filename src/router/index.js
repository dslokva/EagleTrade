import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import UserSettings from '@/views/UserSettings'
import UserProfile from '@/views/UserProfile'

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
      name: 'Home',
      component: Full,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/usersettings',
          name: 'User Settings',
          beforeEnter: requireAuth,
          component: UserSettings

        },
        {
          path: '/userprofile',
          name: 'User Profile',
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
          name: 'Login',
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
