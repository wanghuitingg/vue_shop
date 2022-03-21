<template>
	<div>
		<!-- // 头顶面包屑 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
			<el-breadcrumb-item>权限列表</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 表单  stripe：隔行变色 -->
		<el-card>
			<el-table :data="rightList" stripe style="width: 100%">
				<el-table-column type="index" label="#" width="180">
				</el-table-column>
				<el-table-column prop="authName" label="权限说明" width="180">
				</el-table-column>
				<el-table-column prop="path" label="路径" width="180">
				</el-table-column>
				<el-table-column label="权限等级">
					<template slot-scope="scope">
						<el-tag type="danger" v-if="scope.row.level === '0'">等级一</el-tag>
						<el-tag type="warning" v-if="scope.row.level === '1'">等级二</el-tag>
						<el-tag type="success" v-if="scope.row.level === '2'">等级三</el-tag>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>

</template>

<script>
	// 第一步绘制页面
	// 写axios 像接口拿数据
	// 绑定到我的data层
	// table绑定数据源 并且执行渲染
	// 通过v-if 进行的判断 使用的依旧是模板插槽
	export default {
		data() {
			return {
				rightList: []
			}
		},
		created() {
			this.getRightList();
		},
		methods: {
			async getRightList() {
				const {
					data: res
				} = await this.$http.get('rights/list')
				if (res.meta.status !== 200) return this.$message.error('获取列表失败')
				this.$message.success('获取列表成功')
				console.log(res)
				this.rightList = res.data
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
