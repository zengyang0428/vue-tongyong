<template>
	<header>
		<div class="l-coneter">
			<el-button plain icon="el-icon-menu" @click="handelMen" size="mini"></el-button>
			<!-- <h3 style="color:#fff">首页</h3> -->
			<el-breadcrumb  separator="/">
				<el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }" >{{item.label}}</el-breadcrumb-item>
			
			</el-breadcrumb>

		</div>
		<div class="r-coneter">
			<el-dropdown trigger="click" size="mini">
				<span>
					<img class="user" :src="usorlmg" alt="">
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="ger">个人中心</el-dropdown-item>
					<el-dropdown-item @click.native="tuichu">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</header>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'
export default {
	name: 'Header',
	data() {
		return {
			usorlmg: require('@/assets/images/user.png')
		}
	},
	methods: {
		handelMen() {
			store.commit('collapseMenu')
		},
		tuichu(){
			this.$store.commit("calarMenu")
			this.$router.push('/login')
		},
		ger(){
				this.$router.push('/home')
		}
		
	},
	computed:{
		...mapState({
			tags:state=>state.tab.tabsList
		})
	}
}
</script>

<style lang="less" scoped>
header {
	display: flex;
	height: 100%;
	justify-content: space-between;
	align-items: center;
}

.l-coneter {
	display: flex;
	align-items: center;

	.el-button {
		margin-right: 20px;
	}
}

.r-coneter {
	.user {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
}
</style>