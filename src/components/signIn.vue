<template>
  <div class="login_container">
      <div class="container_box">
          <!-- 注册标题 -->
          <div class="signTitle">注册</div>
          <el-form class="signform" label-width="80px">
              <el-form-item label="用户名">
                  <el-input  clearable></el-input>
              </el-form-item>
              <el-form-item label="密码">
                  <el-input  show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                  <el-input type="password" show-password></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                  <el-input clearable></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱">
                  <el-input  clearable></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                  <el-input clearable></el-input>
              </el-form-item>
              <el-form-item label="身份证">
                  <el-input clearable></el-input>
              </el-form-item>
              <el-row class="flexbt">
                  <el-button size="medium">注册</el-button>
                  <el-button @click="loginTop">取消</el-button>
              </el-row>
          </el-form>
      </div>
  </div>
</template>

<script>
export default {
    name:"SignIn",
    data(){
        return {
           
        }
    },
    methods:{
        loginTop:function(){
            this.$router.push("/login");
        }
    }
}
</script>

<style lang="less" scoped>
   .login_container{
        width: 100%;
        height: 100%;
        background-image: url("../assets/images/login_bg.jpg");
        background-size:  100% 100%;
        background-color: powderblue;
        .container_box{
            position: relative;
            width: 700px;
            height:760px;
            left:50%;
            top: 50%;
            transform: translate(-50%,-50%);
            border-radius: 18px;
            background-color: rgba(255,255,255,.8);
            .signTitle{
                line-height: 100px;
                font-size: 32px;
                text-align: center;
                letter-spacing: 20px;
                border-bottom:1px solid #666;
            }
            .signform{
                box-sizing: border-box;
                padding:30px;
                .flexbt{
                display: flex;
                justify-content: space-around;
            }
            }
        }
   }
</style>