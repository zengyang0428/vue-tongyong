<template>
	<el-row class="home" :gutter="20">
		<el-col :span="8" style="margin-top:20px">
			<el-card shadow="hover">
				<div class="user">
					<img :src="usorlmg" alt="">
					<div class="userinfo">
						<p class="name">adimn</p>
						<p class="access">超级管理员</p>
					</div>
				</div>
				<div class="login-info">
					<p>上次登陆时间:<span>2022-7-20</span></p>
					<p>上次登陆地点:<span>湖南</span></p>
				</div>
			</el-card>
			<el-card style="margin-top: 20px; height: 400px;">
				<el-table :data="tableData">
					<el-table-column v-for="(val, key) in tableList" :key="key" :prop="key" :label="val">

					</el-table-column>
				</el-table>
			</el-card>
		</el-col>
		<el-col style="margin-top:20px" :span="15">
			<div class="num">
				<el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
					<i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
					<div class="detail">
						<p class="num"> ¥{{ item.value }}</p>
						<p class="txt"> {{ item.name }}</p>
					</div>
				</el-card>
			</div>
			<el-card style="height:280px">
				<!-- <div style="height:200px" ref="echarts"></div> -->
				<EchartsVue :chartData="echartData.order" style="height:250px" />
			</el-card>
			<div class="graph">
				<el-card style="height:260px">
					<!-- <div style="height:200px" ref=userecha> </div> -->
					<EchartsVue :chartData="echartData.user" style="height:200px" />
				</el-card>
				<el-card style="height:260px">
					<!-- <div style="height:180px" ref=videflarls> </div> -->
					<EchartsVue :chartData="echartData.video" :isAxisChart="false" style="height:180px" />
				</el-card>
			</div>
		</el-col>
	</el-row>
</template>
<script>
import { getData } from '../../api/data'
// import * as echarts from 'echarts'
import EchartsVue from '../../components/Echarts.vue'
export default {
	name: 'home',
	components: {
		EchartsVue
	},
	data() {
		return {
			usorlmg: require('@/assets/images/user.png'),
			tableData: [],
			countData: [
				{
					name: "今日支付订单",
					value: 1234,
					icon: "success",
					color: "#2ec7c9",
				},
				{
					name: "今日收藏订单",
					value: 210,
					icon: "star-on",
					color: "#ffb980",
				},
				{
					name: "今日未支付订单",
					value: 1234,
					icon: "s-goods",
					color: "#5ab1ef",
				},
				{
					name: "本月支付订单",
					value: 1234,
					icon: "success",
					color: "#2ec7c9",
				},
				{
					name: "本月收藏订单",
					value: 210,
					icon: "star-on",
					color: "#ffb980",
				},
				{
					name: "本月未支付订单",
					value: 1234,
					icon: "s-goods",
					color: "#5ab1ef",
				},
			],
			tableList: {
				name: '课程',
				todayBuy: "今日购买",
				monthBuy: "本月购买",
				totalBuy: '总购买'
			},
			echartData: {
				order: {
					xData: [],
					series: []
				},
				user: {
					xData: [],
					series: []
				},
				video: {
					series: []
				}

			}
		}
	},
	mounted() {
		getData().then(res => {
			const { code, data } = res.data
			if (code === 20000) {
				this.tableData = data.tableData
				const order = data.orderData
				const xdata = order.date
				const keyArray = Object.keys(order.data[0])
				const series = []
				keyArray.forEach(key => {
					series.push({
						name: key,
						data: order.data.map(item => item[key]),
						type: 'line'
					})
				})
				// const option = {
				// 	xAxis: {
				// 		data: xdata
				// 	},
				// 	yAxis: {},
				// 	legend: {
				// 		data: keyArray
				// 	},
				// 	series
				// }
				this.echartData.order.xData = xdata
				this.echartData.order.series = series
				// const E = echarts.init(this.$refs.echarts)
				// E.setOption(option)

				//用户图	
				// const userOpLion = {
				// 	legend: {
				// 		// 图例文字颜色
				// 		textStyle: {
				// 			color: "#333",
				// 		},
				// 	},
				// 	grid: {
				// 		left: "20%",
				// 	},
				// 	// 提示框
				// 	tooltip: {
				// 		trigger: "axis",
				// 	},
				// 	xAxis: {
				// 		type: "category", // 类目轴
				// 		data: data.userData.map(item => item.date),
				// 		axisLine: {
				// 			lineStyle: {
				// 				color: "#17b3a3",
				// 			},
				// 		},
				// 		axisLabel: {
				// 			interval: 0,
				// 			color: "#333",
				// 		},
				// 	},
				// 	yAxis: [
				// 		{
				// 			type: "value",
				// 			axisLine: {
				// 				lineStyle: {
				// 					color: "#17b3a3",
				// 				},
				// 			},
				// 		},
				// 	],
				// 	color: ["#2ec7c9", "#b6a2de"],
				// 	series: [
				// 		{
				// 			name: '新增用户',
				// 			data: data.userData.map(item => item.new),
				// 			type: 'bar',
				// 		},
				// 		{
				// 			name: '活跃用户',
				// 			data: data.userData.map(item => item.active),
				// 			type: 'bar',
				// 		},
				// 	],
				// }
				this.echartData.user.xData = data.userData.map(item => item.date)
				this.echartData.user.series = [
					{
						name: '新增用户',
						data: data.userData.map(item => item.new),
						type: 'bar',
					},
					{
						name: '活跃用户',
						data: data.userData.map(item => item.active),
						type: 'bar',
					},
				]
				// const U = echarts.init(this.$refs.userecha)
				// U.setOption(userOpLion)
				//饼图
				// const video = {
				// 	tooltip: {
				// 		trigger: "item",
				// 	},
				// 	color: [
				// 		"#0f78f4",
				// 		"#dd536b",
				// 		"#9462e5",
				// 		"#a6a6a6",
				// 		"#e1bb22",
				// 		"#39c362",
				// 		"#3ed1cf",
				// 	],
				// 	series: [
				// 		{
				// 			data: data.videoData,
				// 			type: 'pie',
				// 		},
				// 	],
				// }
				// this.echartData.order.xData = xdata
				this.echartData.video.series = [
					{
						data: data.videoData,
						type: 'pie',
					},
				]
				// const P = echarts.init(this.$refs.videflarls)
				// P.setOption(video)
			}
			console.log(res);
		})
	}
}
</script>

<style lang="scss" scoped>
</style>