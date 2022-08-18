import axios from "./axios";

export const getData = () => {
	return axios.request({
		url: '/home/getData',
	})
}
//增加
export const getuseradd = (param) => {
	return axios.request({
		url: '/user/add',
		method: 'post',
		data: param
	})
}
//
export const getuseredit = (param) => {
	return axios.request({
		url: '/user/edit',
		method: 'post',
		data: param
	})
}
//查询
export const getUser = (params) => {
	return axios.request({
		url: '/user/getUser',
		method: 'get',
		params
	})
}
//删除
export const getdel = (params) => {
	return axios.request({
		url: '/user/del',
		method: 'post',
		params
	})
}

//权限
export const getMenu = (params) => {
	return axios.request({
		url: '/permission/getMenu',
		method: 'post',
		data: params
	})
}