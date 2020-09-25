<template>
  <div class="login_container">
      <!-- 表单布局盒子 -->
      <div class="container_box">
          <!-- 表单logo盒子 -->
          <div class="box_logo">

          </div> 
          <!-- 表单内容 -->
          <el-form :model="formData" ref="login" class="formStyle" :rules="rules">
              <el-form-item  prop="userName">
                  <el-input  type="text" placeholder="请输入用户名" v-model="formData.userName">
                      <i slot="prefix" class="iconfont icon-user"></i>
                  </el-input>
              </el-form-item>
               <el-form-item prop="passWord">
                  <el-input type="passWord"  placeholder="请输入密码" v-model="formData.passWord">
                      <i slot="prefix" class="iconfont icon-icon_password"></i>
                  </el-input>
              </el-form-item>
              <el-row class="flexbt">
                  <el-button @click="loginTop">登录</el-button>
                  <el-button @click="signTop">注册</el-button>
              </el-row>
          </el-form>
      </div>
     
  </div>
</template>

<script>
export default {
    name:"Login",
    data(){
        return {
            formData:{
                userName:"",
                passWord:""
            },
            rules: {
                userName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                passWord:[
                    {required:true,message:"密码不能为空",trigger:"blur"}
                ]
            }
        }
    },
    methods:{
        //点击注册时触发的函数
        signTop:function(){
            this.$router.push("/signIn")
        },
        //点击登录时触发的函数
        loginTop:function(){
            //获取form对象使用validate方法进行预校验
            let formObj = this.$refs.login;
            formObj.validate((resule)=>{
                //校验不通过时提醒失败
                if(!resule) return this.$message({
                    message:"用户名或密码错误",
                    type:"error"
                })
                //校验成功时跳转至主页
                this.$message({
                    message:"登录成功、欢迎回来！",
                    type:"success"
                })
                window.sessionStorage.setItem("token","926");
                this.$router.push("/index");
            })
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
            height:460px;
            left:50%;
            top: 50%;
            transform: translate(-50%,-50%);
            border-radius: 18px;
            background-color: rgba(255,255,255,.8);
            
            .box_logo{
                position: absolute;
                width: 180px;
                height: 180px;
                left: 50%;
                transform: translate(-50%,-50%);
                border-radius: 50%;
                background-color: white;
                background-image: url("../assets/images/love.png");
                background-size: 100% 100%;
            }

        }
        .formStyle{
            position: absolute;
            width: 100%;
            box-sizing: border-box;
            top: 140px;
            padding: 40px;
            .flexbt{
                display: flex;
                justify-content: space-around;
            }
        }
    }
</style>