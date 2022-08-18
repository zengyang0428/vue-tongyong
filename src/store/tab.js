export default {
	state: {
		isCollapse: false,
		tabsList: [
			{
				path: '/home',
				name: 'home',
				label: '首页',
				icon: 'home',
			},
		],
		currentMenu: null,
		menu: []
	},
	mutations: {
		collapseMenu(state) {
			state.isCollapse = !state.isCollapse
		},
		selectMenu(state, val) {
			if (val.name !== 'home') {
				state.currentMenu = val
				const result = state.tabsList.findIndex(item => item.name === val.name)
				console.log(result, "result");
				if (result === -1) {
					state.tabsList.push(val)
				}
			} else {
				state.currentMenu = null
			}
		},
		closeTag(state, val) {
			const result = state.tabsList.findIndex(item => item.name === val.name)
			console.log(result, "result");
			state.tabsList.splice(result, 1)
		},
		serMenu(state, val) {
			state.menu = val
			localStorage.setItem("menu", JSON.stringify(val))
		},
		calarMenu(state) {
			state.menu = [],
			localStorage.removeItem("menu")
		},
		addMenu(state, router) {
			if (!localStorage.getItem("menu")) {
				return
			}
			const menu = JSON.parse(localStorage.getItem("menu"))
			state.menu = menu
			const menuArray = [
				{
					path: '/',
					component: () => import('@/view/Main'),
					children: []
				}
			]
			menu.forEach(item => {

				if (item.children) {
					item.children = item.children.map(item => {
						item.component = () => import(`@/view/${item.url}`) //es6模板字符串语法
						console.log(item.component, 'item')
						return item //
					})
					menuArray[0].children.push(...item.children)
					console.log(menuArray, 'menuArray')
				} else {
					item.component = () => import(`@/view/${item.url}`)

					menuArray[0].children.push(item)
					console.log(menuArray, 'nochild')
				}
			});
			//路由动态添加
			console.log(menuArray);
			router.addRoutes(menuArray)
		}
	}
}