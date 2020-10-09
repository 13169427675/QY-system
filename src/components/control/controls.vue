<template>
  <div>
    <el-breadcrumb class="mbx" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/overview/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>权限控制</el-breadcrumb-item>
      <el-breadcrumb-item>用户权限</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="controlslist" stripe style="width: 100%">
      <el-table-column
        type="index"
        label="序列"
        width="100px"
      >
      </el-table-column>
      <el-table-column align="center" prop="user" label="用户名"> </el-table-column>
      <el-table-column align="center" label="控制表权限">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改后保存生效" :enterable="false" placement="top"> 
      <el-switch
            v-model="scope.row.control"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
    </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="数据修改权限">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改后保存生效" :enterable="false" placement="top"> 
      <el-switch
            v-model="scope.row.change"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
    </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="禁用权限">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改后保存生效" :enterable="false" placement="top"> 
      <el-switch
            v-model="scope.row.forbidden"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
    </el-tooltip>
        </template>  
      </el-table-column>
      <el-table-column align="center" label="删除权限">
           <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改后保存生效" :enterable="false" placement="top"> 
      <el-switch
            v-model="scope.row.del"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
    </el-tooltip>
        </template>  
      </el-table-column>
      <el-table-column align="center" prop="del" label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="control(scope.row)">保存</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import {mapState,mapMutations} from "vuex"
export default {
  name: "Controls",
  data:function(){
    return {
      //权限详情、用于对比权限是否更改，决定是否发起ajax请求
      controls:"",
    }
  },
  //判断是否有权限访问控制列表
  created:function(){
      let myself =JSON.parse(window.sessionStorage.getItem("myself"));
      if(!myself[0].control){
         this.$alert(
      "你好、你没有访问控制列表的权限！点击确定返回主页",
      "error",
      {
        confirmButtonText: "确定",
        callback: () => {
          this.$router.push("/overview/welcome");
          this.$store.commit("activefun", "/overview/welcome");
        },
      }
    );
      }
  },
  computed:{
    //获取vuex的权限列表
    ...mapState(["controlslist"])
  },
  methods:{
    //
    ...mapMutations(["retrueReg"]),
    //当点击修改按钮时触发更新函数
    control:function(val){
      //判断修改前后数据是否变化、无变化则不发起ajax请求
      if(this.$data.controls != val){
        //有变化则把变化后的权限数据重新赋值给controls 
        this.$data.controls = val;
        //权限变化发起更新数据请求
      axios.post("/api/controlupdata",val).then((data)=>{
        //判断请求返回值status、true则更新成功
        if(data.data.status){
        //当权限变更后重新获取权限       
          axios.get("/api/controlall").then((data)=>{
      console.log(data.data);
      this.$store.commit("controlslistfun",data.data);
    })
    //获取自己的权限
    this.$store.commit("retrueReg");

          this.$message({
            type:"success",
            message:"权限更新成功"
          })
        }else{
          //false则更新失败
          this.$message({
            type:"error",
            message:"服务器原因导致权限更新失败、请稍后再试！"
          })
        }
      })}else{
        //权限数据相同时不发送ajax请求、并给出提示
        this.$message({
            type:"error",
            message:"权限未修改"
          })
      }

    }
  }
};
</script>

<style>
</style>