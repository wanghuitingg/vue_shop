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
					<el-input placeholder="请输入内容" v-model="queryInfo.query">
						<el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
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
				<el-table-column prop="mg_state" label="状态">
					<!-- 模版插槽 -->
					<template slot-scope="scope">
						<!-- 模板插槽的意义 就是把当前这一条数据  传递过来 -->
						<!-- v-model 双向数据绑定 true和false的地方 -->
						<!-- 什么事件 ()是什么内容  是咱们模板插槽里面的当前那条数据 -->
						<!-- @change 是switch状态发生变化时的回调函数 -->
						<el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- 修改 -->
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">
						</el-button>
						<!-- 删除 -->
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="UserDelete(scope.row.id)">
						</el-button>
						<!-- 分配权限 -->
						<!-- 页面描述 -->
						<el-tooltip class="item" effect="dark" content="分配权限" placement="top">
							<el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<!-- @size-change是点击改变每页条数的事件， @current-change是点击改变当前页的事件-->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum" :page-sizes="[3,5,8,10]" :page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-card>

		<!-- 思路总结
				1、当遇到form表单的时候
				:model=addForm
				form表单当中的  prop		
				-->

		<!-- 添加对话框板块  addDialogVisible 就两个选项 true和false  true代表显示 false代表隐藏 -->
		<el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%">
			<span>
				<!-- form表单 -->
				<el-form :model="addForm" :rules="addFormRules" label-width="80px">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="addForm.username"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="addForm.password"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="password">
						<el-input v-model="addForm.email"></el-input>
					</el-form-item>
					<el-form-item label="手机号码" prop="mobile">
						<el-input v-model="addForm.mobile"></el-input>
					</el-form-item>
				</el-form>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUser">确 定</el-button>
			</span>
		</el-dialog>

		<!-- “修改”对话框板块 -->
		<el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="30%">
			<span>
				<el-form :model="editForm" :rules="editFormRules" label-width="80px">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="editForm.username" disabled></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="editForm.email"></el-input>
					</el-form-item>
					<el-form-item label="手机号码" prop="mobile">
						<el-input v-model="editForm.mobile"></el-input>
					</el-form-item>
				</el-form>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="EditUserInfo">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				queryInfo: {
					// 查询参数
					query: "",
					// 当前页码
					pagenum: 1,
					// 每页条数
					pagesize: 2
				},
				// 定义一个变量 去接收我接口返回回来的数据
				userList: [],
				total: 0,
				// 添加板块
				addDialogVisible: false,
				addForm: {
					username: '',
					password: '',
					email: '',
					mobile: ''
				},
				addFormRules: {
					username: [{
							required: true,
							message: '请输入登录名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 15,
							message: '长度在 6 到 15 个字符',
							trigger: 'blur'
						}
					],
					email: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						message: '请输入手机',
						trigger: 'blur'
					}]
				},

				// 编辑板块
				editDialogVisible: false,
				editForm: {
					username: '',
					email: '',
					mobile: ''
				},
				//定义修改的验证规则
				editFormRules: {
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 15,
							message: '长度在 6 到 15 个字符',
							trigger: 'blur'
						}
					],
					email: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						message: '请输入手机',
						trigger: 'blur'
					}]
				},
			}
		},
		created() {
			this.getUserList();
		},
		methods: {
			// 我在写表格数据的时候  优先去先取数据 然后再渲染
			async getUserList() {
				const {
					data: res
				} = await this.$http.get('users', {
					params: this.queryInfo
				});
				// console.log(res);
				this.userList = res.data.users;
				// total 这个变量  记录我当前这个接口里共有多少条数据
				this.total = res.data.total;
			},
			// 改变用户状态的代码块
			async userStateChanged(row) {
				// 当我需要  再地址当中拼接参数的时候  我需要  ${}
				// 我在这埋坑了 这是新手都会犯错的地方 问题再单引号
				// 重点  一般新手都犯错 不是单引号  是反引号  才能解析变量
				// console.log(row)
				const {
					data: res
				} = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
				// console.log(res)
				if (res.meta.status !== 200) return this.$message.error('状态设置失败')
				this.$message.success('状态设置成功')
			},
			handleSizeChange(newSize) {
				// console.log(newSize)
				this.queryInfo.pagesize = newSize;
				this.getUserList();
			},
			handleCurrentChange(newPage) {
				// console.log(newPage)
				this.queryInfo.pagenum = newPage;
				this.getUserList();
			},
			// 添加用户
			async addUser() {
				const {
					data: res
				} = await this.$http.post('users', this.addForm);
				// console.log(res)
				if (res.meta.status !== 201) return this.$message.error('用户创建失败')
				this.$message.success('用户创建成功')
				this.addDialogVisible = false;
				this.getUserList();
				//添加后把addfrom 进行清空
				this.addForm.username = '';
				this.addForm.password = '';
				this.addForm.email = '';
				this.addForm.mobile = '';
			},
			// 删除用户
			async UserDelete(id) {
				const {
					data: res
				} = await this.$http.delete(`users/${id}`)
				// console.log(res)
				if (res.meta.status !== 200) return this.$message.error('删除失败')
				this.$message.success('删除成功')
				this.getUserList();
			},
			// 编辑用户
			async showEditDialog(id) {
				const {
					data: res
				} = await this.$http.get(`users/${id}`)
				// console.log(res)
				this.editForm = res.data;
				this.editDialogVisible = true;
			},
			async EditUserInfo(){
				const {data:res} = await this.$http.put(`users/${this.editForm.id}`,{email:this.editForm.email,mobile:this.editForm.mobile})
				// console.log(res)
				if(res.meta.status!==200) return this.$message.error("编辑失败")
				this.$message.success("编辑成功")
				this.editDialogVisible=false;
				this.getUserList()
			}
		},
	}
</script>

<style>
</style>
