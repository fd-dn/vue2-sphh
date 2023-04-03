<template>
  <div class="chars" ref="chars"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "charCharts",
  mounted() {
    //初始化echars实例
    let lineCharts = echarts.init(this.$refs.chars);
    //配置数据
    lineCharts.setOption({
      xAxis:{show:false,min:0,max:100},
      yAxis:{show:false,type:'category'},
      series:[
        {
          smooth:true,  //设置弧形
          type:'bar',
          data:[80],
          //设置宽度不再自适应
          barWidth:10,
          color:'yellowgreen',
          //背景颜色设置
          showBackground:true,
          backgroundStyle:{
            color:'#eee'
          },
          //文本设置
          label:{
            show:true,
            formatter:'|',
            position:'right'
          }
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
