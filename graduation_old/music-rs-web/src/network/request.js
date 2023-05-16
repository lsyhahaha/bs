import axios from "axios"
// import router from "../router/index.js"

axios.defaults.baseURL = "/api"

// 配置拦截器
// 请求拦截器
// axios.interceptors.request.use(
// 	(config) => {
// 		console.log("请求拦截器", config)
// 		//1.1 获取到浏览器里面一直存储的token，并将它放到
// 		let uToken = localStorage.getItem("token")
// 		if (uToken) {
// 			//1.2 注意：给请求头里面添加u-token（后台判断就是取的这个请求头）请求头，并把随机数的token值也设置进去
// 			config.headers["u-token"] = uToken
// 		}
// 		// 注意这里修改完成之后需要返回config，否则无法进行后续工作
// 		return config
// 	},
// 	(err) => {
// 		// 拦截失败或者上述未返回config，则提示错误信息
// 		console.log(err)
// 	},
// )

// 响应拦截器
//2 使用axios设置后置拦截器，处理后台被拦截，没有登录的请求
// axios.interceptors.response.use(
// 	(result) => {
//         console.log("响应拦截器");
//         console.log(result)
// 		let data = result.data
//         console.log(data)
// 		//只要前台被拦截的请求里面含这两个参数，那么就跳转到登录界面
// 		if (data.code === 400 || data.msg === "没有验证信息或已失效") {
//             // 清理不正确的token，重新登录获取
//             window.localStorage.removeItem('token')
//             // 跳转到登录页面
// 			this.$router.push({
// 				path: "/login",
// 			})
// 		}
// 		return result
// 	},
// 	(error) => {
// 		Promise.reject(error)
// 	},
// )

// 获得歌曲的详情信息
export function getSongDetail(id) {
	return axios.get("https://api.imjad.cn/cloudmusic/?type=detail&id=" + id)
}

// 登录
export function getLogin(params) {
	return axios.post("/login", params)
}

// 获得推荐歌曲
export function getRecommendSongs(param) {
	return axios.post("/recommendSongs", param)
}

// 获得推荐用户
export function getRecommendUsers(param) {
	return axios.post("/recommendUsers", param)
}

// 发现歌曲，新歌
export function getDiscoverSongs(param) {
	return axios.post("/discover", param)
}

//获得歌曲列表，用于管理员
export function _getDisplaySongs(param) {
	return axios.post("/display", param)
}

// 热门歌曲
export function getHotSongs(param) {
	return axios.post("/hot", param)
}

// 获得所有歌曲
export function _getAllSongs(param) {
	return axios.post("/songList", param)
}

// 搜索歌曲
export function _getSearchSongs(param) {
	return axios.post("/searchSongs", param)
}

// 添加歌曲
export function _addSong(param) {
	return axios.post("/addSong", param)
}

// 删除歌曲
export function _deleteSong(param) {
	return axios.post("/deleteSong", param)
}

// 更新歌曲
export function _updateSong(param) {
	return axios.post("/updateSong", param)
}

// 用户注册
export function _register(param) {
	return axios.post("/register", param)
}

// 更新用户
export function _updataUser(param) {
	return axios.post("/updateUser", param)
}

// 更新用户密码
export function _updataPw(param) {
	return axios.post("/updatePw", param)
}

// 添加播放记录，参数传入用户id和歌曲id即可
export function _addRecord(param) {
	return axios.post("/addRecord", param)
}

// 获得收藏歌曲列表
export function _getLoveSongList(param) {
	return axios.post("/loveSongList", param)
}

// 添加收藏记录
export function _addLoveSong(param) {
	return axios.post("/addLoveSong", param)
}

// 取消收藏
export function _cancelLoveSong(param) {
	return axios.post("/cancelLoveSong", param)
}

// 获得播放记录歌曲
export function _getRecordSong(param) {
	return axios.post("/getRecordSong", param)
}
