<template>
  <div>
      <el-breadcrumb class="mbx" separator-class="el-icon-arrow-right">
  <el-breadcrumb-item >概览</el-breadcrumb-item>
  <el-breadcrumb-item>项目进度</el-breadcrumb-item>
</el-breadcrumb>
      <h1 class="h1">Welcome To QingYuan</h1>
      <div class="steps">
         <el-steps :active="7" align-center>
        <el-step title="数据库创建"></el-step>
        <el-step title="用户表单规则编写"></el-step>
        <el-step title="数据表单规则编写"></el-step>
        <el-step title="token表单规则编写"></el-step>
        <el-step title="注册页面"></el-step>
        <el-step title="欢迎页面"></el-step>
        <el-step title="用户页面"></el-step>
        <el-step title="数据页面"></el-step>
      </el-steps>
      </div>
     
      <div class="container">
          <el-button title="跳转到用户列表页" @click="GTU">go to user</el-button>
          <el-button title="跳转到数据列表页" @click="GTD">go to data</el-button>
          <el-button title="跳转到用户优化页" @click="GTO">go to optimize</el-button>
      </div>
  </div>
</template>

<script>
export default {
    name:"WelCome",
    methods:{
      GTO:function(){
        this.$router.push("/optimize/data")
      },
      GTU:function(){
        this.$router.push("/user/find")
      },
      GTD:function(){
        this.$router.push("/data/find")
      }
    }
}
</script>

<style lang="less" scoped>
    .h1{
      text-align: center;
      color:skyblue;
      line-height: 100px;
    }
    .container{
      display: flex;
      margin-top: 200px;
      flex-direction: row;
      justify-content:space-around;
      .el-button{
        width: 300px;
        background-color: transparent;
        line-height: 40px;
        border:1px solid white;
        font-size: 20px;
        border-radius: 6px;
      }
    }
    .steps{
      margin: 100px auto;
    }
</style>