<template>
	<div>
		<!-- 头部面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<el-card class="box-card">
			<el-row :gutter="20">
				<el-col :span="8">
					<!-- 搜索框和按钮 -->
					<el-input placeholder="请输入内容">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary">主要按钮</el-button>
				</el-col>
			</el-row>

			<!-- table表格的渲染 -->
			<!-- :data 就是我的数据源 -->
			<el-table :data="userList" border>
				<el-table-column label="#" type="index"> </el-table-column>
				<el-table-column prop="username" label="姓名" width="180"></el-table-column>
				<el-table-column prop="email" label="邮箱" width="180"></el-table-column>
				<el-table-column prop="mobile" label="电话"></el-table-column>
				<el-table-column prop="role_name" label="角色"></el-table-column>
				<el-table-column prop="mg_state" label="状态"></el-table-column>
				<el-table-column label="操作"></el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				queryInfo: {
					query: "",
					pagenum: 1,
					pagesize: 2
				},
				// 定义一个变量 去接收我接口返回回来的数据
				userList: [],
				total: 0
			}

		},
		created() {
			this.getUserList();
		},
		methods: {
			async getUserList() {
				const {
					data: res
				} = await this.$http.get('users', {
					params: this.queryInfo
				});
				console.log(res);
				this.userList = res.data.users;
				this.total = res.data.total;
			}
		},
	}
</script>

<style>
</style>
