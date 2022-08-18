export default {
	state: {
		token:''
	},
	mutations:{
		setToken(state,val){
			state.token = val
			localStorage.setItem("username",val)
		},
	}
}