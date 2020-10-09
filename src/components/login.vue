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
// eslint-disable-next-line no-unused-vars
import axios from "axios";
export default {
    name:"Login",
    data(){
        return {
            //响应式数据
            formData:{
                userName:"13169427675",
                passWord:"999926"
            },
            //预验证规则
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
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
            window.sessionStorage.clear();
            this.$router.push("/signIn");
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
                //校验成功时、发起ajax请求校验账号密码
                //url封装
                let url = `/api/userlogin?user=${this.formData.userName}&password1=${this.formData.passWord}`;
                //发起get请求   
                axios.get(url).then((resData)=>{
                    //对返回的resData数据进行相关验证及处理
                    let reg = resData.data.token;
                    console.log("你的账号为",resData.data);
                    let username = resData.data.username;
                    if(reg==""){
                        this.$message({
                            type:"error",
                            message:"用户名或密码错误"
                        })
                    }else{
                        if(resData.data.state){
                        window.sessionStorage.setItem("token",reg);
                         window.sessionStorage.setItem("username",username);
                         window.sessionStorage.setItem("user",this.formData.userName);
                        this.$router.push("/index");
                        this.$message({
                            type:"success",
                            message:`登录成功、亲爱的${username}欢迎回来`
                        })}else{
                            this.$message({
                                type:"error",
                                message:"你的账号已禁用、请联系管理员处理！"
                            })
                        }

                    }
                })

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