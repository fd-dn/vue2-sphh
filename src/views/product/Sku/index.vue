<template>
  <div>
    <el-table :data="skuList" style="width: 100%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="skuName" label="名称" ></el-table-column>
      <el-table-column prop="skuDesc" label="描述" ></el-table-column>
      <el-table-column label="默认图片" >
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" width="80px" height="80px"/>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"></el-table-column>
      <el-table-column prop="price" label="价格" width="80"></el-table-column>
      <el-table-column prop="" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="success" icon="el-icon-upload2" size="mini" v-show="row.isSale == 0" @click="onSlae(row)"></el-button>
          <el-button type="success" icon="el-icon-download" size="mini"  v-show="row.isSale" @click="xiajia(row)"></el-button>
          <el-button type="primary"  icon="el-icon-edit" size="mini" @click="chakan"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="getSku(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:20px;textAlign:center" :total="total" :current-page="page" :page-size="limit"
                   :page-sizes="[3,5,10]" @current-change="handleChange" @size-change="handleSizeChange"
                   layout="prev,pager,next,jumper,->,sizes,total">
    </el-pagination>

    <!--     抽屉-->
    <el-drawer
      :visible.sync="drawer"
      size="40%"
      :show-close="false"
      @close="close"
    >
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">名称</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light">{{skuInfo.skuName}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">描述</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light">{{skuInfo.skuDesc}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">价格</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light">{{skuInfo.price}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">平台属性</div></el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
          <el-tag v-for="attr in skuInfo.skuAttrValueList" :key="attr.id">{{attr.skuId}} - {{attr.attrId}}</el-tag>
         </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">商品图片</div></el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <div class="block">
              <span class="demonstration">图片展示</span>
              <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                  <img :src="item.imgUrl"/>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import {getSkuBy} from "@/api/product/sku";

export default {
   name:'suk',
   data(){
     return{
       skuList:[],
       page:1,
       limit:10,
       total:0,
       skuInfo:[],
       drawer:false
     }
  },
  mounted(){
     this.getSkuList(this.page,this.limit);
  },
  methods:{
     async getSkuList(page,limit){
        let requt =  await this.$API.sku.getSkuList(page,limit);
        if(requt.code == 200){
          this.skuList = requt.data.records ;
          this.total = requt.data.total;
        }
    },
    //分页器页码发生改变
    handleChange(page){
      this.page = page;
      this.getSkuList(this.page,this.limit);
    },
    //每页展示的数据数据条数发生改变
    handleSizeChange(limit){
      this.limit = limit;
      this.getSkuList(this.page,this.limit);
    },
    //上传
     async onSlae(row){
       let requt =  await this.$API.sku.onSale(row.id);
       if(requt.code == 200){
          row.isSale = 1;
         this.$message({
           message: '上架成功',
           type: 'success'
         });
       }

    },
    //下架
    async xiajia(row){
      let requt =  await this.$API.sku.canceSale(row.id);
      if(requt.code == 200){
        row.isSale = 0;
        this.$message({
          message: '下架成功',
          type: 'success'
        });
      }
    },
    //正在开发的模块
    chakan(){
       this.$message({message:'正在开发中'})
    },
    //获取sku详细信息
     async getSku(row){
       let requt =   await this.$API.sku.getSkuBy(row.id);
       if(requt.code == 200){
         this.skuInfo = requt.data;
         this.drawer = true
       }
    },
    //关闭抽屉的回调
    close(){
       this.skuInfo =[]
    }

  }

}
</script>

<style>
.el-col-5 {

}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.el-row{
  margin-top: 20px;
}

</style>
