// 用户主界面展示
<template>
	<div id="user-index">
		<el-container class="all-screen" direction="vertical">
			<el-header height="50px">
				<div class="dots" style="display: inline-block">
					<i
						class="iconfont icon-yuandianda"
						style="color: #dd6d60; font-size: 25px; padding-right: 5px"
					></i>
					<i
						class="iconfont icon-yuandianda"
						style="color: #aed292; font-size: 25px"
					></i>
				</div>
				<el-input
					placeholder="请输入关键词"
					v-model="searchInput"
					prefix-icon="el-icon-search"
					clearable
					@keyup.enter="searchSongs"
					@clear="clearSearchInput"
				></el-input>
				<!-- 这里的样式需要放在这里才能生效，写到style标签里面不行，暂时还未解决 -->
				<el-dropdown
					style="
						position: absolute !important;
						right: 40px;
						top: 10px;
						color: #fff !important;
						width: 120px;
						height: 30px;
						line-height: 30px;
					"
				>
					<button
						class="user-settings"
						style="
							border-radius: 15px;
							padding: 1px;
							width: 100%;
							height: 30px;
						"
					>
						<!-- <i
							class="el-icon-user-solid"
							style="margin-right: 5px"
						></i> -->
						<img
							src="../assets/imgs/user-image.jpg"
							alt="加载失败"
							srcset=""
							style="
								display: inline-block;
								width: 30px;
								height: 30px;
								margin-right: 5px;
								border-radius: 15px;
							"
						/>
						<span>
							{{ name }}
						</span>
					</button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item
								@click="userinfoDialogVisibleEdit = true"
							>
								个人中心
							</el-dropdown-item>
							<el-dropdown-item @click="changePwDialog">
								修改密码
							</el-dropdown-item>
							<el-dropdown-item @click="logOut">
								退出登录
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu
						default-active="1"
						class="el-menu-vertical-music"
						text-color="#fff"
						background-color="transparent"
						active-text-color="#f56c6c"
						router="true"
					>
						<el-menu-item route="/discover" index="1">
							<!-- <router-link to="/main/discover">
								<i class="iconfont icon-discover"></i>
								<template #title>发现音乐</template>
							</router-link> -->
							<i
								class="iconfont icon-discover"
								style="padding-right: 10px"
							></i>
							<template #title>音乐库</template>
						</el-menu-item>
						<el-menu-item route="/hotmusic" index="2">
							<i
								class="iconfont icon-new-music"
								style="padding-right: 10px"
							></i>
							<template #title>最热音乐</template>
						</el-menu-item>
						<el-menu-item route="/recommendsongs" index="3">
							<i
								class="iconfont icon-musiclist"
								style="padding-right: 10px"
							></i>
							<template #title>推荐歌曲</template>
						</el-menu-item>
						<el-menu-item route="/recommendusers" index="4">
							<i
								class="iconfont icon-userlist"
								style="padding-right: 10px"
							></i>
							<template #title>相似用户</template>
						</el-menu-item>
						<el-menu-item route="/loveSong" index="5">
							<i
								class="iconfont icon-shoucang_huaban1"
								style="padding-right: 10px"
							></i>
							<template #title>收藏列表</template>
						</el-menu-item>
					</el-menu>
					<!-- </el-col>

					</el-row> -->
				</el-aside>

				<el-container style="border-radius: 5px; position: relative">
					<!-- height:0;flex-grow:1;这里设置el-main内容超出时使用滑动条，el-footer不会被推到下面 -->
					<el-main
						style="
							background-color: #fff;
							padding: 10px;
							height: 0;
							flex-grow: 1;
							border-radius: 5px;
							position: relative;
						"
					>
						<!-- 父组件监听子组件，传递过来的事件要放在router-view标签里面（这里就是playmusic） -->
						<!-- <router-view @playmusic="changMP3Url"></router-view> -->

						<!-- 使用keep-alive标签缓存router-view中的内容，不需要每次都重新加载。这里的写法是基本使用的固定写法，不可更改，可以添加新的属性 -->
						<router-view
							@playmusic="changeMP3Url"
							@getData="sendData"
							v-slot="{ Component }"
						>
							<transition>
								<keep-alive>
									<component :is="Component" />
								</keep-alive>
							</transition>
						</router-view>
						<router-view name="loveSong"></router-view>
					</el-main>
					<el-footer
						style="background-color: rgb(241, 243, 244)"
						height="50px"
					>
						<div>
							<div class="song-info">
								<img
									:src="picUrl"
									alt="图片丢失"
									style="
										display: inline-block;
										width: 50px;
										height: 50px;
									"
								/>
								<div>
									<span
										style="
											display: inline-block;
											width: 100px;
											height: 100px;
											overflow: hidden;
											font-size: 14px;
										"
									>
										{{ songName }}
									</span>
									<span
										style="
											display: inline-block;
                                            height: 100px;
											width: 100px;
											overflow: hidden;
											font-size: 14px;
											color: #9b9b9b;
										"
									>
										{{ "-  " + singerName }}
									</span>
								</div>

								<!-- <div>歌曲名、歌手名</div> -->
							</div>
							<div>
								<audio
								id="audio"
								:src="MP3Url"
								controls="controls"
								@timeUpdate="audioTimeUpdate"
								@ended="musicEnd"
								style="
									width: 75%;
									height: 50px;
									right: 50px;
									position: absolute;
								"
							></audio>
						</div>
							
							<!-- <audio
								id="audio"
								:src="MP3Url"
								controls="controls"
								loop="loop"
								@timeUpdate="audioTimeUpdate"
								@ended="musicEnd"
								style="
									width: 1050px;
									height: 50px;
									right: 50px;
									position: absolute;
								"
							></audio> -->
							<!-- audio样式 -->
							<!-- style="
									width: 1100px;
									height: 50px;
									right: 0;
									position: absolute;
								" -->

							<!-- 播放模式 -->
							<span class="play-pattern">
								<i
									class="iconfont"
									:class="playPattern[playPatternIndex]"
									style="display: inline-block;width: 50px;height: 50px;right: 10px;position: absolute;text-align: center;line-height: 50px;"
									@click="changePattern"
								></i>
							</span>
						</div>
					</el-footer>
				</el-container>
			</el-container>
		</el-container>
		<!-- 个人中心弹出框 -->
		<el-dialog
			title="个人中心"
			modal="false"
			v-model="userinfoDialogVisibleEdit"
		>
			<el-form :model="form">
				<el-form-item label="用户id" :label-width="formLabelWidth">
					<el-input
						v-model="uid"
						autocomplete="off"
						disabled="true"
					></el-input>
				</el-form-item>
				<el-form-item label="姓名" :label-width="formLabelWidth">
					<el-input v-model="name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth">
					<el-input v-model="gender" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年龄" :label-width="formLabelWidth">
					<el-input v-model="age" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="所在地区" :label-width="formLabelWidth">
					<el-input v-model="area" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="注册时间" :label-width="formLabelWidth">
					<el-input
						v-model="registerTime"
						autocomplete="off"
						disabled="true"
					></el-input>
				</el-form-item>
				<el-form-item label="个人介绍" :label-width="formLabelWidth">
					<el-input v-model="des" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input
						v-model="password"
						autocomplete="off"
						disabled="true"
						style="width: 550px"
						:type="pwType"
					></el-input>
					<i
						style="margin-left: 10px; cursor: pointer"
						:class="[
							'iconfont',
							'icon-mimaxianshi',
							pwType == 'password' ? 'hide' : 'display',
						]"
						@click="changePwType"
					></i>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="updateUser">
						确 定
					</el-button>
					<el-button @click="userinfoDialogVisibleEdit = false">
						取 消
					</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 修改密码弹出框 -->
		<el-dialog title="修改密码" modal="false" v-model="pwDialogVisibleEdit">
			<el-form :model="form">
				<el-form-item label="原密码" :label-width="formLabelWidth">
					<el-input
						clearable
						v-model="oldPassword"
						autocomplete="off"
						placeholder="请输入原密码"
						style="width: 550px"
						:type="pwType"
					></el-input>
					<i
						style="margin-left: 10px; cursor: pointer"
						class="iconfont icon-mimaxianshi"
						@click="changePwType"
					></i>
				</el-form-item>
				<el-form-item label="新密码 " :label-width="formLabelWidth">
					<el-input
						clearable
						v-model="newPassword"
						autocomplete="off"
						placeholder="请输入新密码"
						style="width: 550px"
						:type="pwType"
					></el-input>
					<i
						style="margin-left: 10px; cursor: pointer"
						class="iconfont icon-mimaxianshi"
						@click="changePwType"
					></i>
				</el-form-item>
				<el-form-item label="重复新密码 " :label-width="formLabelWidth">
					<el-input
						clearable
						v-model="repeatNewPassword"
						autocomplete="off"
						placeholder="请重复新密码"
						style="width: 550px"
						:type="pwType"
					></el-input>
					<i
						style="margin-left: 10px; cursor: pointer"
						class="iconfont icon-mimaxianshi"
						@click="changePwType"
					></i>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="updatePw">
						修 改
					</el-button>
					<el-button @click="pwDialogVisibleEdit = false">
						取 消
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script>
import { ref } from "vue"
// 引入状态管理
// import { useStore } from "vuex"
// 引入接口
import { _updataPw, _updataUser, _addRecord } from "../network/request"

