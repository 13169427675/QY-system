import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress"
import Login from "../components/login.vue"
import SignIn from "../components/signIn.vue"
import Index from "../components/index.vue"
import WelCome from "../components/overview/welcome.vue"
import axios from "axios";
import User_add from "../components/user/user_add.vue"
import User_updata from "../components/user/user_updata.vue"
import User_del from "../components/user/user_del.vue"
import User_find from "../components/user/user_find.vue"
import Data_updata from "../components/data/data_updata.vue"
import Data_find from "../components/data/data_find.vue"
import Data_add from "../components/data/data_add.vue"
import Data_del from "../components/data/data_del.vue"
import Optimize_data from "../components/optimize/optimize_data.vue"
import Optimize_bug from "../components/optimize/optimize_bug.vue"
import Controls from "../components/control/controls.vue"

Vue.use(VueRouter);
let router = new VueRouter({
    routes:[
        {
            path:"/",
            redirect:"/login"
        },
        {
            path:"/login",
            component:Login
        },{
            path:"/signIn",
            component:SignIn
        },{
            path:"/index",
            component:Index,
            redirect:"/overview/welcome",
            children:[
                {
                    path:"/overview/welcome",
                    component:WelCome
                },
                {
                    path:"/user/add",
                    component:User_add
                },
                {
                    path:"/user/del",
                    component:User_del
                },
                {
                    path:"/user/updata",
                    component:User_updata
                },
                {
                    path:"/user/find",
                    component:User_find
                },
                {
                    path:"/data/find",
                    component:Data_find
                },{
                    path:"/data/add",
                    component:Data_add
                },
                {
                    path:"/data/updata",
                    component:Data_updata
                },
                {
                    path:"/data/del",
                    component:Data_del
                },
                {
                    path:"/optimize/data",
                    component:Optimize_data
                },
                {
                    path:"/optimize/bug",
                    component:Optimize_bug
                },{
                    path:"/control/user",
                    component:Controls
                }
            ]
        }
    ]
})
// eslint-disable-next-line no-unused-vars
//导航守卫、每条导航必须经过导航守卫的处理
router.beforeEach((to,from,next)=>{
    NProgress.start();
    //登录与注册页面可以随意访问
    if(to.path =="/login" |to.path == "/signIn"){
        next();
    }else{
        //访问其他路径需要验证token
        //访问存储的token
        let token = window.sessionStorage.getItem("token");
        console.log("我是router",token);
        //发起请求验证token
        if(token){
                axios.get(`/api/tokenfind?token=${token}`).then((data)=>{
            if(data.data == ""){
                console.log("token验证失败、跳转至登录界面！");
                next("/login")
            }else{
                console.log("token存在、允许跳转");
                //根据路由设置主页导航条的高亮显示
                next();
            }
        })
        }else{
            console.log("token不存在、跳转至登录界面！");
                next("/login")
        }
    
    }
})
router.afterEach(()=>{
    NProgress.done();
})  
export default router; 