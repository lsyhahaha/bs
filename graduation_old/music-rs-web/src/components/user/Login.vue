<template>
	<!-- <div class="login-container"> -->
	<div class="login-background">
		<!-- <img src="../../assets/imgs/background-user.jpg" width="100%" height="100%" alt=""> -->
	</div>

	<div id="login-form">
		<!-- 欢迎登录标头 -->
		<!-- <div
			style="position:absolute;top:5px;left:100px;font-weight:bolder;color:#606266"
		>
			欢迎登录个性化音乐推荐系统
		</div> -->
		<!-- <div>欢迎登录</div> -->
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item class="font-color-form-label" label="用户名：" prop="username">
				<el-input type="name" v-model="ruleForm.username" autocomplete="off" placeholder="请输入用户名"
					clearable></el-input>
			</el-form-item>
			<el-form-item class="font-color-form-label" label="密码：" prop="password">
				<el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"
					clearable></el-input>
			</el-form-item>
			<el-form-item style="padding-top:25px;margin-bottom:0;margin-right:0;margin-left:10px;">
				<el-button type="primary" @click="loginSubmitForm('ruleForm')">
					登录
				</el-button>
				<el-button style="margin-left:20px;" @click="registerSubmitForm">
					注册
				</el-button>
			</el-form-item>
		</el-form>

	</div>
	<el-dialog class="register-dialog" title="用户注册" modal="false" v-model="registerDialogVisibleEdit">
		<el-form :model="form" :rules="formRules">
			<el-form-item prop="name" label="用户名" :label-width="formLabelWidth">
				<el-input clearable v-model="form.name" autocomplete="off" placeholder="请输入用户名，3~16个字符、数字或特殊字符等"></el-input>
			</el-form-item>
			<el-form-item class="gender-item" label="性别" :label-width="formLabelWidth">
				<el-select v-model="form.gender" placeholder="请选择性别" style="width:100%;">
					<el-option label="男" value="男"></el-option>
					<el-option label="女" value="女"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="age" label="年龄" :label-width="formLabelWidth">
				<el-input clearable v-model="form.age" autocomplete="off" placeholder="请输入年龄"></el-input>
			</el-form-item>
			<el-form-item label="所在地区" :label-width="formLabelWidth">
				<el-cascader v-model="value" :options="areaOptions" :props="props" @change="handleChange"
					style="width:100%;" placeholder="请选择地区"></el-cascader>
			</el-form-item>
			<el-form-item prop="des" label="个人介绍" :label-width="formLabelWidth">
				<el-input clearable v-model="form.des" autocomplete="off" placeholder="请输入个人介绍"></el-input>
			</el-form-item>
			<el-form-item prop="password" label="密码" :label-width="formLabelWidth">
				<el-input clearable v-model="form.password" autocomplete="off" placeholder="请输入密码" :type="pwType"
					style="width: 90%"></el-input>
				<i style="margin-left: 10px; cursor: pointer" class="iconfont icon-mimaxianshi" @click="changePwType"></i>
			</el-form-item>
			<el-form-item prop="repeatePass" label="确认密码" :label-width="formLabelWidth">
				<el-input clearable v-model="form.repeatePass" autocomplete="off" placeholder="请重复新密码" :type="pwType"
					style="width: 90%"></el-input>
				<i style="margin-left: 10px; cursor: pointer" class="iconfont icon-mimaxianshi" @click="changePwType"></i>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="registerDialogVisibleEdit = false">
					取 消
				</el-button>
				<el-button type="primary" @click="register">
					提 交
				</el-button>
			</span>
		</template>
	</el-dialog>
	<!-- </div> -->
</template>

