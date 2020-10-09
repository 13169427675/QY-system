<template>
  <el-container class="container">
    <!-- 头部区域 -->
    <el-header height="80px">
      <div class="logo_font">
        <div class="logo">
          <img
            src="../assets/images/love.png"
            width="100%"
            height="100%"
            alt=""
          />
        </div>
        <div class="font">
          <div class="username">小主：{{ username }}</div>
          <div class="date">{{ nowtime }}</div>
        </div>
      </div>
      <span>情缘管理系统</span>

      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <el-menu
          background-color="rgb(190,190,190)"
          text-color="rgb(100,100,100)"
          active-text-color="rgb(150,150,150)"
          unique-opened
          :collapse-transition="false"
          :collapse="open"
          router
          :default-active="active"
        >
          <el-submenu index="overview">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>概览</span>
            </template>
            <el-menu-item index="/overview/welcome">
              <template slot="title">
                <i class="el-icon-s-promotion"></i>
                <span>项目进度</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user/add">
              <template slot="title">
                <i class="el-icon-plus"></i>
                <span>添加用户</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/user/del">
              <template slot="title">
                <i class="el-icon-delete"></i>
                <span>删除用户</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/user/updata">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>修改用户数据</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/user/find">
              <template slot="title">
                <i class="el-icon-search"></i>
                <span>查询用户</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="data">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>用户数据</span>
            </template>
            <el-menu-item index="/data/add">
              <template slot="title">
                <i class="el-icon-plus"></i>
                <span>添加数据</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/data/del">
              <template slot="title">
                <i class="el-icon-delete"></i>
                <span>删除数据</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/data/updata">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>修改数据</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/data/find">
              <template slot="title">
                <i class="el-icon-search"></i>
                <span>查询数据</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="optimize">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>用户反馈</span>
            </template>

            <el-menu-item index="/optimize/data">
              <template slot="title">
                <i class="el-icon-s-promotion"></i>
                <span>优化建议</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/optimize/bug">
              <template slot="title">
                <i class="el-icon-chat-dot-round"></i>
                <span>BUG反馈</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="control">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>权限控制</span>
            </template>

            <el-menu-item index="/control/user">
              <template slot="title">
                <i class="el-icon-s-promotion"></i>
                <span>用户权限</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容显示区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";
export default {
  name: "Index",
  data: function () {
    return {
      username: "",
      nowtime: "",
      open: false,
    };
  },
  created: function () {
    this.username = window.sessionStorage.getItem("username");
  },
  mounted: function () {
    //登录成功格式化时间
    this.setdate();
    //登录成功后获取用户的权限列表存储在vuex里
    axios.get("/api/controlall").then((data)=>{
      console.log(data.data);
      this.$store.commit("controlslistfun",data.data);
    })
    //获取自己的权限
    if(!window.sessionStorage.getItem("myself")){
    this.$store.commit("retrueReg");}
  
  },
  computed:{
    ...mapState(["active"])
  },
  methods: { 

    //监听退出按钮、退出后清除token并跳转到登录界面
    loginOut: function () {
      let token = window.sessionStorage.getItem("token");
      //清除数据库的token
      axios.post("/api/tokendel", { token: token }).then((data) => {
        let resule = data.data.result;
        console.log(data.data);
        if (resule == "true") {
          //清除本地的token
          window.sessionStorage.clear();
          //跳转登录界面
          this.$router.push("/login");
        } else {
          console.log("数据库数据未删除");
        }
      });
    },
    //主页显示时间的函数
    setdate: function () {
      setInterval(() => {
        let date = new Date();
        let x = date.toLocaleDateString();
        let h = date.getUTCHours() + 8;
        let m = date.getMinutes();
        let min = date.getSeconds();
        if (m < 10) {
          m = "0" + m;
        }
        if (min < 10) {
          min = "0" + min;
        }
        if (h >= 24) {
          h = h - 24;
          if (h == 0) {
            h = "0" + 0;
          }
        }
        this.$data.nowtime = `${x}  ${h}:${m}:${min}`;
      }, 1000);
    },


  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(180, 180, 180);
    border-bottom: 1px solid #666;
    span {
      display: block;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 28px;
    }
    .logo_font {
      display: flex;
      width: 400px;
      height: 80px;
      .logo {
        box-sizing: border-box;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid red;
      }
      .font {
        width: 320px;
        height: 80px;
        .username,
        .date {
          box-sizing: border-box;
          width: 100%;
          height: 40px;
          line-height: 40px;
          font-size: 20px;
          padding-left: 20px;
          letter-spacing: 3px;
        }
        .date {
          line-height: 30px;
          letter-spacing: 1px;
        }
      }
    }
  }
  .el-aside {
    background-color: rgb(190, 190, 190);
    border-right: 1px solid #666;
    overflow: hidden;
    .close {
      height: 30px;
      background-color: skyblue;
      text-align: center;
      line-height: 30px;
    }
  }
  .el-main {
    background-color: rgb(210, 210, 210);
  }
}
</style>