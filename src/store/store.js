import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex);
let store = new Vuex.Store({
    state: {
        //主页导航条激活栏目
        active: "/overview/welcome",
        //权限列表
        controlslist: [],
        //个人权限详情
        controllist: [] 
    },
    mutations: {
        //改变主页导航栏函数
        activefun: function (state, val) {
            state.active = val;
        },
        //权限列表
        controlslistfun: function (state, val) {
            state.controlslist = val;
            console.log(val);
        },
        //获取自己的权限并保存到浏览器
        retrueReg: function (state) {
            let data = state.controlslist;
            let reg = data.filter((item) => {
                //返回自己的权限
                return item.user == window.sessionStorage.getItem("user");
            })
            //保存到浏览器
            window.sessionStorage.setItem("myself", JSON.stringify(reg))


        }
    },
    getters: {},
    actions: {}
})
export default store;