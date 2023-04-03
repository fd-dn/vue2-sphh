<template>
  <div>
    <el-card style="margin: 20px; padding: 0px; overflow: hidden;">
      <CategonrySelect @handerID="handerID" :show="!isShowTabal"></CategonrySelect>
    </el-card>
    <div v-show="isShowTabal">
      <el-card style="margin: 20px; padding: 0px;">
        <el-button type="primary" icon="el-icon-plus" @click="addTrade" :disabled="id3 == ''">添加属性
        </el-button>
        <el-table :data="list" style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="180">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表">
            <template slot-scope="{row,$index}">
              <el-tag type="success" v-for="item in row.attrValueList" :key="item.id" style="margin:10px;">
                {{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作">
            <template  slot-scope="{row,$index}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="auptdAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div v-show="!isShowTabal">
      <el-form :inline="true" ref="form" label-width="80px" :model="attrIfno" style="width:160px; margin: 20px;">
        <el-from-item label="属性名">
          <el-input placeholder="请输入属性名"  v-model="attrIfno.attrName"></el-input>
        </el-from-item>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" style="margin: 20px;" @click="addList" :disabled="attrIfno.attrName == '' ">添加属性值</el-button>
      <el-button style="margin: 20px;" @click="isShowTabal = true">取消</el-button>
      <el-table style="width:100%;margin:20px" border :data="attrIfno.attrValueList">
        <el-table-column align="center" type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column width="width" prop="prop" label="属性值名称">
          <template slot-scope="{row,$index}">
            <el-input v-model="row.valueName" ref="item" placeholder="请输入属性值名称" @blur="isStore(row)"  size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column width="width" prop="prop" label="操作" >
          <template slot-scope="{row,$index}">
            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="onConfirm($index)">
              <el-button type="danger"  slot="reference" icon="el-icon-delete"  size="mini"></el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" style="margin: 20px;" @click="UpdteOrSave" :disabled="isFromYan || attrIfno.attrValueList < 1 ">保存</el-button>
      <el-button style="margin: 20px;" @click="isShowTabal = true">取消</el-button>
    </div>
  </div>
</template>

<script>
//引入lodash的深拷贝
import cloneDeep from 'lodash/cloneDeep';
import {reqUpdteOrAddd} from "@/api/product/attr";
export default {
  name: 'attr',
  data() {
    return {
      id1: '',
      id2: '',
      id3: '',
      //服务器获取的展示数据
      list: [],
      isShowTabal: true,
      //传给服务器的展示数据
      attrIfno: {
        "attrName": '',  //属性
        //属性值
        "attrValueList": [
        ],
        "categoryId": 0,         //3id
        "categoryLevel": 3,      //3级分类
    },
      //新增属性，保存按钮是否确定
      isFromYan:false,
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
        this.getAttrList();
      }
    },
    //添加属性值按钮
    addList(){
      this.attrIfno.attrValueList.push({
        "attrId": this.attrIfno.id,
        "valueName": "",
      })
      //等DOM更新完毕之后再进行操作
      this.$nextTick(()=>{
        this.$refs.item.focus();
      })
    },
    //添加按钮
    addTrade(){
     this.isShowTabal = false;
     this.attrIfno = {
        "attrName": '',  //属性
        //属性值
        "attrValueList": [
        ],
        "categoryId": this.id3,         //3id
        "categoryLevel": 3,      //3级分类
     }
    },
    //修改商品属性按钮
    auptdAttr(row){
      this.isShowTabal = false;
      this.attrIfno = cloneDeep(row);
    },
  //保存或者修改进入页面
  async UpdteOrSave(){
    //进行表单验证(是否有重复值)
    let arr = [];
    this.attrIfno.attrValueList.forEach(item=>{
      arr.push(item.valueName);
    })
    let arr2 =  [...new Set(arr)];
    if(arr2.length == arr.length){
    }else {
      this.$message('不能有重复的值')
      return  false
    }
    try{
      let requt =   await this.$API.attr.reqUpdteOrAddd(this.attrIfno);
      this.getAttrList();
      this.isShowTabal = true;
      this.$message({type: 'success', message: '成功',})
    }catch (e) {

      }
  },
  //新增属性值失去焦点进行表单验证
  isStore(event,row){
    if(event.valueName.trim() == ''){
      this.isFromYan = true;
       return this.$message('属性值不能为空');
    }else {
      this.isFromYan = false;
    }
  },
  //删除按钮
  onConfirm(index){
    this.attrIfno.attrValueList.splice(index,1);
  },
  //获取列表数据
  async getAttrList(){
    let { id1, id2, id3 } = this;
    let requt = await this.$API.attr.getInfoList(id1, id2, id3);
    if (requt.code == 200) {
      this.list = requt.data;
    } else {
      return new Error('filer');
    }
  }
  }
}
</script>

<style>

</style>
