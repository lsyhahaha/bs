<template>
	<div id="songs-search">
		<el-table
			:data="songsData"
			stripe
			style="width: 100%;"
			:header-cell-style="{ fontWeight: 'normal', border: 'none' }"
		>
			<!-- :header-cell-style="{ fontWeight: 'normal' }"设置表头样式，中间的连接符去掉，改成驼峰形式 -->
			<el-table-column align="center" prop="index" label="" width="120">
				<template #default="scope">
					<sapn
						style="font-size:16px;width:20px;display:inline-block;"
					>
						{{ scope.$index + 1 }}
					</sapn>
					<i
						class="iconfont icon-bofang"
						style="margin-left:10px;font-size:18px;width:20px;display:inline-block;"
						@click="startPlay(scope.$index)"
					></i>
					<i
						class="iconfont icon-shoucang_huaban1"
						style="margin-left:10px;font-size:18px;width:20px;display:inline-block;"
						@click="addLove(scope.$index)"
						:class="[
							scope.row.downUrl == 'None' ? 'fail' : 'succ',
							scope.row.isLove === true ? 'active' : '',
						]"
					></i>
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				prop="songName"
				label="歌曲名"
				width="220"
			>
				<!-- 在表格中添加跳转链接 -->
				<template #default="scope">
					<!-- <el-link underline="False" type="primary" to="/"> -->
					{{ scope.row.songName }}
					<!-- </el-link> -->
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				prop="singerName"
				label="歌手"
				width="220"
			>
				<template #default="scope">
					<!-- <el-link underline="False" type="primary" to="/"> -->
					{{ scope.row.singerName }}
					<!-- </el-link> -->
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				prop="album"
				label="专辑"
				width="300"
			></el-table-column>
			<el-table-column
				align="center"
				prop="songTime"
				label="时长"
				width="200"
			>
				<template #default="scope">
					{{ scope.row.songTime }}
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import { _getSearchSongs } from "../network/request.js"
export default {
	name: "searchMusic",
	data() {
		const item = {
			iid: "",
			songName: "",
			singerName: "",
			album: "",
			songTime: "",
			downUrl: "",
			picUrl: "",
		}
		return {
			// 后台的所有数据
			songsData: Array(10).fill(item),
			// 搜索关键词
			keyword: "",
		}
	},
	created() {
		this.keyword = this.$route.query.keyword
		console.log(this.currentPage)
		// 得到搜索歌曲歌曲的详情信息
		_getSearchSongs({ keyword: this.keyword }).then((response) => {
			this.songsData = response.data.data
			console.log(this.songsData)
		})
	},
	methods: {
		// startPlay(index) {
		// 	console.log(index)
		// 	var song = this.songsData[parseInt(index)]
		// 	console.log(song)
		// 	this.downUrl = song.downUrl
		// 	console.log(this.downUrl)
		// 	console.log(song.picUrl)
		// 	var iid = song.iid
		// 	var picUrl = song.picUrl
		// 	var songNae = song.songName
		// 	var singerName = song.singerName
		// 	var mp3Url = this.downUrl
		// 	// 将事件传递给子组件，第一个参数为自定义事件名，后续参数为传递过去的数据
		// 	console.log("开始emit")
		// 	this.$emit("playmusic", iid, mp3Url, picUrl, songNae, singerName)
		// 	console.log("结束emit")
		// },
        startPlay(index) {
			const songsData = this.songsData
			console.log(index)
			// 将事件传递给子组件，第一个参数为自定义事件名，后续参数为传递过去的数据
			console.log("开始emit")
			this.$emit("playmusic", index, songsData)
			console.log("结束emit")
			// this.$router.push({ name: "main", params: { mp3: "mp3" } })
			// this.$parent.audioIsChange = true
		},
		// 添加收藏歌曲
		addLove(index) {
			var isLove = this.songsData[parseInt(index)].isLove
			var songName = this.songsData[parseInt(index)].songName
			if (isLove === true) {
				this.songsData[parseInt(index)].isLove = false
				console.log("取消收藏")
				this.$message({
					type: "info",
					message: songName + " " + "取消收藏!",
				})
			} else {
				this.songsData[parseInt(index)].isLove = true
				console.log("收藏歌曲")
				this.$message({
					type: "success",
					message: songName + " " + "收藏成功!",
				})
			}
		},
	},
}
</script>
<style scoped>
#songs-search {
	position: absolute;
	width: 1060px !important;
	right: 0;
	left: 0;
	margin-left: auto;
	margin-right: auto;
}
/* 字体图标鼠标覆盖变色 */
#songs-search i.iconfont.icon-bofang:hover {
	cursor: pointer;
	/* color: rgb(231, 56, 40); */
	color: #f56c6c;
}
/* #song-discover .el-table{
    position: absolute;
    right: 0;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    width: 1400px;
} */

/* 收藏歌曲激活状态 */
#songs-search .active {
	color: #f56c6c;
}

/* 字体图标鼠标覆盖变色 */
#songs-search i.iconfont.icon-shoucang_huaban1:hover {
	cursor: pointer;
}
</style>
