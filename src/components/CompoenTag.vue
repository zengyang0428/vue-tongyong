<template>
	<div class="tabs">
		<el-tag 
		v-for="(tag,index) in tags" :key="tag.name" :closable="tag.name !== 'home'"
		:effect="$route.name === tag.name ?'dark' : 'plain'"
		@click="chengMenu(tag)" @close="handleClose(tag,index)"
		size="mini">
		{{tag.label}}
		</el-tag>
	</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
	data() {
		return {

		}
	},
	computed: {
		...mapState({
			tags: state => state.tab.tabsList
		})
	},
	methods:{
		...mapMutations({
			close:'closeTag'
		}),	
		chengMenu(item){
			console.log(item);
			this.$router.push({
				path: item.name
			})
		},
		handleClose(tag,index){
			const length =  this.tags.length -1
			this.close(tag)
			if(tag.name !== this.$route.name){
				return;
			}
			if(index === length){
				this.$router.push({
					path: this.tags[index -1].path
				})
			}else{
				this.$router.push({
					path: this.tags[index].path
				})
			}
		}

	}
}
</script>

<style lang="less" scoped>
.tabs{
	padding:20px;
	.el-tag{
		margin-right: 15px;
		cursor: pointer;
	}
}
</style>