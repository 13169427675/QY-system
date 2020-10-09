<template>
  <div class="login_container">
    <el-breadcrumb class="mbx" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/overview/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>用户数据</el-breadcrumb-item>
      <el-breadcrumb-item>添加数据</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container_box">
      <!-- 注册标题 -->
      <div class="signTitle">添加数据</div>
      <!-- form表单内容 -->
      <el-form
        :model="formData"
        :rules="rules"
        class="signform"
        label-width="90px"
        ref="signIn"
      >
        <el-form-item label="事件标题" prop="title">
          <el-input
            v-model="formData.title"
            clearable
            placeholder="要记录的事件标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="心理状态" prop="mood">
          <el-input
            v-model="formData.mood"
            clearable
            placeholder="记录时的心里状态"
          ></el-input>
        </el-form-item>
        <el-form-item label="发表日期" prop="date">
          <el-input
            v-model="formData.date"
            placeholder="请输入xxxx-xx-xx格式的日期、不输入默认为当前时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <el-input
            v-model="formData.content"
            type="textarea"
            :rows="6"
            placeholder="请输入事件描述····"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-row class="flexbt">
          <el-button @click="signInTop">添加</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";
export default {
  name: "Sign",
  data() {
    let dateReg = (rule, val, callback) => {
      let reg = /^2{1}0{1}2{1}\d{1}-(1|0){1}\d{1}-(1|2|3|0)\d{1}/;
      if (reg.test(val)|val=="") {
        callback();
      } else {
        callback(new Error("请输入正确的日期格式"));
      }
    };
    return {
      //响应式数据
      formData: {
        title: "123",
        content: "123",
        mood: "123",
        date: "",
      },
      //预验证规则
      rules: {
        title: [{ required: true, message: "该项为必填项", trigger: "blur" }],
        content: [{ required: true, message: "该项为必填项", trigger: "blur" }],
        mood: [{ required: true, message: "该项为必填项", trigger: "blur" }],
        date: [
          { validator: dateReg },
        ],
      },
    };
  },
  methods: {
    //点击注册后的处理函数
    signInTop: function () {
      let signInObj = this.$refs.signIn;
      //form表单是否通过预验证处理
      signInObj.validate((result) => {
        if (result) {
          console.log("我发起了post请求");
          let datas ={
            title:this.$data.formData.title,
            mood:this.$data.formData.mood,
            content:this.$data.formData.content,
            date:this.$data.formData.date,
            user:window.sessionStorage.getItem("user"),
            username:window.sessionStorage.getItem("username")
          }
          axios.post("/api/dataadd", datas).then((res) => {
            let result = res.data.status;
            if (result) {
              this.$message({
                type: "success",
                message: "事件添加成功",
              });
              //用户添加成功后移除表单数据
              this.$refs.signIn.resetFields();
            } else {
              this.$message({
                type: "error",
                message: "服务器原因导致事件添加失败、请稍后重试！",
              });
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "信息校验不成功！",
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
  // background-image: url("../../assets/images/login_bg.jpg");
  background-size: 100% 100%;
  // background-color: powderblue;
  .container_box {
    position: absolute;
    width: 700px;
    height: 760px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 18px;
    background-color: rgba(255, 255, 255, 0.8);
    .signTitle {
      line-height: 100px;
      font-size: 32px;
      text-align: center;
      letter-spacing: 20px;
      border-bottom: 1px solid #666;
    }
    .signform {
      box-sizing: border-box;
      padding: 30px;
      .flexbt {
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>