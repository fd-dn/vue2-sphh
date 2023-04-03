<template>
  <div class="chars" ref="chars"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "lineCharts",
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
           type:'line',
           data:[30,25,20,33,40,42,32,43,35,16,25,18],
           itemStyle:{opacity:0}, //拐点样式设置
           lineStyle:{color:'purple'}, //线条的样式
           areaStyle:{
             color:{
               type:"linear",
               x:0,y:0,
               x2:0,y2:1,
               colorStops:[
                 {
                   offset:0,   //百分之0
                   color:"#d9b2d9"
                 },
                 {
                   offset:1,//百分之100
                   color:"#fff"
                 },
               ],
               global:false
             },
           },

         },
       ],
      tooltip:{}
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
