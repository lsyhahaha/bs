<template>
	<div id="app">
		<router-link to="/login"></router-link>
		<div>
			<router-view />
		</div>
	</div>
</template>

<script>
// import login from "./views/user/Login.vue"

export default {
	name: "app",
	components: {
	},
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
    /* margin-top: 60px; */
    /* 设置页面充满屏幕 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