<script>
import { getLogin, _register } from "../../network/request.js"
import { ref } from "vue"
// 导入验证
import {
	validateUsername as validateName,
	validateAge,
	validateIntroduction,
} from "../../common/utils.js"
import { areaOptions as area } from "../../common/area-json"
export default {
	name: "login",
	data() {
		// 校验数据，见Element-Plus
		const validateUsername = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入用户名"))
			} else {
				if (this.ruleForm.username !== "") {
					this.$refs.ruleForm.validateField("username")
				}
				callback()
			}
		}
		const validatePass = (rule, value, callback) => {
			if (value.length < 3 || value.length > 16) {
				callback(new Error("请输入6~16个字符、数字或特殊字符"))
			} else {
				callback()
			}
		}
		return {
			// 用户信息表单
			form: {
				// 用户信息开始
				// 用户uid
				uid: ref("uid"),
				// 用户名
				name: ref(""),
				gender: ref(""),
				age: ref(""),
				area: ref(""),
				registerTime: ref(""),
				des: ref(""),
				password: ref(""),
				repeatePass: ref(""),
				// 用户信息结束
			},
			pwType: "password",
			// 注册弹框提示
			registerDialogVisibleEdit: false,
			// 弹出框的输入款长度
			formLabelWidth: "120px",
			// 表单数据
			ruleForm: {
				username: "",
				password: "",
			},
			// 表单验证规则，见Element-Plus
			rules: {
				username: [{ validator: validateUsername, trigger: "blur" }],
				password: [{ validator: validatePass, trigger: "blur" }],
			},
			formRules: {
				name: [{ validator: validateName, trigger: "blur" }],
				password: [{ validator: validatePass, trigger: "blur" }],
				repeatePass: [{ validator: validatePass, trigger: "blur" }],
				age: [{ validator: validateAge, trigger: "blur" }],
				des: [{ validator: validateIntroduction, trigger: "blur" }],
			},
			// 地区选择器的属性
			props: { expandTrigger: "hover" },
			// 地区选择器值
			value: [],
			// 地区选择器
			areaOptions: area,
		}
	},
	methods: {
		// 清空弹出框中的数据
		clearForm() {
			this.form.name = ""
			this.form.gender = ""
			this.form.age = ""
			this.form.area = ""
			this.form.registerTime = ""
			this.form.password = ""
			this.form.des = ""
		},
		// 重置表单内容
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		// 登录
		login() {
			getLogin({
				uid: this.ruleForm.username,
				password: this.ruleForm.password,
			}).then((response) => {
				console.log(response.data)
				// const userData = response.data.data.user
				// const token = response.data.data.uToken
				// console.log(userData.password)
				if (response.data.code == "200") {
					let userData = response.data.data.user
					let token = response.data.data.uToken
					userData.password = this.ruleForm.password
					console.log(userData)
					// 登录时添加到vuex，退出时要remove
					this.$store.commit("SET_USER", userData)
					this.$store.commit("SET_TOKEN", token)
					this.$store.commit("SET_ISLOGIN", 1)
					window.sessionStorage.setItem("user", JSON.stringify(userData))
					// isLogin存为1表明在登录状态
					window.sessionStorage.setItem("isLogin", 1)

					// console.log(validateUsername())
					this.$router.push({
						path: "/discover",
					})
					this.$message({
						type: "success",
						message: userData.name + "  登录成功!",
					})
				} else {
					console.log('登录失败！！！')
					// 重置表单
					this.resetForm("ruleForm")
					// 弹出提示
					this.$message({
						type: "info",
						message: "用户名或密码错误，登录失败!",
					})
				}
			})
		},
		// 提交表单的事件处理
		loginSubmitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// callback(new Error('用户名或密码错误'));
					// alert("submit!");
					this.login()
				} else {
					console.log("error submit!!")
					// callback(new Error('用户名或密码错误'));
					return false
				}
			})
		},
		// 用户注册
		register() {
			if (this.form.password !== this.form.repeatePass) {
				this.$message({
					type: "info",
					message: "密码不同，注册失败",
				})
				return false
			}
			_register(this.form).then((response) => {
				const data = response.data.data
				const code = response.data.code
				const msg = response.data.msg
				console.log(data)
				console.log(data.uid)
				if (code == 200) {
					this.$alert("请记住账号：" + data.uid, "注册提示", {
						confirmButtonText: "确定",
						callback: () => {
							this.$message({
								type: "success",
								message: "注册成功",
							})
						},
					})
					this.registerDialogVisibleEdit = false
					this.clearForm()
					this.$router.push({
						path: "/login",
						query: {
							uid: data.uid,
						},
					})
				} else {
					this.$message({
						type: "info",
						message: msg,
					})
				}
			})
		},
		// 提交注册信息按钮监听
		registerSubmitForm() {
			this.registerDialogVisibleEdit = true
			this.clearForm()
		},
		// 地区选择器选择
		handleChange(value) {
			console.log(value)
			this.form.area = value[0] + "-" + value[1]
		},
		// 更改密码显示
		changePwType() {
			console.log("改变密码显示类型")
			if (this.pwType == "password") {
				console.log("改变密码显示类型为明文")
				this.pwType = "name"
			} else {
				console.log("改变密码显示类型为密文")
				this.pwType = "password"
			}
		},
	},
}
</script>

<style scoped>
/* // scoped表示旨在本文件内起作用，局部声明
//@import url(); 引入公共css类 */

#login-form {
	z-index: 1;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	width: 400px;
	height: 300px;
	background-color: rgba(204, 204, 204, 0.6);
	border-radius: 10px;
}

#login-form .el-form {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	height: 200px;
	width: 400px;
}

#login-form .el-form .el-form-item {
	margin-right: 30px;
}

#login-form .el-form .el-form-item .el-form-item__content {
	margin-left: 0 !important;
}

/* 尽在登录界面显示背景 */
.login-background {
	background: url("../../assets/imgs/background-user.jpg") no-repeat center center;
	background-size: cover;
	background-attachment: fixed;
	background-color: #cccccc;
	z-index: -1;
	position: absolute;
	width: 100%;
	height: 100%;
}

.register-dialog>>>.gender-item>>>div.el-form-item__content {
	text-align: left;
}

/* 设置 .el-form-item 标签的label的颜色*/
.font-color-form-label .el-form-item__label {
	color: #303133;
}
</style>

<style>
.register-dialog>>>.gender-item>>>div.el-form-item__content {
	text-align: left;
}
</style>
