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
			<el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabLeave" @tab-click="tabClicked">
			    <el-tab-pane label="基本信息">基本信息</el-tab-pane>
			    <el-tab-pane label="商品参数">商品参数</el-tab-pane>
			    <el-tab-pane label="商品属性">商品属性</el-tab-pane>
			    <el-tab-pane label="商品图片">商品图片</el-tab-pane>
				<el-tab-pane label="商品内容">商品内容</el-tab-pane>
			  </el-tabs>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex:'0'
			}
		},
		created() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.el-steps{
		margin-top: 10px;
	}
	.el-tabs{
		margin-top: 10px;
	}
</style>
