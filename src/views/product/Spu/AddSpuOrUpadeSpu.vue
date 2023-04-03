<template>
  <div>
    <el-form ref="form"  label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
         <el-input  placeholder="请输入" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
         <el-select  placeholder="请选择" v-model="spu.tmId">
           <el-option :label="item.name" :value="item.id" v-for="item in BaseSaleAttrList" :key="item.id"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows = "4" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list ="SpuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handYes">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="tmObj" :placeholder=" `此处还有${unSelectArr.length}处未选择` " >
          <el-option  :value="{id:item.id,name:item.name}" :label="item.name" v-for="item in unSelectArr" :key="item.id"></el-option>
        </el-select>
        <el-button style="margin-left: 10px" type="primary" icon="el-icon-plus" :disabled="!tmObj" @click="addAttrValue">添加销售属性</el-button>
        <el-table border style="margin-top: 10px" :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" ></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width" ></el-table-column>
          <el-table-column prop="spuSaleAttrValueList" label="属性值名称列表" width="width" >
            <template slot-scope="{row,$index}">
<!--              @close="handleClose(tag)"-->
              <el-tag :key="tag.id" v-for="tag in row.spuSaleAttrValueList" @close="delectTag(row)" closable :disable-transitions="false">
                {{tag.saleAttrValueName}}
              </el-tag>
<!--               @keyup.enter.native="handleInputConfirm"   -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">新增</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width" >
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="delectAttr(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpadata">保存</el-button>
        <el-button @click="quxiao">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {reqAddOrUpdataSpu, reqBaseSaleAttrList, reqSpuImageList, reqTradeMarkList} from "@/api/product/spu";

export default {
  name: "AddSpuOrUpadeSpu",
  data() {
    return {
      //图片
      dialogImageUrl: '',
      dialogVisible: false,
      //spu属性
      spu:{
        //3级分类ID
      "category3Id": 0,
        //描述
      "description": "",
        //品牌的ID
      "tmId": '',
        //spu名称
      "spuName": "",
        //图片的信息
      "spuImageList": [

      ],
        //平台属性与属性值的收集
      "spuSaleAttrList": [

    ],
      },
      //储存品牌信息
      TradeMarkList:[],
      //储存spu图片信息
      SpuImageList:[],
      //销售属性数据
      BaseSaleAttrList:[],
      //收集的添加销售属性
      tmObj:''
    };
  },
  methods: {
    //删除图片的回调
    handleRemove(file, fileList) {
      this.SpuImageList = fileList;
    },
    //查看图片的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传图片成功的回调
    handYes(response, file, fileList){
      this.SpuImageList = fileList;
    },
    //发送请求获取修改的属性
    async getSpuData(row){
       let reqSpu =  await this.$API.spu.reqGetSpu(row.id);
       if(reqSpu.code == 200){
         this.spu = reqSpu.data;
       }
       let reqTradeMarkList =  await this.$API.spu.reqTradeMarkList();
       if(reqTradeMarkList.code == 200){
        this.TradeMarkList = reqTradeMarkList.data;
       }
       let reqSpuImageList = await  this.$API.spu.reqSpuImageList(row.id);
       if(reqSpuImageList.code == 200){
        let arrList = reqSpuImageList.data;
        arrList.forEach((item)=>{
          item.name = item.imgName;
          item.url = item.imgUrl;
        })
         this.SpuImageList = arrList;
       }
       let reqBaseSaleAttrList = await  this.$API.spu.reqBaseSaleAttrList();
       if(reqBaseSaleAttrList.code == 200){
         this.BaseSaleAttrList = reqBaseSaleAttrList.data;
       }
    },
    addAttrValue(){
      //新增销售属性 id,name,销售属性值
      let arr = {baseSaleAttrId:this.tmObj.id,saleAttrName:this.tmObj.name,spuSaleAttrValueList:[]};
      this.spu.spuSaleAttrList.push(arr);
      this.tmObj = '';
    },
    //新增属性值
    showInput(row){
      this.$set(row,'inputVisible',true);
      this.$set(row,'inputValue','');
    },
    //新增属性值失去聚焦
    handleInputConfirm(row){
      //带上id值和属性值
      let isAdd = false;
      row.spuSaleAttrValueList.forEach((item)=>{
        if(item.saleAttrValueName.trim() == row.inputValue.trim())     isAdd = true
      })
      if( row.inputValue.trim() == '' ){
        this.$message('属性值不能为空');
        row.inputVisible = false;
      }else if(isAdd){
        this.$message('属性值不能重复');
        this.inputValue = '';
      }else {
        row.inputVisible = false;
        row.spuSaleAttrValueList.push({baseSaleAttrId:row.baseSaleAttrId,saleAttrValueName:row.inputValue})
        row.inputValue = '';
      }
    },
    //关闭tag
    delectTag(row){
      //删除掉(查询为row的对象,1)
      row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(row), 1);
    },
    //删除整行tag
    delectAttr(row){
     this.spu.spuSaleAttrList.splice(this.spu.spuSaleAttrList.indexOf(row),1);
    },
    //取消按钮
    quxiao(){
      this.$emit('changCancel',{num:0,keep:0});
      //this._data表示的是当前vm身上的响应式数据,
      //vue实例属性$options是一个对象,可以调用vue的各个组件下的方法和数据
     // 即new vue({})大括号内的东西，统称为options
      //这里调用options.data()方法后会返回一个初始的数据
      Object.assign(this._data,this.$options.data());
    },
    //保存按钮
    async addOrUpadata(){
      this.spu.spuImageList =  this.SpuImageList.map((item)=>{
        return{
          imgName:item.name,
          //如果前面为真则返回后面的那一个
          imgUrl:(item.response && item.response.data) || item.url,
        }
      })
     let requt =   await this.$API.spu.reqAddOrUpdataSpu(this.spu);
      if(requt.code == 200){
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.$emit('changCancel',{num:0,keep:1});
      }
      Object.assign(this._data,this.$options.data());
    },
    //新增spu的回调
    async getIdData(id3){
      console.log(id3)
      this.spu.category3Id = id3;
      let reqBaseSaleAttrList = await  this.$API.spu.reqBaseSaleAttrList();
      if(reqBaseSaleAttrList.code == 200){
        this.BaseSaleAttrList = reqBaseSaleAttrList.data;
      }
      let reqTradeMarkList =  await this.$API.spu.reqTradeMarkList();
      if(reqTradeMarkList.code == 200){
        this.TradeMarkList = reqTradeMarkList.data;
      }
    }

  },
  computed:{
    unSelectArr(){
      return  this.BaseSaleAttrList.filter((item1)=>{
        return this.spu.spuSaleAttrList.every((item2)=>{
          return item2.saleAttrName != item1.name;
        })
      })
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
