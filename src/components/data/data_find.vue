<template>
  <div>
    <el-breadcrumb class="mbx" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/overview/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>用户数据</el-breadcrumb-item>
      <el-breadcrumb-item>查询数据</el-breadcrumb-item>
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
        ><el-button type="primary" @click="find_data">搜索</el-button></el-col
      >
    </el-row>
    <el-table :data="datalist" stripe style="width: 100%">
      <el-table-column type="index" label="序列" width="100px">
      </el-table-column>
      <el-table-column prop="title" label="事件标题"> </el-table-column>
      <el-table-column prop="user" label="用户名"> </el-table-column>
      <el-table-column prop="username" label="创建人"> </el-table-column>
      <el-table-column prop="mood" label="心情"></el-table-column>
      <el-table-column prop="date" label="创建时间" sortable></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="change(scope.row)" size="mini">信息修改</el-button>
          <el-button @click="hide(scope.row)" size="mini">详细信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
    <!-- 查看详情 -->
    <el-dialog
      title="事件详情"
      :visible.sync="centerDialogVisible"
      width="50%"
      class="alert"
      center
    >
      <div><b>事件标题：</b>{{ content.title }}</div>
      <div><b>发表昵称：</b>{{ content.username }}</div>
      <div><b>发表账号：</b>{{ content.user }}</div>
      <div><b>发表时间：</b>{{ content.date }}</div>
      <div><b>当时状态：</b>{{ content.mood }}</div>
      <div><b>发表内容：</b>{{ content.content }}</div>
    </el-dialog>
    <!-- 修改事件 -->
    <el-dialog
      title="修改数据"
      :visible.sync="centerchange"
      width="50%"
      class="alert"
      center
    >
      <div
        style="
          text-align: center;
          font-size: 10px;
          line-height: 10px;
          color: red;
          margin-bottom: 10px;
        "
      >
        只允许修改部分数据
      </div>
      <el-form :model="content" label-width="90px">
        <el-form-item label="事件标题">
          <el-input v-model="content.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="发表昵称">
          <el-input v-model="content.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="发表账号">
          <el-input v-model="content.user" disabled></el-input>
        </el-form-item>
        <el-form-item label="发表时间">
          <el-input v-model="content.date" disabled></el-input>
        </el-form-item>
        <el-form-item label="发表状态">
          <el-input v-model="content.mood" clearable disabled></el-input>
        </el-form-item>
        <el-form-item label="发表内容">
          <el-input
            v-model="content.content"
            rows="8px"
            clearable
            type="textarea"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-row>
          <el-button
            style="
              width: 100%;
              line-height: 38px;
              font-size: 24px;
              letter-spacing: 12px;
            "
            type="success"
            @click="postdata"
            >提交</el-button
          >
        </el-row>
      </el-form>
    </el-dialog>
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
      //详细信息开关
      centerDialogVisible: false,
      //修改内容开关
      centerchange: false,
      //详细信息内容
      content: {},
    };
  },
  //在这个周期函数发起请求、获取用户的最大数目
  created: function () {
    axios.get("/api/datafinds").then((data) => {
      this.$data.listlen = data.data.length;
      console.log(data);
    });
  },
  //发起请求更新页面的初次渲染
  mounted: function () {
    this.getdata();
  },
  methods: {
    //请求封装
    getdata: function () {
      axios
        .get(
          `/api/datafind?limit=${this.$data.size}&begin=${
            (this.$data.page - 1) * this.$data.size
          }`
        )
        .then((data) => {
          this.$data.datalist = data.data;
          // this.$data.listlen = data.data.length;
          console.log("我获取了数据", data.data);
        });
    },
    //当每页显示数据改变时触发、并重新渲染
    handleSizeChange: function (v) {
      this.$data.size = v;
      this.getdata();
    },
    //当所在页改变时触发、并重新渲染
    handleCurrentChange: function (v) {
      this.$data.page = v;
      this.getdata();
    },
    //查找指定用户
    find_data: function () {
      if (this.$data.finduser) {
        axios.get(`/api/datafinds?user=${this.$data.finduser}`).then((data) => {
          this.$data.datalist = data.data;
          this.$data.listlen = data.data.length;
        });
      } else {
        this.getdata();
        axios.get("/api/datafind").then((data) => {
          this.$data.listlen = data.data.length;
        });
      }
    },

    hide: function (val) {
      this.$data.centerDialogVisible = !this.$data.centerDialogVisible;
      this.$data.content = val;
    },
    change: function (val) {
      this.$data.centerchange = !this.$data.centerchange;
      this.$data.content = val;
    },
    postdata: function () {
      let myself = JSON.parse(window.sessionStorage.getItem("myself"));
      if (myself[0].change) {
        axios.post("/api/dataupdata", this.$data.content).then((data) => {
          if (data.data.status) {
            this.$data.centerchange = !this.$data.centerchange;
            this.$message({
              type: "success",
              message: "数据更新成功！",
            });
          } else {
            this.$message({
              type: "error",
              message: "数据更新失败！",
            });
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "你没有权限修改数据",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.alert {
  div {
    line-height: 50px;
    font-size: 22px;
  }
}
</style>