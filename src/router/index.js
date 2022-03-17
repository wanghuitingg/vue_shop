import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/users/Users.vue'
import Welcome from '../components/Welcome.vue'

Vue.use(VueRouter)

const routes = [
	// 重定向操作
	{path:'/',redirect:'/login'},
	{path:'/login',component:Login},
	{
		path:'/home',
		component:Home,
		redirect:'/welcome',
		children:[
			{path:'/users',component:Users},
			{path:'/welcome',component:Welcome},
		]
		}
]

const router = new VueRouter({
  routes
})

//路由守卫
//一共有三个参数  to 从哪来  from 到哪去  next 放行
router.beforeEach((to, from, next) => {
	//to即将访问的路径  from代表从哪个跳转而来  next是一个函数  代表执行下一步操作
	if (to.path === "/login") return next();
	//获取token
	const token = window.sessionStorage.getItem('token');
	if (!token) return next('/login');
	next();
})
export default router
