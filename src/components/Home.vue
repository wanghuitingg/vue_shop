<template>
	<el-container class="home-container">
		<el-header>
			<div>
				<img src="../assets/logo.png" alt="">
				<span>电商后台管理系统</span>
			</div>
			<el-button type="info" @click="logout">退出</el-button>
		</el-header>
		<el-container>
			<!-- 左侧下拉 -->
			<el-aside width="200px">
				<el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
					active-text-color="#ffd04b">
					<!-- 这为什么要写key  因为规定这个唯一标识符 -->
					<el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>{{item.authName}}</span>
						</template>
						<el-menu-item :index="subitem.id+''" v-for="subitem in item.children" :key="subitem.id">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>{{subitem.authName}}</span>
							</template>
						</el-menu-item>
					</el-submenu>

				</el-menu>
			</el-aside>
			<el-main>Main</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				// 必须要在这定义变量进行承接
				// 总结规律  凡是能从接口当中读曲回的数据，一般都用数组进行定义和承接
				// 一般能从页面上获取的数据都用 {} 对象来承接，eg:form{}
				menulist: [],
			}
		},
		// 生命周期函数
		created() {
			this.getMenuList();
		},
		methods: {
			logout() {
				//最开始通过token 保存到session当中  进行我是否登录的判断  token是你的唯一凭证
				//就是我把token在session当中进行了删除
				// 然后通过我路由跳转的方式  跳转回了我的login组件
				//清除了浏览器当中所有的session
				window.sessionStorage.clear();
				this.$router.push('/login');
			},
			// 专门向服务器请求左侧菜单栏
			async getMenuList(){
				const {data:res} = await this.$http.get('menus');
				// console.log(res);
				this.menulist = res.data;
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.home-container {
		height: 100%;
	}

	// element特性：标签名即class名
	.el-header {
		background-color: #373d41;
		display: flex;
		justify-content: space-between;
		padding-left: 0;
		align-items: center;
		color: #fff;
		font-size: 20px;

		>div {
			display: flex;
			align-items: center;

			span {
				margin-left: 15px;
			}
		}

		img {
			width: 13%;
		}
	}

	.el-aside {
		background-color: #333744;

		.el-menu {
			border-right: none;
		}
	}
</style>
