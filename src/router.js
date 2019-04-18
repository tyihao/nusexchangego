import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Universities from './views/Universities.vue'
import Login from './views/Login.vue'
import Modules from './views/Modules.vue'
import testinfo from './components/modules/moduleinfo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/testinfo',
      name: 'testinfo',
      component: testinfo
    },
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
