<template>
  <div class="chars" ref="chars"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "carCharts",
  mounted() {
    //初始化echars实例
    let lineCharts = echarts.init(this.$refs.chars);
    //配置数据
    lineCharts.setOption({
      xAxis:{show:false,type:'category'},
      yAxis:{show:false},
      series:[
        {
          smooth:true,  //设置弧形
          type:'bar',
          data:[30,25,20,33,40,42,32,11,25,31,12,33],
          color:'cyan'
        },
      ],
      tooltip:{} //工具插件
    })
  }
}
</script>

<style scoped>
.chars{
  width: 100%;
  height: 100%;
}
</style>
