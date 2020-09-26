import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/login.vue"
import SignIn from "../components/signIn.vue"
import Index from "../components/index.vue"
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
            component:Index
        }
    ]
})
// eslint-disable-next-line no-unused-vars
router.beforeEach((to,from,next)=>{
    if(to.path =="/login" |to.path == "/signIn"){
        next();
    }else{
        let token = window.sessionStorage.getItem("token");
        console.log(token)
        if(token){
            next();
        }else{
            next("/login")
        }
    }
})
export default router; 