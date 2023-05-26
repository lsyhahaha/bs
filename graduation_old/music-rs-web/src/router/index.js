import {
    createWebHistory,
    createRouter
} from "vue-router"
import admin from "../components/admin/Admin.vue"
import adminMenu from "../components/admin/AdminMenu.vue"
import login from "../components/user/Login.vue"
import main from "../components/Main.vue"
import recommendsongs from "../views/RecommendSongs.vue"
import recommendusers from "../views/RecommendUsers.vue"
import discover from "../views/Discover.vue"
import hotmusic from "../views/HotMusic.vue"
import searchMusic from "../views/SearchMusic.vue"
import loveSong from "../views/LoveSong.vue"
import userRecord from "../views/UserRecord.vue"
import store from "../store/index.js"

const routes = [
    {
        path: "/login",
        name: "login",
        component: login,
    },
    {
        path: "/admin",
        name: "admin",
        component: admin,
    },
    {
        path: "/adminMenu",
        name: "adminMenu",
        component: adminMenu,
    },
    {
        path: "/",
        name: "main",
        component: main,
        redirect: "/discover",
        meta: {
            requireLogin: true,
        },
        // 子路由
        children: [{
            path: "recommendsongs",
            name: "recommendsongs",
            // component: (resolve) => require([recommendsongs], resolve),
            component: recommendsongs,
            meta: {
                requireLogin: true,
            },
        },
            {
                path: "recommendusers",
                name: "recommendusers",
                component: recommendusers,
                meta: {
                    requireLogin: true,
                },
            },
            {
                path: "discover",
                name: "discover",
                component: discover,
                meta: {
                    requireLogin: true,
                },
            },
            {
                path: "hotmusic",
                name: "hotmusic",
                component: hotmusic,
                meta: {
                    requireLogin: true,
                },
            },
            {
                path: "searchMusic",
                name: "searchMusic",
                component: searchMusic,
            },
            {
                path: "loveSong",
                name: "loveSong",
                component: loveSong,
            },
            {
                path: "userRecord",
                name: "userRecord",
                component: userRecord,
            },
        ],
    },
    // {
    //     path: "/userRecord",
    //     name: "userRecord",
    //     component: userRecord,
    // },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

// 登录验证
router.beforeEach((to, from, next) => {
    next()
})
export default router