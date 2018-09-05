import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/Pages/LandingPage').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-timer',
      name: 'new-timer',
      component: require('@/Pages/NewTimer').default,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login-page',
      component: require('@/Pages/LoginPage').default
    },
    {
      path: '/register',
      name: 'register-page',
      component: require('@/Pages/RegisterPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
