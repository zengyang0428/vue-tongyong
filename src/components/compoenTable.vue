<template>
	<div class="common-table">
		<el-table :data="tableData" height="400px" stripe>
			<el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label"
				:width="item.width ? item.width : 100">
				<template slot-scope="scope">
					<span>{{ scope.row[item.prop] }} </span>
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="160">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handledelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pager" layout=" prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage"
		:page-size="30">

		</el-pagination>
		<!-- <div>
			<el-pagination class="pager" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="currentPage" :page-sizes="[5, 10, 20, 30]" :page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper" :total="config.total">
			</el-pagination>
		</div> -->
	</div>
</template>

<script>
// import { getUserList } from '../api/data'
export default {

	props: {
		tableData: Array,
		tableLabel: Array,
		config: Object
	},
	data() {
		return {
			// currentPage: 1, //当前页数
			// pageSize: 10, //每页显示条数
			// total: 0,//总条数
		}
	},
	computed: {
		// compData() {
		// 	return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
		// }
	},
	methods: {
		// handleCurrentChange(val) {
		// 	this.currentPage = val
		// },
		// handleSizeChange(val) {
		// 	this.pageSize = val
		// 	this.currentPage = 1
		// },
		handleEdit(row) {

			this.$emit('edit', row)
		},
		handledelete(row) {

			this.$emit('del', row)
		},
		changePage(page) {
			console.log(page);
			this.$emit('changePage', page)
		}
	}
}
</script>

<style lang="less" scoped>
.common-table {
	height: calc(100%-62px);
	background-color: #fff;
	position: relative;

	.pager {
		position: absolute;
		top: 322px;
		right: 20px;
	}
}
</style>