<template>
  <div>
    <el-form ref="form" :inline="true" :model="cFrom" label-width="80px">
      <el-form-item label="一级分类" >
        <el-select placeholder="请选择" :disabled="show"  v-model="cFrom.c1"  @change="handel1">
          <el-option :label="c1.name" :value="c1.id" v-for="c1 in list " :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" :disabled="show" v-model="cFrom.c2" @change="handel2">
          <el-option :label="c2.name"  :value="c2.id" v-for="c2 in list2 " :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" :disabled="show" v-model="cFrom.c3" @change="handel3">
          <el-option :label="c3.name" :value="c3.id" v-for="c3 in list3 " :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategonrySelect',
  props:['show'],
  data() {
    return {
      list: [],
      list2: [],
      list3: [],
      cFrom: {
        c1: '',
        c2: '',
        c3: '',
      }
    }
  },
  mounted() {
    this.getData1();
  },
  methods: {
    async getData1() {
      let requst = await this.$API.attr.getCategory1();
      if (requst.code == 200) {
        this.list = requst.data;
      }
    },
    async handel1() {
      this.$emit('handerID',{id1:this.cFrom.c1,id:1});
      const { c1 } = this.cFrom;
      this.cFrom.c2 = '';
      this.cFrom.c3 = '';
      this.list2 = [];
      this.list3 = [];
      let requst = await this.$API.attr.getCategory2(c1);
      if (requst.code == 200) {
        this.list2 = requst.data;
      }
    },
    async handel2() {
      this.$emit('handerID',{id1:this.cFrom.c2,id:2});
      const { c2 } = this.cFrom;
      this.list3 = [];
      this.cFrom.c3 = '';
      let requst = await this.$API.attr.getCategory3(c2);
      if (requst.code == 200) {
        this.list3 = requst.data;
      }
    },
    handel3(){
      this.$emit('handerID',{id1:this.cFrom.c3,id:3});
    }
  }
}
</script>

<style>

</style>
