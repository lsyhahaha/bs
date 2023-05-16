// store的actions
const actions = {
	// 方式一：执行回调函数，告知外部组件异步操作已经完成，不够优雅
	// 默认传入一个context上下文参数，这里context可以认为是store，同样也可以接收一个外部参数
	// asyncUpdateInfo(context, payload) {
	// 	// 异步操作
	// 	setTimeout(() => {
	//         console.log(payload)
	// 		// 这里context（也可以认为是store）通过commit提交的方式执行updateInfo函数
	// 		context.commit("updateInfo")
	//         console.log(payload.message)
	//         // 执行回调函数
	//         payload.success()
	// 	}, 2000)
	// },

	// 方式二：方式一虽然能够实现，但不够优雅，使用Pormise改写
	asyncUpdateInfo(context, payload) {
		// 返回一个Promise对象
		return new Promise((resolve, rejevt) => {
			// 异步操作
			setTimeout(() => {
				console.log(payload)
				// 这里context（也可以认为是store）通过commit提交的方式执行updateInfo函数
				context.commit("updateInfo")

				// 返回一个数据
				resolve("执行完毕，我来自Promise对象")
			}, 2000)
		})
	},
}

export { actions }
