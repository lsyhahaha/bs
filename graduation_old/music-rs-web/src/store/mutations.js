// store的mutations
// import Vue from "vue"

const mutations = {
	// 这里面定义方法

	// 保存登录状态.state为默认参数
	SET_ISLOGIN(state, status) {
		// Vue.set(state, "isLogin", status)
		// state.isLogin = status
	},
	// 保存用户信息
	SET_USER(state, data) {
		state.user = data
		// sessionStorage中存的是字符串，所以这里需要转化
		window.sessionStorage.setItem("user", JSON.stringify(data))
	},
	// 保存登录状态字
	SET_TOKEN(state, data) {
		// Vue.set(state, "token", data)
		state.token = data
        // 存储到本地，而不是session，浏览器关闭不会丢失
		window.localStorage.setItem("token", data)
	},
}

export { mutations }
