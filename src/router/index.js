import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from "@/views/login";
Vue.use(VueRouter)

const routes = [
  //路由配置
  {
    path: "/login",
    name: "login",
    // component: Login
    //路由懒加载  让路由一上来不是马上加载的，只需要加载当前页面的路由，大大提高性能
    component: () => import("@/views/login")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search")
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user")
  },
  {
    path:"/article/:articleId",
    name:"article",
    component:()=>import("@/views/article"),
    props:true  //开启路由传参
  },
  {
    path: "/",
    // component: Login
    //路由懒加载  让路由一上来不是马上加载的，只需要加载当前页面的路由，大大提高性能
    component: () => import("@/views/layout"),
    children: [
      {
        path: "", //默认子路由只能有一个
        component: () => import("@/views/home")
      },
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home")
      },
      {
        path: "/question",
        name: "question",
        component: () => import("@/views/question")
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/video")
      },
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my/my.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
})

export default router
