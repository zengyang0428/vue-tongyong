import Mock from 'mockjs'
import homeApi from './mockServedata/home'
import userApi from './mockServedata/user'
import permissionApi from './mockServedata/permission'
Mock.mock('/home/getData',homeApi.getStatisticalData)
//user相关
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/user\/del/, 'post', userApi.deleteUser)
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
// 权限相关
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)

