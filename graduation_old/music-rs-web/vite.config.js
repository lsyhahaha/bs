import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],

	server: {
		// 允许本机，默认是 localhost
		hostname: "0.0.0.0",
		// hostname: "localhost",
		// 本项目的本地端口，默认是 3000 端口
		port: "3000",
		// 浏览器自动打开
		open: false,
		/**
		 * 配置跨域，步骤说明：
		 * 1、配置本地主机和端口
		 * 2、设置别名“/api”，配置目标地址和是否允许跨域
		 * 3、在network.js里面导入import axios from "axios"，设置axios.defaults.baseURL = "/api"，如果不设置，则请求路径为 /api/xxx，设置之后请求路径为 /xxx
		 * 4、请求方式 axios.get、axios.post等
		 */
		// 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
		proxy: {
			"/api": {
				target: 'http://localhost:8082/',
				/**
				 * 默认changeOrigin的值是true,意味着服务器host设置成target
				 * changeOrigin的值是true,target是host, request URL是http://music.163.com/api/song/
				 * 如果设置changeOrigin: false，host就是浏览器发送过来的host，也就是localhost:8082。
				 */
				changeOrigin: true,
				// 路径重写，eg:把api接口替换为''
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
})
