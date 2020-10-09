<template>
  <div>
    <el-breadcrumb class="mbx" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/overview/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="12"
        ><el-input
          v-model="finduser"
          placeholder="请输入要查找的用户名"
          prefix-icon="el-icon-search"
        ></el-input
      ></el-col>
      <el-col :span="4"
        ><el-button type="primary" @click="find_user">搜索</el-button></el-col
      >
    </el-row>
    <el-table :data="datalist" stripe style="width: 100%">
      <el-table-column type="index" label="序列" width="100px">
      </el-table-column>
      <el-table-column prop="user" label="用户名"> </el-table-column>
      <el-table-column prop="username" label="昵称"> </el-table-column>
      <el-table-column prop="tel" label="联系电话"> </el-table-column>
      <el-table-column label="账号状态">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="修改后保存生效"
            :enterable="false"
            placement="top"
          >
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-tooltip>

          {{ scope.row.state ? "已激活" : "已禁用" }}
        </template>
      </el-table-column>
      <el-table-column prop="time" label="创建时间" sortable> </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="change(scope.row.user, scope.row.state)"
            >保存</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="del(scope.row.user, scope.row.state)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listlen"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "User_find",
  data: function () {
    return {
      //请求的数据
      datalist: [],
      //数据长度
      listlen: 10,
      //当前页
      page: 1,
      //每页的长度
      size: 2,
      //从0 开始获取
      begin: 0,
      //搜索的用户名
      finduser: "",
      //权限是否更改(决定是否发起ajax请求更新数据)
      isupdata: "",
    };
  },
  //在这个周期函数发起请求、获取用户的最大数目
  created: function () {
    axios.get("/api/userall").then((data) => {
      this.$data.listlen = data.data.length;
    });
  },
  //发起请求更新页面的初次渲染
  mounted: function () {
    this.getuser();
  },
  methods: {
    //请求封装
    getuser: function () {
      axios
        .get(
          `/api/userall?limit=${this.$data.size}&begin=${
            (this.$data.page - 1) * this.$data.size
          }`
        )
        .then((data) => {
          this.$data.datalist = data.data;
        });
    },
    //当每页显示数据改变时触发、并重新渲染
    handleSizeChange: function (v) {
      this.$data.size = v;
      this.getuser();
    },
    //当所在页改变时触发、并重新渲染
    handleCurrentChange: function (v) {
      this.$data.page = v;
      this.getuser();
    },
    //监听数据的修改按钮
    change: function (x, y) {
      let myself = JSON.parse(window.sessionStorage.getItem("myself"));
      if (myself[0].forbidden) {
        if (y != this.$data.isupdata) {
          this.$data.isupdata = y;
          axios.post("/api/update", { user: x, state: y }).then((data) => {
            let result = data.data.status;
            let msg = y ? "当前用户已激活" : "当前用户已禁用";
            if (result == 200) {
              this.$message({
                type: "success",
                message: msg,
              });
            } else {
              this.$message({
                type: "error",
                message: "修改失败、请确认是否有权限！",
              });
            }
          });
        } else {
          this.$message({
            type: "error",
            message: `你没有做出修改操作`,
          });
        }
      } else {
        this.$message({
          type: "error",
          message: `你没有${y ? "激活" : "禁用"}用户的权限`,
        });
      }
    },
    //监听删除按钮
    del: function (val, state) {
      if (!state) {
        let myself = JSON.parse(window.sessionStorage.getItem("myself"));
        if (myself[0].del) {
          axios.get(`/api/del?user=${val}`).then((data) => {
            let result = data.data.status;
            console.log(result);
            if (result == 200) {
              //删除用户成功后重新获取权限列表
              axios.get("/api/controlall").then((data) => {
                this.$store.commit("controlslistfun", data.data);
              });
              this.$message({
                type: "success",
                message: "该用户已删除！",
              });
              this.getuser();
              this.$data.listlen -= 1;
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "您没有删除用户的权限！",
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "用户处于激活状态、不可执行删除操作！请先禁用。",
        });
      }
    },
    //查找指定用户
    find_user: function () {
      if (this.$data.finduser) {
        axios.get(`/api/finduser?user=${this.$data.finduser}`).then((data) => {
          this.$data.datalist = data.data;
          this.$data.listlen = data.data.length;
        });
      } else {
        this.getuser();
        axios.get("/api/userall").then((data) => {
          this.$data.listlen = data.data.length;
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>