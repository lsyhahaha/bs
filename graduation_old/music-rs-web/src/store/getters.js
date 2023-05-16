// store的getters
const getters = {
	// 获得uid
	getUid(state) {
		return state.uid
	},
	//获取登录状态
	getIsLogin(state) {
		return state.isLogin
	},
	// 返回用户信息
	getUser(state) {
		return state.user
		// if (!state.user) {
		// 	console.log("state中user为空", state.user)
		// 	return window.sessionStorage.getItem("user")
		// }
	},
	// 获得token
	getToken(state) {
		return state.toekn
	},
}

export { getters }
