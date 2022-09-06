import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 2.2引入flexible
import 'amfe-flexible'
// 引入css
import '@/assets/fonts/iconfont.css'

// 1.2引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
