<template>
  <div class="login_container">
      <div class="container_box">
          <!-- 注册标题 -->
          <div class="signTitle">注册</div>
          <!-- form表单内容 -->
          <el-form :model="formData" :rules="rules" class="signform" label-width="90px" ref="signIn">
              <el-form-item label="用户名" prop="user">
                  <el-input v-model="formData.user" clearable placeholder="请输入你的用户名"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="username">
                  <el-input v-model="formData.username" clearable placeholder="请输入你的昵称"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password1">
                  <el-input ref="psw1" v-model="formData.password1" show-password placeholder="请输入你的密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password2">
                  <el-input ref="psw2" v-model="formData.password2" type="password" show-password placeholder="请确认密码"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="tel">
                  <el-input v-model="formData.tel" clearable placeholder="请输入你的联系方式"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱" prop="email">
                  <el-input v-model="formData.email" clearable placeholder="请输入你的电子邮箱"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                  <el-input v-model="formData.name" clearable placeholder="请输入你的真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="身份证" prop="idcard">
                  <el-input v-model="formData.idcard" clearable placeholder="请输入你的身份证信息"></el-input>
              </el-form-item>
            <!-- 按钮区域 -->
              <el-row class="flexbt">
                  <el-button @click="signInTop">注册</el-button>
                  <el-button @click="loginTop">取消</el-button> 
              </el-row>
          </el-form>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name:"SignIn",
    data(){
        //预验证validator的处理函数
        let userReg =(rule,val,callback)=>{ 
            let reg = /^[-_a-zA-Z0-9]{4,16}$/;
            if(!reg.test(val)){
                callback(new Error("请输入4到16位，字母数字下划线"))
            }else{
                callback()
            }
        }
        let emailReg = (rule,val,callback)=>{
            let reg = /^[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}$/;
            if(reg.test(val)){
                callback();
            }else{
                callback(new Error("请正确输入电子邮箱、格式为：xxxxxxxx@xx.xxx"));
            }
        }
        // eslint-disable-next-line no-unused-vars
        let passwordReg = (rule,val,callback)=>{
            console.log(rule.field);
            let a = this.$refs.psw1.value;
            let b = this.$refs.psw2.value;
            if(a==""|b==""){
                callback();
            }else{
                if(a==b){
                    callback();
                }else{
                    callback(new Error("两次密码不一致"));
                }
            }
        }
        let idcardReg = (rule,val,callback)=>{
            let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            if(reg.test(val)){
                callback();
            }else{
                callback(new Error("请输入正确的身份证信息"));
            }
        }
        let telReg = (rule,val,callback)=>{
            let reg = /^1(3[0-9]|bai5[189]|8[6789])[0-9]{8}$/;
            if(reg.test(val)){
                callback();
            }else{
                callback(new Error("请输入正确的手机号码"));
            }
        }
        return {
            //响应式数据
           formData:{
               user:"13169427675",
               username:"临萱",
               password1:"999926",
               password2:"999926",
               tel:"13169427675",
               email:"997884551@qq.com",
               name:"林利军",
               idcard:"440223199604093710" 
           },
           //预验证规则
           rules:{
               user:[
                   {required:true,message:"该项为必填项",trigger:"blur"},
                   {validator:userReg}
               ],
               username:[
                   {required:true,message:"该项为必填项",trigger:"blur"}
               ],
               password1:[
                   {required:true,message:"该项为必填项",trigger:"blur"},
                   {validator:passwordReg,trigger:"blur"}
               ],
               password2:[
                   {required:true,message:"该项为必填项",trigger:"blur"},
                    {validator:passwordReg,trigger:"blur"}
               ],
               tel:[
                   {required:true,message:"该项为必填项",trigger:"blur"},
                   {validator:telReg}
               ],
               email:[
                   {required:true,message:"该项为必填项",trigger:"blur"},
                   {validator:emailReg}
               ],
               name:[
                   {required:true,message:"该项为必填项",trigger:"blur"}
               ],
               idcard:[
                   {required:true,message:"该项为必填项",trigger:"blur"},
                   {validator:idcardReg}
               ],
           }
        }
    },
    methods:{
        //取消注册、跳转至登录界面
        loginTop:function(){
           this.$router.push("/login");
        },
        //点击注册后的处理函数
        signInTop:function(){
            let signInObj = this.$refs.signIn;
            //form表单是否通过预验证处理
            signInObj.validate((result)=>{
                if(result){
                    console.log("我发起了post请求");
                    axios.post("/api/add",this.formData).then((res)=>{
                        let result = res.data.create;
                        if(result =="false"){
                            this.formData.user = "";
                            this.$message({
                                type:"error",
                                message:"用户名已存在、请重新输入"
                            })
                        }else{
                            this.$message({
                                type:"success",
                                message:"账号注册成功、欢迎加入情缘大家庭！"
                            })
                            this.$router.push("/login");
                        }
                    })
                   

                }else{
                    this.$message({
                        type:"error",
                        message:"信息校验不成功！"
                    })
                }
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