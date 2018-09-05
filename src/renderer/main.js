import Vue from 'vue'
import axios from 'axios'
import { ipcRenderer } from 'electron'
import fbConfig from './firebase'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

let app = null

Vue.prototype.$firebase = firebase.initializeApp(fbConfig)
const firestore = firebase.firestore()
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)

// setup watcher for state change and don't initialize before we know we're logged in/logged out...
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      components: { App },
      router,
      store,
      template: '<App/>'
    }).$mount('#app')
  }

  // if logged out, change to login screen
  if (!user) {
    router.replace('/login')
  }
})

// check if next page requires auth, and redirect user to login page if not logged in
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('login') // redirect to login
  } else {
    next() // follow the route
  }
})

// if we get a call for new-timer from the main process
ipcRenderer.on('new-timer', (e, a) => {
  router.replace('/new-timer')
})

ipcRenderer.on('debug', (e, a) => {
  console.log(a)
})
