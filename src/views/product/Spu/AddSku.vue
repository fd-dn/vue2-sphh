<template>
  <div>
    <el-form label-width="80px" ref="form">
      <el-form-item label="SPU名称" >
        {{spu.description }}
      </el-form-item>
      <el-form-item label="SKU名称" >
          <el-input v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量千克">
        <el-input placeholder="重量千克" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" rows = "4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
          <el-form :inline="true">
            <el-form-item :label="item.attrName" v-for="item in this.infoList" :key="item.id">
              <el-select placeholder="请选择"  v-model="item.idAndValueId">
                <el-option v-for="items in item.attrValueList" :key="items.id" :value="{attrId:item.id,valueId:items.id}" :label="items.valueName"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
      </el-form-item >
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item :label="item.saleAttrName" v-for="item in this.skuAttrList" :key="item.id">
            <el-select placeholder="请选择" v-model="item.idAndValueId">
              <el-option v-for="items in item.spuSaleAttrValueList" :value="{saleAttrId:item.id,saleAttrValueId:items.id}" :key="items.id" :label="items.saleAttrValueName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
         <el-table border :data="imgList"  @selection-change="handleSelectionChange">
           <el-table-column type="selection" width="55"></el-table-column>
           <el-table-column label="图片">
             <template slot-scope="{row,$index}">
               <img :src="row.imgUrl" width="120px" height="80px"/>
             </template>
           </el-table-column>
           <el-table-column label="名称" prop="imgName">

           </el-table-column>
           <el-table-column label="操作">
             <template slot-scope="{row,$index}">
               <el-button type="primary" v-show="row.isDefault == 0" @click="isDe(row)" size="mini">设为默认</el-button>
               <el-tag type="success" v-show="row.isDefault == 1">默认</el-tag>
             </template>
           </el-table-column>
         </el-table>
      </el-form-item>
      <el-button type="primary" @click="addSku">保存</el-button>
      <el-button @click="quxiao">取消</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddSku",
  data(){
    return{
      imgList:[],
      //获取的销售属性
      skuAttrList:[],
      //平台属性
      infoList:[],
      skuInfo:
        {
          //3级ID
        "category3Id": 0,
          //SPU ID
        "spuId": 0,
          //分类ID
        "tmId": 0,
          //新增的skuID
        "skuName": "",
          //价格
        "price": 0,
          //重量
        "weight": "",
          //sku描述
        "skuDesc": "",
          //选择的平台属性
        "skuAttrValueList": [
          {
            //平台ID
            "attrId": 0,
            //平台属性ID
            "valueId": 0,
          }
        ],
       //设置的默认图片
        "skuDefaultImg": "",
         //上传的图片
        "skuImageList": [
          {
            "imgName": "string",
            "imgUrl": "string",
            "isDefault": "string",
            "spuImgId": 0
          }
        ],
         //选择的销售属性
        "skuSaleAttrValueList": [
          {
            "saleAttrId": 0,
            "saleAttrValueId": 0,
          }
        ],

      },
      spu:{},
      //选择的图片
      isImgList:[]
    }
  },
  methods:{
     async getData(id1,id2,row){
       this.spu = row;
       this.skuInfo.category3Id = row.category3Id;
       this.skuInfo.spuId = row.id;
       this.skuInfo.tmId = row.tmId;
       let requt1 =  await this.$API.sku.getAttrInfoList(id1,id2,row.id);
       if(requt1.code == 200){
         this.infoList = requt1.data;
       }
       let requt2 = await this.$API.sku.getSpuImageList(row.id);
       if(requt2.code == 200){
         let arr = requt2.data;
         arr.forEach((item)=>{
           item.isDefault = 0;
         })
         this.imgList = arr;
       }

       let requt3 = await this.$API.sku.getSpuSaleAttrList(row.id);
       if(requt3.code == 200){
         this.skuAttrList = requt3.data;
       }
     },
    //设为默认图片
    isDe(row){
       this.imgList.forEach(item=>{
         item.isDefault = 0;
       })
      row.isDefault = 1;
      this.skuInfo.skuDefaultImg = row.imgUrl;

    },
    //选择图片的回调
    handleSelectionChange(val) {
      this.isImgList = val;
    },
    //取消按钮
    quxiao(){
     this.$emit('changCancel2',0);
     Object.assign(this._data,this.$options.data());
    },
    //保存按钮
    async addSku(){
       const {infoList,skuAttrList,skuInfo,isImgList} = this;
       //整理平台属性和销售属性
       //prve设置默认为[]
      skuInfo.skuAttrValueList = infoList.reduce((prev,item)=>{
        if(item.idAndValueId){
           prev.push(item.idAndValueId)
        }
        return prev
      },[]);
      skuInfo.skuSaleAttrValueList = skuAttrList.reduce((prev,item)=>{
        if(item.idAndValueId){
          prev.push(item.idAndValueId)
        }
        return prev
      },[]);
      //整理图片
      skuInfo.skuImageList =  isImgList.map(item=>{
        return{
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId:item.id
        }
      })
      let requt = await this.$API.sku.addSku(this.skuInfo);
      if(requt.code == 200){
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.$emit('changCancel2',0);
        Object.assign(this._data,this.$options.data());
      }
    }

  }
}
</script>

<style scoped>

</style>
