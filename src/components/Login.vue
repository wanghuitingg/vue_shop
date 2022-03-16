<template>
	<div class="login-container" id="app">
		<!-- 内部文本框盒子 -->
		<div class="login-box">
			<!-- 头像框 -->
			<div class="avatar_box">
				<img src="../assets/logo.png" alt="">
			</div>
			<!-- 用户密码及按钮 -->
			<el-form label-width="0px" class="login-form" :model="LoginForm">
				<el-form-item>
					<el-input v-model="LoginForm.username" prefix-icon="iconfont icon-user"></el-input>
				</el-form-item>
			 <el-form-item>
					<el-input type="password" v-model="LoginForm.password" prefix-icon="iconfont icon-3702mima
"></el-input>
				</el-form-item>
				<!-- 按钮 -->
				<el-form-item class="btns">
					<el-button type="primary">登录</el-button>
			  <el-button type="info">重置</el-button>
				</el-form-item>

			</el-form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				LoginForm:{
					username:"admin",
					password:"123456"
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.login-container {
		background-color: #2b4b6b;
		height: 100%;
	}

	.login-box {
		background-color: #fff;
		width: 450px;
		height: 300px;
		border-radius: 3px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.avatar_box {
		width: 130px;
		height: 130px;
		border: 1px solid #eee;
		border-radius: 50%;
		padding: 10px;
		box-shadow: 0 0 10px #eee;
		// 定位解决
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;

		img {
			width: 130px;
			height: 130px;
			border-radius: 50%;
			background-color: #eee;
		}
	}

	.login-form {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
	}
	.btns{
		display: flex;
		justify-content: flex-end;
	}
</style>