export default {
	name: "main",
	created() {
		// 获得状态管理
		// const store = useStore()
		// const user = this.$store.getters.getUser
		const user = this.$store.getters.getUser
		console.log(user)
		// console.log(useStore().state)
		// 得到state
		// this.state = useStore().state
		// 得到用户信息
		this.uid = user.uid
		this.gender = user.gender
		this.age = user.age
		this.area = user.area
		this.des = user.des
		this.registerTime = user.registerTime
		this.name = user.name
		this.password = user.password
		console.log("用户名：" + user.name)
		// console.log(this.songsData)

		// 获得数据
		// this.getData(this.songsData)

		// 页面加载时读取数据
		if (window.sessionStorage.getItem("user")) {
			console.log("页面加载")
			const session_user = JSON.parse(
				window.sessionStorage.getItem("user"),
			)
			console.log(session_user)
			this.$store.commit("SET_USER", session_user)
			console.log(this.$store)
			// 读取isLogin的值
			console.log('isLogin的值',Number(window.sessionStorage.getItem("isLogin")))
			this.$store.commit("SET_ISLOGIN", Number(window.sessionStorage.getItem("isLogin")))
		}
		// 页面刷新时保存状态
		window.addEventListener("beforeunload", () => {
			console.log("页面刷新")
			console.log(this.$store.getters.getUser)
			window.sessionStorage.setItem("user", JSON.stringify(this.user))
			// isLogin存为1表明在登录状态
			window.sessionStorage.setItem("isLogin", 1)
		})
	},
	data() {
		return {
			// store: useStore(),
			// 用户状态
			// state: useStore().state,
			user: this.$store.getters.getUser,
			// 用户信息开始
			// 用户uid
			uid: ref("uid"),
			// 用户名
			name: ref("初始名"),
			gender: ref("性别"),
			age: ref(""),
			area: ref(""),
			registerTime: ref(""),
			des: ref("个人描述"),
			password: ref(""),
			oldPassword: ref(""),
			newPassword: ref(""),
			repeatNewPassword: ref(""),
			// 用户信息结束

			// 歌曲id
			iid: "",
			// 歌曲搜索关键词输入
			searchInput: ref(""),
			// 歌曲信息开始
			songName: ref("一荤一素"),
			singerName: ref("毛不易"),
			MP3Url: ref(
				// 遇见
				// "http://music.163.com/song/media/outer/url?id=287035.mp3",
				// 你是人间四月天
				// 'http://music.163.com/song/media/outer/url?id=1344897943.mp3'
				// 一荤一素
				'http://music.163.com/song/media/outer/url?id=569200212.mp3'
			),
			picUrl: ref(
				// 遇见
				// "https://p1.music.126.net/KZ0VfIoFYsxpjz9sTQuLVQ==/17687843556430013.jpg",
				// 一荤一素
				"http://p2.music.126.net/vmCcDvD1H04e9gm97xsCqg==/109951163350929740.jpg"
			),
			// 歌曲信息结束

			// 是否正在播放歌曲
			audioIsPlaying: false,
			// 是否显示用户信息弹出框
			userinfoDialogVisibleEdit: false,
			// 是否显示修改密码弹出框
			pwDialogVisibleEdit: false,
			// 弹出框中输入框的宽度
			formLabelWidth: "120px",
			// 当前歌曲是否添加播放记录
			isAddRecord: false,
			// 密码显示与隐藏，默认隐藏
			pwType: "password",
			// 播放模式默认是列表循环
			playPattern: [
				"icon-liebiaoxunhuan",
				"icon-danquxunhuan",
				"icon-suijibofang",
			],
			playPatternIndex: 0,
			// 当前页面的所有歌曲信息
			songsData: [],
			// 当前播放的音乐在歌曲列表中的索引
			currentSongIndex: 0,
		}
	},

	methods: {
		// 清空修改密码表单
		clearChangePwForm() {
			this.oldPassword = ref("")
			this.newPassword = ref("")
			this.repeatNewPassword = ref("")
		},
		// 更新用户信息
		updateInfo() {
			let user = this.user
			user.name = this.name
			user.area = this.area
			user.des = this.des
			user.age = this.age
			user.gender = this.gender
			console.log(user)
			this.$store.commit("SET_USER", user)
		},
		// audio标签播放
		autoPlay() {
			const audio = document.getElementById("audio")
			audio.play()
		},
		//  audio标签暂停并重新加载
		closePlay() {
			const audio = document.getElementById("audio")
			audio.pause()
			// audio.load()
		},
		changeMP3Url(index, songsData) {
			// 获取播放器
			const audio = document.getElementById("audio")
			// 关闭播放器
			// audio.pause()
			this.songsData = songsData
			let song = this.songsData[parseInt(index)]
			// 如果该歌曲不能播放则跳过
			if (song.downUrl === "None") {
				console.log("会员歌曲无法播放")
				song = this.songsData[(parseInt(index) + 1) % 10]
			}
			console.log(song)
			// changMP3Url(valueMP3Url) {
			console.log("开始接收事件及参数")
			this.iid = song.iid
			// 修改播放器链接
			this.MP3Url = song.downUrl
			this.picUrl = song.picUrl
			this.songName = song.songName
			this.singerName = song.singerName
			// 更新当前歌曲索引
			this.currentSongIndex = parseInt(index)
			console.log("接收事件及参数结束")
			audio.load()
			audio.play()
			audio.autoplay = true
			// 切歌时修改播放记录标志为false
			this.isAddRecord = false
		},
		// 退出登录
		logOut() {
			this.$confirm("是否退出?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.$message({
						type: "success",
						message: "退出成功!",
					})
					// 清空登录状态内容
					window.sessionStorage.clear()
					//   跳转到登录页
					this.$router.push("/login")
				})

				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消退出",
					})
				})
		},
		// 更新用户信息，用户名、性别、年龄、所在地区、个人简介等
		updateUser() {
			this.$confirm("此操作将永久更新用户信息, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					_updataUser({
						uid: this.uid,
						name: this.name,
						gender: this.gender,
						age: this.age,
						area: this.area,
						des: this.des,
					}).then((response) => {
						if (response.data.code == 200) {
							this.$message({
								type: "success",
								message: "更新成功!",
							})
							this.userinfoDialogVisibleEdit = false
							// 更新状态管理中的用户信息
							this.updateInfo()
						} else {
							this.$message({
								type: "info",
								message: "更新失败!",
							})
							this.userinfoDialogVisibleEdit = false
						}
					})
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消更新",
					})
				})
		},
		// 弹出更新密码提示框
		changePwDialog() {
			this.pwDialogVisibleEdit = true
			console.log("清空内容")
			// 清空修改密码表单内容
			this.clearChangePwForm()
		},
		// 更新密码
		updatePw() {
			this.$confirm("此操作将永久更新密码, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					console.log(this.oldPassword == "")
					if (
						this.oldPassword == "" ||
						this.newPassword == "" ||
						this.repeatNewPassword == ""
					) {
						console.log("密码为空，不可修改")
						this.$message({
							type: "warning",
							message: "密码为空，修改失败！",
						})
						// 弹出框隐藏
						this.pwDialogVisibleEdit = false
						return false
					}
					if (this.newPassword === this.repeatNewPassword) {
						_updataPw({
							uid: this.uid,
							oldPw: this.oldPassword,
							newPw: this.newPassword,
						}).then((response) => {
							console.log(response.data)
							if (response.data.code == 200) {
								this.$message({
									type: "success",
									message: "更新成功!",
								})
								this.password = this.newPassword
								console.log("更新密码")
								this.pwDialogVisibleEdit = false
							} else {
								this.$message({
									type: "warning",
									message: "更新失败!",
								})
								console.log("更新失败")
								this.pwDialogVisibleEdit = false
							}
						})
					} else {
						this.$message({
							type: "warning",
							message: "两次新密码输入不同，更新失败!",
						})
					}
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消更新",
					})
				})
		},
		// 搜索歌曲
		searchSongs() {
			console.log("关键字：" + this.searchInput)
			console.log("搜索歌曲")
			//
			this.$router.push({
				path: "/searchMusic",
				query: {
					keyword: this.searchInput,
				},
			})
		},
		// 点击清空时触发事件，跳转到discover界面
		clearSearchInput() {
			console.log("清空搜索框内容")
			this.$router.push("/discover")
		},
		// 听歌时间超过30秒则添加到播放记录中
		audioTimeUpdate() {
			// console.log("准备添加播放记录")
			var audio = document.getElementById("audio")
			var currTime = audio.currentTime
			console.log(currTime)
			// 超过30秒则添加播放记录
			if (!this.isAddRecord && currTime > 30) {
				console.log("正在添加播放记录")
				_addRecord({
					uid: this.uid,
					iid: this.iid,
				}).then((response) => {
					console.log(response.data.data)
					if (response.data.code == 200) {
						console.log("添加成功")
						// 添加记录成功依次之后，本首歌时间更新则不再重复添加
						this.isAddRecord = true
					}
				})
			}
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
		// 修改播放模式
		changePattern() {
			console.log("播放模式修改事件触发")
			this.playPatternIndex = (this.playPatternIndex + 1) % 3
		},
		// 歌曲播放完毕时
		musicEnd() {
			console.log("播放完毕")
			// 列表循环
			if (
				"icon-liebiaoxunhuan" ===
				this.playPattern[this.playPatternIndex]
			) {
				console.log("列表循环")
				this.changeMP3Url(
					(parseInt(this.currentSongIndex) + 1) % 10,
					this.songsData,
				)
			} else if (
				"icon-danquxunhuan" === this.playPattern[this.playPatternIndex]
			) {
				// 单曲循环
				this.changeMP3Url(
					parseInt(this.currentSongIndex),
					this.songsData,
				)
			} else if (
				"icon-suijibofang" === this.playPattern[this.playPatternIndex]
			) {
				// 随机播放
				// 获得一个0~9的随机数
				let index = Math.floor(Math.random() * 10)
				this.changeMP3Url(parseInt(index), this.songsData)
			}
		},
		// 获取歌曲数据
		getData(songsData) {
			console.log("接受数据sendData")
			this.songsData = songsData
		},
	},
}
</script>

<style scoped src="../assets/css/main.css">
/* 引入外部css文件且作用域是局部，则需要使用src属性引入 */

/* 密码显示与隐藏样式 */
#user-index >>> .display {
	cursor: pointer;
	color: #f56c6c;
}
#user-index >>> .hide {
	cursor: pointer;
}
</style>
