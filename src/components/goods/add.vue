<!-- 添加商品组件 -->
<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>添加商品</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片视图区 -->
		<el-card>
			<!-- 提示框 -->
			<el-alert :closable="false" center title="添加商品信息" type="info" show-icon>
			</el-alert>
			<!-- 步骤条 -->
			<!-- 步骤条 当一个类似于 数字的字符串 想转变成数字  后面直接减零  可以直接转变 -->
			<el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
				<el-step title="基本信息"></el-step>
				<el-step title="商品参数"></el-step>
				<el-step title="商品属性"></el-step>
				<el-step title="商品图片"></el-step>
				<el-step title="商品内容"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>

			<!-- tabs 切换栏 -->
			<el-form :model="addForm" label-position="top" :rules="addFormRules" ref="addFormRef" label-width="100px">
				<el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabLeave"
					@tab-click="tabClicked">
					<el-tab-pane label="基本信息" name="0">
						<el-form-item label="商品名称" prop="goods_name">
							<el-input v-model="addForm.goods_name"></el-input>
						</el-form-item>
						<el-form-item label="商品价格" prop="goods_price">
							<el-input v-model="addForm.goods_price"></el-input>
						</el-form-item>
						<el-form-item label="商品重量" prop="goods_weight">
							<el-input v-model="addForm.goods_weight"></el-input>
						</el-form-item>
						<el-form-item label="商品数量" prop="goods_number" type="number">
							<el-input v-model="addForm.goods_number"></el-input>
						</el-form-item>
						<el-form-item label="商品分类" prop="goods_cat">
							<!-- 级联选择框 -->
							<el-cascader v-model="addForm.goods_cat" :options="cateList" :props="cateProps" clearable
								@change="handleChange"></el-cascader>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="商品参数" name="1">
						<el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
							<el-checkbox-group v-model="item.attr_vals">
								<el-checkbox v-for="(cb,i)  in item.attr_vals" :key="i" :label="cb" border size="small">
								</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="商品属性" name="2">
						<el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
							<el-input v-model="item.attr_vals"></el-input>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
					<el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
				</el-tabs>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '0',
				addForm: {
					goods_name: '',
					goods_price: 0,
					goods_weight: 0,
					goods_number: 0,
					goods_cat: [],
				},
				addFormRules: {
					goods_name: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}],
					goods_price: [{
						required: true,
						message: '请输入商品价格',
						trigger: 'blur'
					}],
					goods_weight: [{
						required: true,
						message: '请输入商品重量',
						trigger: 'blur'
					}],
					goods_number: [{
						required: true,
						message: '请输入商品数量',
						trigger: 'blur'
					}],
					goods_cat: [{
						required: true,
						message: '请输入商品分类',
						trigger: 'blur'
					}],
				},
				cateList: [],
				cateProps: {
					expandTrigger: 'hover',
					label: 'cat_name',
					value: 'cat_id',
					children: 'children'
				},
				manyTableData: [],
				onlyTableData: []
			}
		},
		created() {
			this.getCateList();
		},
		computed: {
			cateId() {
				if (this.addForm.goods_cat.length === 3) {
					return this.addForm.goods_cat[2]
				}
				return null
			}
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await this.$http.get('categories')
				if (res.meta.status !== 200) return this.$message.error('获取接口失败')
				// 获取成功
				this.cateList = res.data
			},
			//选择框 发生改变的时候 所触发的事件
			handleChange() {
				// 我选择的可能是第一级  或者第二级别
				if (this.addForm.goods_cat.length !== 3) {
					this.addForm.goods_cat = []
				}
			},
			beforeTabLeave(activename, oldactivename) {
				if (oldactivename === '0' && this.addForm.goods_cat.length !== 3) {
					this.$message.error('请选择商品分类')
					return false
				}
			},
			async tabClicked() {
				// 当我点击了 第二个板块  我去请求接口 返回我的数据
				// 第二个板块的接口请求
				if (this.activeIndex === '1') {
					const {
						data: res
					} = await this.$http.get(`categories/${this.cateId}/attributes`, {
						params: {
							sel: 'many'
						}
					})
					// console.log(res)
					if (res.meta.status !== 200) return this.$message.error('请求接口失败');
					//赋值给我的data  方便我的遍历
					// console.log(res.data);
					// 要把我attr_vals 转化成数组类型 我页面才能进行正常的数据遍历
					res.data.forEach(item => {
						item.attr_vals = item.attr_vals.substr(1);
						item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',')
					})
					this.manyTableData = res.data
				}
				// 第三个板块请求接口
				if (this.activeIndex === '2') {
					const {
						data: res
					} = await this.$http.get(`categories/${this.cateId}/attributes`, {
						params: {
							sel: 'only'
						}
					});
					if (res.meta.status !== 200) return this.$message.error('请求接口失败');
					//赋值给我的data  方便我的遍历
					// console.log(res.data);
					// 要把我attr_vals 转化成数组类型 我页面才能进行正常的数据遍历

					this.onlyTableData = res.data
				}

			}
		}
	}
</script>

<style lang="less" scoped>
	.el-steps {
		margin-top: 10px;
	}

	.el-tabs {
		margin-top: 10px;
	}
</style>
