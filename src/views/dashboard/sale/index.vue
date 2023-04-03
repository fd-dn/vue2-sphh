<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
<!--       @tab-click="handleClick"-->
      <el-tabs class="tag" v-model="activeName">
        <el-tab-pane label="销售额" name="sela"></el-tab-pane>
        <el-tab-pane label="访问量" name="fangNum"></el-tab-pane>
      </el-tabs>
      <div class="time">
        <span @click="setDay">今日</span>
        <span @click="setWeek">今周</span>
        <span @click="setMonth">今月</span>
        <span @click="setYear">今年</span>
      </div>
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="-"
          size="mini"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <el-row ref="elRow">
      <el-col :span="24"><div id="chartDom"></div></el-col>
<!--      <el-col :span="6"><div class="grid-content bg-purple-light">11</div></el-col>-->
    </el-row>
  </el-card>
</template>

<script>
import * as echarts from 'echarts';
import dayjs from 'dayjs';
export default {
  name: "sale",
  data(){
    return{
      activeName:'sela',
      value1:[],
      elRowWidth:0,
      title:'销售额趋势'
    }
  },
  mounted() {

    this. getCharts();
  },
  methods:{
    getCharts(){
      var chartDom = document.getElementById('chartDom');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title:{
          text:this.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220,100,400,321,111,245]
          }
        ]
      };
      option && myChart.setOption(option);
      //自适应
     // 当浏览器窗口调整到新的高度或宽度时，会触发resize事件
      window.addEventListener("resize", () => {
        // 执行echarts自带的resize方法，即可做到让echarts图表自适应
        myChart.resize();
      });
    },
    getCharts2(){
      var chartDom = document.getElementById('chartDom');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title:{
          text:this.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [1255,1201,2350,1400,1100,2231,1358,1158,894,925,855,604,1348]
          }
        ]
      };
      option && myChart.setOption(option);
      //自适应
      // 当浏览器窗口调整到新的高度或宽度时，会触发resize事件
      window.addEventListener("resize", () => {
        // 执行echarts自带的resize方法，即可做到让echarts图表自适应
        myChart.resize();
      });
    },
    setYear(){
      const start = dayjs().startOf('year').format('YYYY-MM-DD');
      const end = dayjs().endOf('year').format('YYYY-MM-DD');
      this.value1 = [start,end]
    },
    setDay(){
      const start = dayjs().format('YYYY-MM-DD');
      this.value1 = [start,start];
    },
    setWeek(){
      const start = dayjs().day(1).format('YYYY-MM-DD');
      const end = dayjs().day(7).format('YYYY-MM-DD');
      this.value1 = [start,end]
    },
    setMonth(){
      const start = dayjs().startOf('month').format('YYYY-MM-DD');
      const end = dayjs().endOf('month').format('YYYY-MM-DD');
      this.value1 = [start,end]
    }
  },
  watch:{
    activeName:{
      immediate : true,
      handler(){
        if(this.activeName == 'sela'){
            this.title = '销售额趋势';
            this.getCharts();
        }else {
          this.title = '访问量趋势';
          this.getCharts2();
        }
      }
    }
  }
}
</script>

<style scoped>
.box-card{
  margin-top: 10px;
  margin-left: 6px;
}
>>>.el-card__header{
  border-bottom: 0px;
}
.clearfix{
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
}
.tag{
  width: 100%;
}
.time{
  margin-left: -80%;
  display: flex;
}
.time>span{
  width: 40px;
  line-height: 30px;
  z-index: 100000;
  cursor: pointer;
}
.block{
  position: absolute;
  top: 0;
  left: 70%;
}
#chartDom{
  width: 100%;
  height: 300px;
}
</style>
