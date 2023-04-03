<template>
   <div>
     <el-button v-show="this.$store.state.user.buttons.indexOf('cuser.detail') != -1">
       按钮管理测试按钮1
     </el-button>
     <el-button v-show="this.$store.state.user.buttons.indexOf('cuser.details') != -1">
       按钮管理测试按钮2
     </el-button>
   </div>
</template>

<script>
export default {
  name: "Testing"
}
</script>

<style scoped>

</style>
