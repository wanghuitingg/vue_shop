<template>
	<div>
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片视图区域 -->
		<el-card>
			<!-- 添加用户 按钮 -->
			<el-row>
				<el-col>
					<el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
				</el-col>
			</el-row>

			<!-- 表单 -->
			<el-table :data="roleList" stripe border="">
				<el-table-column type="expand"></el-table-column>
				<el-table-column type="index" label="#">
				</el-table-column>
				<el-table-column prop="roleName" label="角色名称">
				</el-table-column>
				<el-table-column prop="roleDesc" label="角色描述">
				</el-table-column>
				<el-table-column label="操作">
					<el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
					<el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
					<el-button type="warning" icon="el-icon-share" size="mini">分配权限</el-button>
				</el-table-column>
			</el-table>
		</el-card>

		<!-- “添加用户”对话框 -->
		<el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%">
			<span>
				<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
					<el-form-item label="角色名称" prop="roleName">
						<el-input v-model="addForm.roleName"></el-input>
					</el-form-item>
					<el-form-item label="角色描述" prop="roleDesc">
						<el-input v-model="addForm.roleDesc"></el-input>
					</el-form-item>
				</el-form>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUser">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addDialogVisible: false,
				roleList: [],
				addForm: {
					roleName: '',
					roleDesc: ''
				},
				addFormRules: {
					roleName: [{
							required: true,
							message: '请输入角色名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 10,
							message: '长度在 2 到 5 个字符',
							trigger: 'blur'
						}
					],
					roleDesc: [{
							required: true,
							message: '请输入角色描述',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 15,
							message: '长度在 1 到 15 个字符',
							trigger: 'blur'
						}
					]
				},
			}
		},
		created() {
			this.getRoleList();
		},
		methods: {
			async getRoleList() {
				const {
					data: res
				} = await this.$http.get('roles')
				if (res.meta.status !== 200) return this.$message.error('获取信息失败')
				this.$message.success('获取列表成功')
				this.roleList = res.data;
			},
			async addUser() {
				const {
					data: res
				} = await this.$http.post('roles', this.addForm);
				if (res.meta.status !== 201) return this.$message.error('添加角色失败');
				this.$message.success('添加角色成功');
				this.getRoleList();
				this.addDialogVisible = false;
			},

		}
	}
</script>

<style lang="less" scoped>
</style>
