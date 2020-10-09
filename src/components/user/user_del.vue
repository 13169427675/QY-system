<template>
  <div class="not">
      页面已弃用
  </div>
</template>

<script>
export default {
    name:"User_del",
    //当页面加载时弹窗跳转页面
    mounted:function() {
      this.$alert('页面功能已移至用户列表页！点确定跳转至数据列表。', 'error', {
          confirmButtonText: '确定',
          callback: () => {
            this.$router.push("/user/find");
            
          }
        });}
}
</script>

<style scoped>
  .not{
    font-size: 100px;
    text-align: center;
    margin-top: 50px;
    color:grey;
  }
</style>