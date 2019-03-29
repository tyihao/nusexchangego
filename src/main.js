import Vue from 'vue'
import './plugins/vuetify'
import './plugins/base'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMaterial from 'vue-material'
import VueScrollTo from 'vue-scrollto'
import './firebase'
import ApexCharts from 'apexcharts'
import VueFire from 'vuefire'
import VueApexCharts from 'vue-apexcharts'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, {adapter: Chart})
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueFire)
Vue.use(VueScrollTo)
Vue.use(BootstrapVue)
Vue.use(VueMaterial)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
