<template>
	<div class="manage">
		<el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
			<ComFrom :formLabel="opertateFormLabel" :form="operateForm" :inline="true" ref="form">
			</ComFrom>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShow = false">取消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</div>
		</el-dialog>
		<div class="manage-header">
			<el-button type="primary" @click="adduser">+新增</el-button>
			<ComFrom :formLabel="formLabel" :form="searchFform" :inline="true" ref="form">
				<el-button type="primary" @click="getList(searchFform.keyword)">搜索</el-button>
			</ComFrom>
		</div>
		<compTable :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()"
			@edit="editUser" @del="delUser"></compTable>
	</div>
</template>

<script>
import { getuseradd, getuseredit, getUser, getdel } from '../../api/data'
import ComFrom from '../../components/CompoenFrom.vue';
import compTable from '../../components/compoenTable.vue';
//节流和防抖
// import { throttleDebounce } from '../../assembly/throttleDebounce'
export default {
	components: {
		ComFrom,
		compTable
	},
	data() {
		return {

			operateType: 'add',
			isShow: false,
			// 用于保存防抖的定时器
			timer: null,
			opertateFormLabel: [
				{
					model: 'name',
					label: '姓名',
					type: 'input'
				},
				{
					model: 'age',
					label: '年龄',
					type: 'input'
				},
				{
					model: 'sex',
					label: '性别',
					type: 'select',
					opts: [
						{
							label: '男',
							value: 1
						},
						{
							label: '女',
							value: 0
						}
					]
				},
				{
					model: 'birth',
					label: '出生日期',
					type: 'date'
				},
				{
					model: 'addr',
					label: '地址',
					type: 'input'
				}
			],
			operateForm: {
				name: '',
				addr: '',
				age: '',
				birth: '',
				sex: '',
			},
			formLabel: [
				{
					model: "keyword",
					label: '',
					type: 'input'
				}
			],
			searchFform: {
				keyword: ''
			},
			tableData: [],
			tableLabel: [
				{
					prop: "name",
					label: "姓名",
				},
				{
					prop: "age",
					label: "年龄",
				},
				{
					prop: "sexLabel",
					label: "性别",
				},
				{
					prop: "birth",
					label: "出生日期",
					width: 200
				},
				{
					prop: "addr",
					label: "地址",
					width: 320
				}
			],
			config: {
				loading: null,
				page: 1,
				total: 20,
				name: null
			}

		}
	},
	mounted() {

	},
	methods: {
		// query() {

		// 	this.tableData = this.tableData.filter(tb => {
		// 		console.log(this.searchFform.keyword)
		// 		return (tb.name === this.searchFform.keyword);
		// 	})
		// },
		confirm() {
			if (this.operateType === 'edit') {
				getuseredit(this.operateForm).then(res => {
					this.isShow = false
					console.log(res);
					this.getList()
				})
			} else {
				getuseradd(this.operateForm).then(res => {
					this.isShow = false
					console.log(res);
					this.getList()
				})
			}
		},
		adduser() {
			this.isShow = true
			this.operateType = 'add'
			this.operateForm = {
				name: '',
				addr: '',
				age: '',
				birth: '',
				sex: '',
			}

		},
		editUser(row) {
			console.log(row);
			this.operateType = 'edit'
			this.isShow = true
			this.operateForm = row
		},
		delUser(row) {
			this.$confirm("此操作将永久删除改文件,是否继续", "提示", {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				const id = row.id
				getdel(id).then(() => {
					this.$message({
						type: 'success',
						message: "清除成功"
					})
					this.getList()
				})
			})
		},
		getList(name = '') {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.config.loading = true
				name ? (this.config.page = 1) : ''
				getUser({
					page: this.config.page, name
				}).then(res => {
					console.log(res);
					this.tableData = res.data.list.map(item => {
						item.sexLabel = item.sex === 0 ? '女' : '男'
						return item
					})
					this.config.total = res.data.count
					this.config.loading = false
				})
			},3000)
		}
	},
	created() {
		this.getList()

	},
}
</script>

<style lang="less" scoped>
.manage-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>