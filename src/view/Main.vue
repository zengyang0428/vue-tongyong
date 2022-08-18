<template>
	<el-container style="height:100%">
		<el-aside width="auto">
			<Common/>
		</el-aside>
		<el-container>
			<el-header>
				<Header></Header>
			</el-header>
			<ComTag />
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import Common from '../components/Commoncomponents.vue'
import ComTag from '../components/CompoenTag.vue'
import Header from '../components/Header.vue'
export default {
	components:{
		Common,
		Header,
		ComTag
	}
}
</script>

<style lang="less" scoped>
.el-header{
	background-color: #333;
}
.el-main{
	padding-top: 0;
}


</style>