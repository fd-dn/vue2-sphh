<template>
  <el-row>
    <el-col :span="12">
      <left-card></left-card>
    </el-col>
    <el-col :span="12">
      <right-card></right-card>
    </el-col>
  </el-row>
</template>

<script>
import leftCard from "@/views/dashboard/Observe/leftCard/leftCard";
import rightCard from "@/views/dashboard/Observe/rightCard/rightCard";
export default {
  name: "Observe",
  components:{
    leftCard,
    rightCard
  }
}
</script>

<style scoped>
</style>
