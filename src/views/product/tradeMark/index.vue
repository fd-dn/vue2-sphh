<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin : 10px 0px" @click="showADD">添加</el-button>
    <el-table style="width:100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" width="100px" height="50px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" sieze="mini" @click="puatPingpai(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" sieze="mini" @click="delectAmdid(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 总页码数，当前第几页，一页展示多少数据 , 可以设置每一页展示多少数据  , 分页器的布局-->
    <el-pagination style="margin-top:20px;textAlign:center" :total="total" :current-page="page" :page-size="limit"
      :page-sizes="[5,10,15]" @current-change="handleChange" @size-change="handleSizeChange"
      layout="prev,pager,next,jumper,->,sizes,total">
    </el-pagination>

    <el-dialog :title="this.tmForm.id ? '修改品牌' : '添加品牌' " :visible.sync="dialogFormVisible" @closed="guan">

      <el-form :model="tmForm" :rules="rules" ref="ruleForm">

        <el-form-item label="品牌名称" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName" style="width:80%"></el-input>
        </el-form-item>

        <el-form-item label="品牌图片" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="addPingpai">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      page: 1,  //当前页数
      limit: 5,  //当前页展示数据的条数
      total: 0,  //数据总条数
      list: [],
      dialogFormVisible: false,
      tmForm: {
        logoUrl: '',
        tmName: ''
      },
      rules: {
        tmName: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '图片不能为空' }
        ],
      }
    }
  },
  mounted() {
    this.getData(this.page, this.limit);
    this.doem();
  },
  methods: {
    //点击显示添加按钮
    showADD() {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.tmForm.logoUrl = '';
      this.tmForm.tmName = '';
    },
    //关闭遮罩层动画结束的回调
    guan(){
      delete this.tmForm.id;
    },
    //获取数据
    async getData(page, limit) {
      let requt = await this.$API.tademark.reqMark(page, limit);
      if (requt.code == 200) {
        this.total = requt.data.total;
        this.list = requt.data.records;
        this.currentPage = requt.data.current;
      } else {
        alert('获取数据失败请检查网络');
      }
    },
    quxiao(){
      this.dialogFormVisible = false;
    },
    //测试API
    async doem() {
      let requt = await this.$API.tademark.ss();
    },
    //点击页
    handleChange(pages) {
      this.page = pages;
      this.getData(this.page, this.limit);
    },
    //修改一行显示多少数据
    handleSizeChange(size) {
      this.limit = size;
      this.getData(this.page, this.limit);
    },
    //文件上传成功时的钩子
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //确认按钮
    addPingpai() {
      //判断是否通过表单验证
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          //修改的逻辑
          if (this.tmForm.id) {
            this.dialogFormVisible = false;
            let requt = await this.$API.tademark.reqUapAdmin(this.tmForm);
            if (requt.code == 200) {
              this.$message({
                message: '修改商品成功',
                type: 'success'
              });
              //解决修改后，本地会存留ID，重新打开添加也会是修改的页面
              delete this.tmForm.id;
              this.getData(this.page, this.limit);
            } else {
              return Promise.reject(new Error(requt.msg || 'Error'));
            }
            //添加的逻辑
          } else {  
            this.dialogFormVisible = false;
            let requt = await this.$API.tademark.reqAddAdmin(this.tmForm);
            if (requt.code == 200) {
              this.$message({
                message: '添加商品成功',
                type: 'success'
              });
              delete this.tmForm.id;
              this.getData(this.page, this.limit);
            } else {
              return Promise.reject(new Error(requt.msg || 'Error'));
            }
          }
        } else {
          return false;
        }
      })

    },
    //修改品牌信息(获取到当前商品信息)
    async puatPingpai(row) {
      //row 当前用户选中的品牌信息
      this.dialogFormVisible = true;
      //将已有的品牌信息赋值给tmform进行展示
      //将服务器返回的数据直接赋值给tmform进行展示
      //这里要进行浅拷贝，不能修改展示的数据。
      //扩展运算符，里面只有简单数据类型的就是深拷贝，有复杂类型的就是浅拷贝
      this.tmForm = { ...row };
    },
  //删除按钮
  delectAmdid(row){
    this.$confirm('此操作将永久删除该品牌, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then( async () => {
          let requst = await this.$API.tademark.removeAdmin(row.id);
          if(requst.code == 200){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData(this.list.length>1 ? this.page : this.page - 1,this.limit);
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
   }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>