import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


export default new Router({
	routes: [
		// {
		// 	path: '/',
		// 	name: 'Main',
		// 	redirect:'/home',
		// 	component: () => import('@/view/Main'), //路由懒加载
		// 	children: [
		// 		{
		// 			path: '/home',
		// 			name: 'home',
		// 			component: () => import('@/view/home/Home'),
		// 		},
		// 		{
		// 			path: '/user',
		// 			name: 'user',
		// 			component: () => import('@/view/User/User') //路由懒加载
		// 		},
		// 		{
		// 			path: '/mall',
		// 			name: 'mall',
		// 			component: () => import('@/view/mall/mall') //路由懒加载
		// 		},
		// 		{
		// 			path: '/page1',
		// 			name: 'page1',
		// 			component: () => import('@/view/Other/pagedemo') //路由懒加载
		// 		},
		// 		{
		// 			path: '/page2',
		// 			name: 'page2',
		// 			component: () => import('@/view/Other/pageTT') //路由懒加载
		// 		},
		// 	]
		// },
		{
			path: '/login',
			name: 'login',
			component: () => import('@/view/login/login'), //路由懒加载
		},
		{
			path : '*',
			name: 'NotFound',
			hidden: true,
			component: ()=>import('@/view/login/login') //
			
		}

	],
	mode: 'history'
})




