<template>
  <el-card class="clears">
    <div slot="header" class="clearfix">
      <sapn>线上热门搜索</sapn>
      <el-dropdown style="float: right; padding: 3px 0">
         <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right el-icon-more"    type="text"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-row>
      <el-col span="12" class="text">
        <div>
          <span>搜索用户数</span>
          <svg t="1667641364704" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7133" width="16" height="16"><path d="M512 960c-119.466667 0-232.533333-46.933333-315.733333-132.266667C110.933333 744.533333 64 631.466667 64 512c0-119.466667 46.933333-232.533333 132.266667-315.733333S392.533333 64 512 64c119.466667 0 232.533333 46.933333 315.733333 132.266667 85.333333 85.333333 132.266667 196.266667 132.266667 315.733333 0 119.466667-46.933333 232.533333-132.266667 315.733333-83.2 85.333333-196.266667 132.266667-315.733333 132.266667z m0-853.333333c-108.8 0-209.066667 42.666667-285.866667 119.466666C149.333333 302.933333 106.666667 403.2 106.666667 512s42.666667 209.066667 119.466666 285.866667C302.933333 874.666667 403.2 917.333333 512 917.333333s209.066667-42.666667 285.866667-119.466666C874.666667 721.066667 917.333333 620.8 917.333333 512s-42.666667-209.066667-119.466666-285.866667C721.066667 149.333333 620.8 106.666667 512 106.666667z" p-id="7134"></path><path d="M512 245.333333c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666667-42.666667-19.2-42.666667-42.666667 19.2-42.666667 42.666667-42.666667zM522.666667 746.666667c-12.8 0-21.333333-8.533333-21.333334-21.333334V448h-21.333333c-12.8 0-21.333333-8.533333-21.333333-21.333333s8.533333-21.333333 21.333333-21.333334h42.666667c12.8 0 21.333333 8.533333 21.333333 21.333334v298.666666c0 12.8-8.533333 21.333333-21.333333 21.333334z" p-id="7135"></path><path d="M597.333333 746.666667h-149.333333c-12.8 0-21.333333-8.533333-21.333333-21.333334s8.533333-21.333333 21.333333-21.333333h149.333333c12.8 0 21.333333 8.533333 21.333334 21.333333s-8.533333 21.333333-21.333334 21.333334z" p-id="7136"></path></svg>
        </div>
        <div class="items">
          <span id="shang">12312</span>
          <sapn>17.1</sapn>
          <svg t="1667639709509" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10053" width="14" height="14"><path d="M255.998 488.11h167.253l0.909 322.563h166.4v-322.56l167.253 0.455L506.819 165.61l-250.821 322.5z" fill="#1296DB" p-id="10054"></path></svg>
        </div>
        <div class="chars" ref="chars"></div>
        <el-table
          style="width: 100%"
          empty-text="."
        >
          <el-table-column
            label="周涨幅"
            sortable
            width="150">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col span="12" class="text">
        <div>
          <span>人均搜索次数</span>
          <svg t="1667641364704" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7133" width="16" height="16"><path d="M512 960c-119.466667 0-232.533333-46.933333-315.733333-132.266667C110.933333 744.533333 64 631.466667 64 512c0-119.466667 46.933333-232.533333 132.266667-315.733333S392.533333 64 512 64c119.466667 0 232.533333 46.933333 315.733333 132.266667 85.333333 85.333333 132.266667 196.266667 132.266667 315.733333 0 119.466667-46.933333 232.533333-132.266667 315.733333-83.2 85.333333-196.266667 132.266667-315.733333 132.266667z m0-853.333333c-108.8 0-209.066667 42.666667-285.866667 119.466666C149.333333 302.933333 106.666667 403.2 106.666667 512s42.666667 209.066667 119.466666 285.866667C302.933333 874.666667 403.2 917.333333 512 917.333333s209.066667-42.666667 285.866667-119.466666C874.666667 721.066667 917.333333 620.8 917.333333 512s-42.666667-209.066667-119.466666-285.866667C721.066667 149.333333 620.8 106.666667 512 106.666667z" p-id="7134"></path><path d="M512 245.333333c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666667-42.666667-19.2-42.666667-42.666667 19.2-42.666667 42.666667-42.666667zM522.666667 746.666667c-12.8 0-21.333333-8.533333-21.333334-21.333334V448h-21.333333c-12.8 0-21.333333-8.533333-21.333333-21.333333s8.533333-21.333333 21.333333-21.333334h42.666667c12.8 0 21.333333 8.533333 21.333333 21.333334v298.666666c0 12.8-8.533333 21.333333-21.333333 21.333334z" p-id="7135"></path><path d="M597.333333 746.666667h-149.333333c-12.8 0-21.333333-8.533333-21.333333-21.333334s8.533333-21.333333 21.333333-21.333333h149.333333c12.8 0 21.333333 8.533333 21.333334 21.333333s-8.533333 21.333333-21.333334 21.333334z" p-id="7136"></path></svg>
        </div>
        <div class="items">
          <span id="shang">2.7</span>
          <sapn>26.2</sapn>
          <svg t="1667639742893" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11083" width="14" height="14"><path d="M768.002 535.89H600.749l-0.909-322.563h-166.4v322.56l-167.253-0.455L517.181 858.39l250.821-322.5z" fill="#FD3333" p-id="11084"></path></svg>
        </div>
        <line-charts></line-charts>
        <el-table
          style="width: 100%"

        >
          <el-table-column
            label="用户数"
            sortable
            width="150">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as echarts from 'echarts';
import lineCharts from "@/views/dashboard/car/lineCharts";
export default {
  name: "leftCard",
  components:{
    lineCharts
  },
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
          data:[15,24,30,18,25,40,22,33,42,28,25,30],
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
 .clears{
   margin-left: 6px;
   margin-top: 10px;
 }
 .text{

 }
 .text>div{
   display: flex;
 }
 .text span{
   line-height: 17px;
   margin-right: 10px;
 }
#shang{
  margin-right: 30px;
  font-size: 20px;
}
.items{
  margin-top: 16px;
}
.chars{
  width: 100%;
  height: 200px;
}
>>> .el-table th.is-leaf{
  border: none;
}
</style>
