import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/users/Users.vue'
import Welcome from '../components/Welcome.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Echarts from '../components/echart/echarts.vue'
import Order from '../components/order/Order.vue'
import Cate from '../components/goods/cate.vue'
import Params from '../components/goods/params.vue'
import List from '../components/goods/List.vue'
import Add from '../components/goods/add.vue'
import Edit from '../components/goods/Edit.vue'

Vue.use(VueRouter)

const routes = [
	// 重定向操作
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/home',
		component: Home,
		redirect: '/welcome',
		children: [{
				path: '/users',
				component: Users
			},
			{
				path: '/welcome',
				component: Welcome
			},
			{
				path: '/rights',
				component: Rights
			},
			{
				path: '/roles',
				component: Roles
			},
			{
				path: '/reports',
				component: Echarts
			},
			{
				path: '/orders',
				component: Order
			},
			{
				path: '/categories',
				component: Cate
			},
			{
				path: '/params',
				component: Params
			},
			{
				path: '/goods',
				component: List
			},
			{
				path: '/goods/add',
				component: Add
			},
			{
				path: '/goods/edit',
				component: Edit
			},
		]
	},

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
