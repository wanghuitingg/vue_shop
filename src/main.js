import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 全局引用css
import './assets/global.css'
// 全局引用图标
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false

// 1.挂载axios
import axios from 'axios'
// 2.设置我的接口地址
axios.defaults.baseURL='http://vueshop.pixiv.download/api/private/v1/'
// 3.把我的axios挂载到Vue原型上
Vue.prototype.$http = axios

//axios 请求预处理  不用特殊的记  能找到地方复制粘贴就行
axios.interceptors.request.use(config=>{
	//像header请求头当中添加参数
	config.headers.Authorization = window.sessionStorage.getItem('token');
	//一定要有返回  才能生效
	return config;
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
