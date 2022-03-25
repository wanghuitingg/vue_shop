<!-- 商品分类组件 -->
<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb>
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</a></el-breadcrumb-item>
			<el-breadcrumb-item>商品分类</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片视图区 -->
		<el-card>
			<!-- 添加按钮区域 -->
			<el-row>
				<el-col>
					<el-button type="primary" class="add_btn">添加分类</el-button>
				</el-col>
			</el-row>

			<!-- 列表区域 渲染 -->
			<tree-table :columns="cateColumns" :data="cateList" :expand-type="false" :selection-type="false"
				:show-index="true" :show-row-hover="true" border class="tree-table" element-loading-text="拼命加载中"
				index-text="#">

				<!-- 第一个模板: 是否有效-->
				<template slot="isOk" slot-scope="scope">
					<i v-if="scope.row.cat_deleted === false" class="el-icon-success" style="color: lightgreen"></i>
					<i v-else class="el-icon-error" style="color: red"></i>
				</template>

				<!-- 第二个模板插槽 -->
				<template slot="order" slot-scope="scope">
					<el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
					<el-tag v-else-if="scope.row.cat_level === 1" size="mini" type="success">二级</el-tag>
					<el-tag v-else size="mini" type="warning">三级</el-tag>
				</template>

				<template slot="opt" slot-scope="scope">
					<el-button icon="el-icon-edit" size="mini" type="primary">编辑</el-button>
					<el-button icon="el-icon-delete" size="mini" type="danger"
						@click="removeCateById(scope.row.cat_id)">删除</el-button>
				</template>

			</tree-table>

			<!-- 分页 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				queryInfo: {
					type: 3,
					pagenum: 1,
					pagesize: 5
				},
				cateList: [],
				total: 0,
				// tree-table 列表配置项
				cateColumns: [{
						label: '分类名称',
						prop: 'cat_name'
					},
					{
						label: '是否有效',
						// 表示, 将当前列定义为模板列
						type: 'template',
						// 表示当前列使用模板名称
						template: 'isOk'
					},
					{
						label: '排序',
						// 表示, 将当前列定义为模板列
						type: 'template',
						// 表示当前列使用模板名称
						template: 'order'
					},
					{
						label: '操作',
						// 表示, 将当前列定义为模板列
						type: 'template',
						// 表示当前列使用模板名称
						template: 'opt'
					}
				],

			}
	},
	created() {
			this.getCateList()
		},
		methods: {
			// 页面列表数据
			async getCateList() {
				const {
					data: res
				} = await this.$http.get('categories', {
					params: this.queryInfo
				})
				if (res.meta.status !== 200) return this.$message.error('获取失败')
				this.$message.success('获取成功')
				this.cateList = res.data.result
				this.total = res.data.total
			},
			async removeCateById(cat_id) {
				const {
					data: res
				} = await this.$http.delete(`categories/${cat_id}`)
				if (res.meta.status !== 200) return this.$message.error('删除失败')
				this.$message.success('删除成功')
				this.getCateList()
			},
			handleSizeChange(newsize) {
				this.queryInfo.pagesize = newsize;
				this.getCateList();
			},
			handleCurrentChange(newnum) {
				this.queryInfo.pagenum = newnum;
				this.getCateList();
			},
			
		}
	}
</script>

<style lang="less" scoped>
	.add_btn {
		margin-bottom: 20px;
	}
</style>
