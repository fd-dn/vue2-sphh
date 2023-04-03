<template>
  <el-card class="clears">
    <div class="textTap">
      <span>
      销售额类别占比
     </span>
      <el-radio-group v-model="tabPosition" size="mini" style="margin-bottom: 30px;">
        <el-radio-button label="top">全部渠道</el-radio-button>
        <el-radio-button label="right">线上</el-radio-button>
        <el-radio-button label="bottom">门店</el-radio-button>
      </el-radio-group>
    </div>
    <div id="main"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "rightCard",
  data(){
    return{
      tabPosition:'top'
    }
  },
  mounted() {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    var datas = [
      [
        { name: '视频广告', value: 850 },
        { name: '联盟广告', value: 540 },
        { name: '搜索引擎', value: 1011 },
        { name: '邮箱营销', value: 321 },
        { name: '地推营销', value: 1100 },
        { name: '其它形式', value: 537 }
      ],
    ];
    option = {
      title: {
        text: '视频广告',
        left: 'center',
        textStyle: {
          color: '#999',
          fontWeight: 'normal',
          fontSize: 20
        },
        subtext:850
      },
      series: datas.map(function (data, idx) {
        var top = idx * 33.3;
        return {
          type: 'pie',
          radius: ['35%','65%'],
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          label: {
            alignTo: 'edge',
            formatter: '{name|{b}}\n{time|{c}}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              time: {
                fontSize: 10,
                color: '#999'
              }
            }
          },
          labelLine: {
            length: 15,
            length2: 0,
            maxSurfaceAngle: 80
          },
          labelLayout: function (params) {
            const isLeft = params.labelRect.x < myChart.getWidth() / 2;
            const points = params.labelLinePoints;
            // Update the end point.
            points[2][0] = isLeft
              ? params.labelRect.x
              : params.labelRect.x + params.labelRect.width;
            return {
              labelLinePoints: points
            };
          },
          data: data
        };
      })
    };
    option && myChart.setOption(option);
    myChart.on('mouseover',  function (params) {
      const {name,value} = params.data;
      myChart.setOption({
        title:{
          text:name,
          subtext:value,
        }
      })
    });
  }
}
</script>

<style scoped>
.clears{
  margin-left: 6px;
  margin-top: 10px;
}
.textTap{
  display: flex;
  justify-content: space-between;
}
#main{
  margin: 0px auto;
  width: 60%;
  height: 310px;
}
</style>
