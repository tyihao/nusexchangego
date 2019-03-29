import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Universities from './views/Universities.vue'
import Modules from './views/Modules.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/universities',
      name: 'universities',
      component: Universities
    },
    {
      path: '/modules',
      name: 'modules',
      component: Modules
    }
  ]
})
