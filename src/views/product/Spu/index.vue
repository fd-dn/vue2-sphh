<template>
  <div>
    <el-card style="margin: 20px; padding: 0px; overflow: hidden;">
      <CategonrySelect @handerID="handerID" :show="isShow != 0"></CategonrySelect>
    </el-card>
    <el-card style="margin: 20px; padding: 0px; overflow: hidden;">
     <!--数据展示区域-->
      <div v-show="isShow == 0">
        <el-button type="primary" icon="el-icon-plus" @click="addTrade" :disabled="!id3">添加属性
        </el-button>
        <el-table :data="list" style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="180">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述">
          </el-table-column>
          <el-table-column prop="prop" label="操作">
            <template slot-scope="{row,$index}">
              <el-tooltip class="item" effect="dark" content="添加SPU" placement="top">
                <el-button type="success" icon="el-icon-plus" size="mini" @click="addSku(row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="修改SPU" placement="top">
                <el-button type="warning" icon="el-icon-edit" size="mini" @click="updataSpu(row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看SPU" placement="top">
                <el-button type="info" icon="el-icon-info" size="mini" @click="handleSku(row)"></el-button>
              </el-tooltip>

              <el-tooltip type="" class="item" effect="dark" content="删除SPU" placement="top">
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm = "deleteItem(row)"
              >
                <el-button style="margin-left: 10px" type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
              </el-popconfirm>
              </el-tooltip>


            </template>
          </el-table-column>
        </el-table>
        <!-- 总页码数，当前第几页，一页展示多少数据 , 可以设置每一页展示多少数据  , 分页器的布局-->
        <el-pagination style="margin-top:20px;textAlign:center" :total="total" :current-page="page" :page-size="limit"
                       :page-sizes="[3,5,8]" @current-change="handleChange" @size-change="handleSizeChange"
                       layout="prev,pager,next,jumper,->,sizes,total">
        </el-pagination>
      </div>
      <AddSpuOrUpadeSpu v-show = "isShow == 1" ref="addOrUpae" @changCancel="changCancel"></AddSpuOrUpadeSpu>
      <AddSku v-show = "isShow == 2" ref="addSku" @click="addSku(row)" @changCancel2="changCancel2"></AddSku>
<!--      查看sku-->
      <el-dialog
                    :before-close="close"
                    :title="`${spu.spuName}的sku列表`"
                    :visible.sync="dialogTableVisible">
        <el-table :data="sku" v-loading="loading">
          <el-table-column property="skuName" label="名称" width="150"></el-table-column>
          <el-table-column property="price" label="价格" width="200"></el-table-column>
          <el-table-column property="weight" label="重量"></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="{row,$index}">
              <img :src="row.skuDefaultImg" width="120px" height="80px">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import AddSku from "@/views/product/Spu/AddSku";
import AddSpuOrUpadeSpu from "@/views/product/Spu/AddSpuOrUpadeSpu";
import {deleteSpu} from "@/api/product/spu";
export default {
   name:'Spu',
   components: {
    AddSku,
    AddSpuOrUpadeSpu
   },
   data(){
     return {
       id1: '',
       id2: '',
       id3: '',
       isShowTabal:true,
       //通过3级id获取的数据
       list:[],
       page:1, //当前第几页
       limit:3, //一页展示的数据
       total:0, //当前数据的总条数
       isShow:0, //控制展示页面
       dialogTableVisible:false, //查看sku嵌套表格的显示
       spu:{},
       sku:[],
       loading:true
     }
    },
  methods:{
    handerID(obj) {
      if (obj.id == 1) {
        this.id2 = '';
        this.id3 = '';
        this.id1 = obj.id1;
      } else if (obj.id == 2) {
        this.id3 = '';
        this.id2 = obj.id1;
      } else if (obj.id == 3) {
        this.id3 = obj.id1;
        this.getSpuList();
      }
    },
    //添加spu按钮
    addTrade(){
      this.isShow = 1;
      this.$refs.addOrUpae.getIdData(this.id3);
    },
    //修改spu按钮
    updataSpu(row){
      this.isShow = 1;
      this.$refs.addOrUpae.getSpuData(row);
    },
    //获取展示数据
    async getSpuList(){
       let requt  = await this.$API.spu.reqSpudataList(this.page,this.limit,this.id3);
       console.log(requt);
       if(requt.code == 200){
         this.list = requt.data.records;
         this.total = requt.data.total;
       }
    },
    //分页器页码发生改变
    handleChange(page){
      this.page = page;
      this.getSpuList();
    },
    //每页展示的数据数据条数发生改变
    handleSizeChange(limit){
      this.limit = limit;
      this.getSpuList();
    },
    //自定义事件回调：取消按钮
    changCancel({num,keep}){
      this.isShow = num;
      this.getSpuList();
      if(keep == 0){
        this.handleChange(this.page);
      }else {
        this.handleChange(1);
      }
    },
    //删除spu
    async deleteItem(row){
      let requt =  await this.$API.spu.deleteSpu(row.id);
      if(requt.code == 200){
        this.$message({   message: '删除成功', type: 'success'});
        this.handleChange(this.list.length > 1 ? this.page : this.page - 1);
      }
    },
    addSku(row){
      this.isShow = 2;
      this.$refs.addSku.getData(this.id1,this.id2,row);
    },
    //组件2的自定义事件(取消按钮)
    changCancel2(num){
      this.isShow = num;
    },
    //查看sku
    async handleSku(row){
    this.dialogTableVisible = true;
    this.spu = row;
    let requt =  await this.$API.sku.getSku(row.id);
    if(requt.code == 200){
       this.sku = requt.data;
       this.loading = false;
    }
    },
    close(done){
      this.sku = [];
      this.loading = true;
      done();
    }


  }
}
</script>

<style>

</style>
