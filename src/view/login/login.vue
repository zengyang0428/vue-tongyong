<template>
	<el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
		<h3 class="login-title">系统登陆</h3>
		<el-form-item label="用户名" label-width="80px" prop="username" class="username">
			<el-input type="input" v-model="form.username" autocomplete="off" placeholder="请输入账户"></el-input>
		</el-form-item>
		<el-form-item label="密码" label-width="80px" prop="password" class="password">
			<el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
		</el-form-item>
		<el-form-item class="login_submit">
			<el-button type="primary" @click="login" class="login_submit">登陆</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
import { getMenu } from '../../api/data'
// import Mock from 'mockjs'
export default {
	data() {
		return {
			form: {

			},
			rules: {
				username: [{ requied: true, message: "请输入用户名", trigger: "blur" }, {
					min: 3,
					message: "用户名长度不能小于3位"
				}],
				password: [{ requied: true, message: "请输入密码", rigger: "blur" }],
			},
		};
	},
	methods: {
		login() {
			getMenu(this.form).then(res => {
				if(res.data.code === 20000){
					console.log(res.data);
					this.$store.commit("calarMenu")
					this.$store.commit("serMenu",res.data.data.menu)
					this.$store.commit("setToken",res.data.data.token)
					this.$store.commit("addMenu",this.$router)
					this.$router.push('/home')
				} else {
					this.$message.warning(res.data.message)
				}
			})
			// const token = Mock.Random.guid()
			// this.$store.commit("calarMenu")
			// this.$store.commit("serMenu",token)
			// this.$store.commit("setToken",token)
			// // localStorage.setItem('username', token)
			// this.$router.push('/home')
		}
	},
};
</script>
<style lang="less" scoped>
.login-container {
	border-radius: 15px;
	background-clip: padding-box;
	margin: 180px auto;
	width: 350px;
	padding: 35px 35px 15px 35px;
	background-color: #fff;
	border: 1px solid #eaeaea;
	box-shadow: 0 0 25px #eaeaea;
}

.login-title {
	margin: 0px auto 40px auto;
	text-align: center;
	color: #505458;
}

.login_submit {
	margin: 10px auto 0px auto;
}
</style>