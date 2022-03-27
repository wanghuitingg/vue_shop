<!-- 商品列表组件 -->
<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品列表</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片视图区 -->
		<el-card>
			<el-row :gutter="20">
				<el-col :span="10">
					<el-input v-model="queryInfo.query"  @clear="getGoodsList" @keyup.enter.native="getGoodsList" class="input-with-select" clearable placeholder="请输入内容">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary">添加商品</el-button>
				</el-col>
			</el-row>

			<!-- table表单 -->
			<el-table :data="goodsList" stripe :stripe="true" border element-loading-text="拼命加载中" width="100%">
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="goods_name" label="商品名称">
				</el-table-column>
				<el-table-column prop="goods_price" label="商品价格(元)" width="95px">
				</el-table-column>
				<el-table-column prop="goods_number" label="数量" width="70px">
				</el-table-column>
				<el-table-column prop="add_time" label="创建时间" width="140px">
				</el-table-column>
				<el-table-column prop="goods_state" label="状态" width="95px">
				</el-table-column>
				<el-table-column label="操作" width="130px">
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				queryInfo:{
					query:'',
					pagenum:1,
					pagesize:5
				},
				goodsList:[],
				total:0
			}
		},
		created() {
			this.getGoodsList();
		},
		methods: {
			async getGoodsList(){
				const {data:res} = await this.$http.get('goods',{params:this.queryInfo})
				console.log(res)
				if(res.meta.status!==200) return this.$message.error('获取列表失败')
				this.$message.success('获取列表成功')
				this.goodsList = res.data.goods
				this.total = res.data.total
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
