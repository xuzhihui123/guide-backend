import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'assets/css/common.css'
import 'animate.css'

import moment from 'moment'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局时间过滤器
Vue.filter('dateFormat', function (str, date = 'YYYY-MM-DD HH:mm:ss') {
  const d = parseInt(str)
  return moment(d).format(date)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
