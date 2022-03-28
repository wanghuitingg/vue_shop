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
					<el-input v-model="queryInfo.query" @clear="getGoodsList" @keyup.enter.native="getGoodsList"
						class="input-with-select" clearable placeholder="请输入内容">
						<el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<!-- 和以往咱们用dialog  不同 这是直接跳转到其他组件当中了 -->
					<el-button type="primary" @click="goAddpage">添加商品</el-button>
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
					<template slot-scope="scope">
						<!-- {{数据项 | 过滤器的函数名}} -->
						{{ scope.row.add_time | dateFormat }}
					</template>
				</el-table-column>
				<el-table-column prop="goods_state" label="状态" width="95px">
					<template slot-scope="scope">
						<el-tag type="info" v-if="scope.row.goods_state===0">未通过</el-tag>
						<el-tag type="warning" v-else-if="scope.row.goods_state===1">审核中</el-tag>
						<el-tag type="success" v-else>已审核</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="130px">
					<template slot-scope="scope">
						<!-- 编辑按钮 -->
						<el-tooltip class="item" effect="dark" content="编辑商品信息" placement="top">
							<el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
						</el-tooltip>
						<!-- 删除按钮 -->
						<el-tooltip class="item" effect="dark" content="删除商品" placement="top">
							<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeGoodsById(scope.row.goods_id)"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页区 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum" :page-sizes="[100, 200, 300, 400]" :page-size="queryInfo.pagesize"
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
					query: '',
					pagenum: 1,
					pagesize: 5
				},
				goodsList: [],
				total: 0
			}
		},
		created() {
			this.getGoodsList();
		},
		methods: {
			async getGoodsList() {
				const {
					data: res
				} = await this.$http.get('goods', {
					params: this.queryInfo
				})
				console.log(res)
				if (res.meta.status !== 200) return this.$message.error('获取列表失败')
				this.$message.success('获取列表成功')
				this.goodsList = res.data.goods
				this.total = res.data.total
			},
			handleSizeChange(newSize) {
				this.queryInfo.pagesize = newSize;
				this.getGoodsList();
			},
			handleCurrentChange(newPage) {
				this.queryInfo.pagenum = newPage;
				this.getGoodsList();
			},
			async removeGoodsById(id){
				const {data:res} = await this.$http.delete(`goods/${id}`)
				// console.log(res)
				if(res.meta.status!==200) return this.$message.error('删除信息失败')
				this.$message.success('删除信息成功')
				this.getGoodsList()
			},
			goAddpage(){
				// 编程式导航  一定要用 this.$router.push('即将跳转的路由地址')
				this.$router.push('/goods/add')
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
