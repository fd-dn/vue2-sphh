<template>
  <el-row>
    <el-col :span="6">
      <el-card class="item">
        <item title="总销售额" count="￥11800">
          <template slot="charts">
            <span class="text">
              周同比&nbsp;&nbsp;&nbsp;56.67%
              <svg t="1667639709509" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10053" width="14" height="14"><path d="M255.998 488.11h167.253l0.909 322.563h166.4v-322.56l167.253 0.455L506.819 165.61l-250.821 322.5z" fill="#1296DB" p-id="10054"></path></svg>
            </span>
            <span class="text">
              日同比&nbsp;&nbsp;&nbsp;18.12%
              <svg t="1667639742893" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11083" width="14" height="14"><path d="M768.002 535.89H600.749l-0.909-322.563h-166.4v322.56l-167.253-0.455L517.181 858.39l250.821-322.5z" fill="#FD3333" p-id="11084"></path></svg>
            </span>
          </template>
          <template slot="footer">
            <div class="text2">日销售额 ￥18520</div>
          </template>
        </item>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="item">
        <item title="总访问量" count="8800">
          <template slot="charts">
           <line-charts></line-charts>
          </template>
          <template slot="footer">
            <div class="text2">日访问量 18021</div>
          </template>
        </item>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="item">
        <item title="支付笔数" count="9800">
          <template slot="charts">
            <car-charts></car-charts>
          </template>
          <template slot="footer">
            <div class="text2">转化率 65%</div>
          </template>
        </item>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="item">
        <item title="运营活动效果" count="80%">
          <template slot="charts">
            <char-charts></char-charts>
          </template>
           <template slot="footer">
             <div class="text2">
               <span>
              周同比&nbsp;&nbsp;&nbsp;13.73%
              <svg t="1667639742893" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11083" width="14" height="14"><path d="M768.002 535.89H600.749l-0.909-322.563h-166.4v322.56l-167.253-0.455L517.181 858.39l250.821-322.5z" fill="#FD3333" p-id="11084"></path></svg>
            </span>
               <span>
              日同比&nbsp;&nbsp;&nbsp;10.28%
             <svg t="1667639709509" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10053" width="14" height="14"><path d="M255.998 488.11h167.253l0.909 322.563h166.4v-322.56l167.253 0.455L506.819 165.61l-250.821 322.5z" fill="#1296DB" p-id="10054"></path></svg>
            </span>
             </div>
           </template>
        </item>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import item from './item/item';
import lineCharts from "@/views/dashboard/car/lineCharts";
import carCharts from "@/views/dashboard/car/carCharts";
import charCharts from "@/views/dashboard/car/charCharts";
export default {
  name: "car",
  components:{
    item,
    lineCharts,
    carCharts,
    charCharts
  }
}
</script>

<style>
.text{
  font-size: 14px;
}
.text2{
  margin-top: 10px;
  font-size: 14px;
}
.item{
  margin-left: 6px;
}

</style>
