// 注册上面引入的各大模块
import { createStore } from "vuex"
import { getters } from "./getters.js"
import { mutations } from "./mutations.js"

// 共同维护的一个状态，state里面可以是很多个全局状态
const state = {
    // 登录用户id
    uid: "",
    // 登录用户，sessionStorage中存的是字符串，所以这里需要转化
    user: {
        age: 21,
        area: "浙江省-杭州市",
        des: "永无BUG，永不宕机",
        gender: "男",
        name: "北庭一梦",
        password: "123",
        registerTime: "2021-05-16 15:04:37",
        uid: "338663754",
    },
    // user: window.sessionStorage.getItem("user"),
    
    // 登录状态，0表示未登录,1表示登录
    isLogin: Number(window.sessionStorage.getItem("isLogin")),
    token: "",
}

// 状态管理
const store = createStore({
    // 状态
	state,

	// 获取属性的状态，获取数据并渲染
	getters,

	// 设置属性状态，处理数据的唯一途径，state的改变或赋值只能在这里
	mutations,

	// 应用mutations，数据的异步操作
	actions: {
		//获取登录状态
		// userLogin({ commit }, flag) {
		// 	commit("userStatus", flag)
		// },
	},
})

export default store
