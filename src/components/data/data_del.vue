<template>
  <div class="not">页面已禁用</div>
</template>

<script>
export default {
  name: "Data_del",
  //当页面加载时弹窗跳转
  mounted: function () {
    this.$alert(
      "数据一旦建立、无法删除(若涉及隐私、请联系开发者)！点确定跳转至首页。",
      "error",
      {
        confirmButtonText: "确定",
        callback: () => {
          this.$router.push("/overview/welcome");
          this.$store.commit("activefun", "/overview/welcome");
        },
      } 
    );
  },
};
</script>

<style scoped>
.not {
  font-size: 100px;
  text-align: center;
  margin-top: 50px;
  color: grey;
}
</style>