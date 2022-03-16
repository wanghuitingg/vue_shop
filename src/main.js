import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 全局引用css
import './assets/global.css'
// 全局引用图标
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
