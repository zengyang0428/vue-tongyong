<template>
	<el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
		aclive-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
		<h3 v-if="isCollapse">后台</h3>
		<h3 v-else>通用后台管理系统</h3>
		<el-menu-item @click="clickMAne(item)" v-for="item in nochildren" :index="item.path + ''" :key="item.path">
			<i :class="`el-icon-` + item.icon"></i>
			<span slot="title">{{ item.label }}</span>
		</el-menu-item>
		<el-submenu v-for="item in hashchildren"  :index="item.path + ''"  :key="item.path">
			<template slot="title">
				<i :class="`el-icon-` + item.icon"></i>
				<span slot="title">{{ item.label }}</span>
			</template>
			<el-menu-item-group v-for="(subtime, subindex) in item.children" :key="subtime.path">
				<el-menu-item @click="clickMAne(subtime)" :index="subindex + ''">{{ subtime.label }}</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>
</template>
<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}

.el-menu {
	height: 100%;
	border: none;

	h3 {
		color: #fff;
		text-align: center;
		line-height: 48px;

	}
}
</style>

<script>
import store from '@/store'
export default {
	data() {
		return {
			menu: [
				{
					path: '/home',
					name: 'home',
					label: '首页',
					icon: 's-home',
					url: 'Home/Home'
				},
				{
					path: '/mall',
					name: 'mall',
					label: '商品管理',
					icon: 'video-play',
					url: 'MallManage/MallManage'
				},
				{
					path: '/user',
					name: 'user',
					label: '用户管理',
					icon: 'user',
					url: 'UserManage/UserManage'
				},
				{
					label: '其他',
					icon: 'location',
					children: [
						{
							path: '/page1',
							name: 'page1',
							label: '页面1',
							icon: 'setting',
							url: 'Other/PageOne'
						},
						{
							path: '/page2',
							name: 'page2',
							label: '页面2',
							icon: 'setting',
							url: 'Other/PageTwo'
						}
					]
				}
			]
		};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		clickMAne(item) {
			this.$router.push({
				path: item.name
			})
			store.commit('selectMenu',item)
		}
	},
	computed: {
		nochildren() {
			return this.asyncMenu.filter(item => !item.children)
		},
		hashchildren() {
			return this.asyncMenu.filter(item => item.children)
		},
		isCollapse() {
			return store.state.tab.isCollapse
		},
		asyncMenu(){
			return this.$store.state.tab.menu
		}
	}
}
</script>