import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login = () => import("views/login/Login");
const Home = () => import("views/home/Home");
const SuperUsers = () => import("views/superusers/SuperUsers");
const Users = () => import("views/users/Users");
const AllData = () => import("views/alldata/AllData");
const AllGuide = ()=>import("views/allguide/AllGuide")

const routes = [
  {
    path: "/home",
    component: Home,
    children: [
      { path: "superusers", component: SuperUsers },
      { path: "users", component: Users },
      { path: "alldata", component: AllData },
      {path:'guides',component:AllGuide}
    ],
    meta: {
      name: "guide后台管理"
    },
    redirect: "/home/superusers"
  },
  {
    path: "/login",
    component: Login,
    meta: {
      name: "登录"
    }
  },
  { path: "/", redirect: "/home" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//全局导航守卫 判断路由进入之前做的事情
router.beforeEach((to, from, next) => {
  //设置title 标题
  document.title = to.matched[0].meta.name;
  if (to.path === "/login") return next();
  let str = window.sessionStorage.getItem("token");
  if (!str) return next("/login");
  next();
});

export default router;
