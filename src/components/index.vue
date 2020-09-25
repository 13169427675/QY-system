<template>
  <el-container class="container">
    <!-- 头部区域 -->
    <el-header height="80px">
      <div class="img">
        <img src="../assets/images/love.png" height="100%" alt="" srcset="" />
      </div>
      <span>情缘管理系统</span>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px" >
        <el-menu
          background-color="rgb(190,190,190)"
          text-color="rgb(100,100,100)"
          active-text-color="rgb(150,150,150)"
        >
           <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
                <template slot="title">
                    <i class="el-icon-plus"></i>
                    <span>添加用户</span>
                </template>
              </el-menu-item>
            <el-menu-item index="1-2">
                <template slot="title">
                    <i class="el-icon-delete"></i>
                    <span>删除用户</span>
                </template>
            </el-menu-item>
            <el-menu-item index="1-3">
                 <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>修改用户数据</span>
                </template>
            </el-menu-item>
            <el-menu-item index="1-4">
                 <template slot="title">
                    <i class="el-icon-search"></i>
                    <span>查询用户</span>
                </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>用户数据</span>
            </template>
            <el-menu-item index="2-1">
                <template slot="title">
                    <i class="el-icon-plus"></i>
                    <span>添加数据</span>
                </template>
              </el-menu-item>
            <el-menu-item index="2-2">
                <template slot="title">
                    <i class="el-icon-delete"></i>
                    <span>删除数据</span>
                </template>
            </el-menu-item>
            <el-menu-item index="2-3">
                 <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>修改数据</span>
                </template>
            </el-menu-item>
            <el-menu-item index="2-4">
                 <template slot="title">
                    <i class="el-icon-search"></i>
                    <span>查询数据</span>
                </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>用户反馈</span>
            </template>
            
            <el-menu-item index="3-1">
                 <template slot="title">
                    <i class="el-icon-s-promotion"></i>
                    <span>优化建议</span>
                </template>
            </el-menu-item>
            <el-menu-item index="3-2">
                 <template slot="title">
                    <i class="el-icon-chat-dot-round"></i>
                    <span>BUG反馈</span>
                </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容显示区域 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Index",
  methods:{
      loginOut:function(){
          //退出后清除token并跳转到登录界面
          window.sessionStorage.clear();
          this.$router.push("/login")
      }
  }
};
</script>

<style lang="less" scoped>
.container {
    height: 100%;
    .el-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(180,180,180);
        border-bottom:1px solid #666;
    .img {
        width: 80px;
        height: 80px;
        padding: 3px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 1px solid pink;
    }
    span {
        padding-left: 20px;
        font-size: 28px;
    }
  }
    .el-aside {
        background-color: rgb(190,190,190);
        border-right:1px solid #666;
  }
    .el-main {
        background-color: rgb(210,210,210);
    }
}
</style>