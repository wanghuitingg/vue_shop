<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>订单管理</el-breadcrumb-item>
			<el-breadcrumb-item>订单列表</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片视图区 -->
		<el-card>
			<!-- 搜索框区域 -->
			<el-row>
				<el-col :span="8">
					<el-input class="input-with-select" clearable placeholder="请输入内容">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
			</el-row>
			<!-- table区域 -->
			<el-table :data="orderList" stripe border element-loading-text="拼命加载中" width="100%">
				<el-table-column type="index" label="#" width="180">
				</el-table-column>
				<el-table-column prop="order_number" label="订单编号" width="180">
				</el-table-column>
				<el-table-column prop="order_price" label="订单价格" width="180">
				</el-table-column>
				<el-table-column prop="pay_status" label="是否付款" width="180">
					<template slot-scope="scope">
						<el-tag type="success" v-if="scope.row.pay_status==='1'">已付款</el-tag>
						<el-tag type="warning" v-else>未付款</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="is_send" label="是否发货" width="180">
				</el-table-column>
				<el-table-column prop="create_time" label="下单时间" width="180">
					<template slot-scope="scope">
						<!-- {{数据项 | 过滤器的函数名}} -->
						{{ scope.row.create_time | dateFormat }}
					</template>
				</el-table-column>
				<!-- <el-table-column label="权限等级">
					<template slot-scope="scope">
						<el-tag type="danger" v-if="scope.row.level === '0'">等级一</el-tag>
						<el-tag type="warning" v-if="scope.row.level === '1'">等级二</el-tag>
						<el-tag type="success" v-if="scope.row.level === '2'">等级三</el-tag>
					</template>
				</el-table-column> -->
			</el-table>
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
					pagesize: 10
				},
				orderList: [],
				total: 0,
			}
		},
		created() {
			this.getOrdersList()
		},
		methods: {
			async getOrdersList() {
				const {
					data: res
				} = await this.$http.get('orders', {
					params: this.queryInfo
				});
				console.log(res)
				if (res.meta.status !== 200) return this.$message.error('请求接口失败');
				//请求接口成功的情况  我需要把res里面的data  赋值给我的数据层
				this.orderList = res.data.goods;
				this.total = res.data.total;
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
