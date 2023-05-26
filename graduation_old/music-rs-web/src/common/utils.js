// 工具文件

/* 验证账号 */
export function validateUsername(rule, value, callback) {
	if (value.length < 3 || value.length > 16) {
		return callback(new Error("用户名不得小于3个或大于20个字符!"))
	} else {
		callback()
	}
}

/* 添加年龄验证 */
export function validateAge(rule, value, callback) {
	if (value < 1 || value.length > 200) {
		return callback(new Error("年龄不得小于1或大于200！"))
	} else {
		callback()
	}
}

/* 添加个人介绍 */
export function validateIntroduction(rule, value, callback) {
	if (value.length < 1 || value.length > 50) {
		return callback(new Error("个人简介不得超过50个字符！"))
	} else {
		callback()
	}
}




