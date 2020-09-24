import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/login.vue"
import SignIn from "../components/signIn.vue"
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
        }
    ]
})
export default router;