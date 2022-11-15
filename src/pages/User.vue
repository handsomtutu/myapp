<template>
  <div class="manage">
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">+新增</el-button>
      <el-form  :model="userform" label-width="80px" inline>
        <el-form-item label="" >
          <el-input v-model="userform.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSubmit" >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
   <div class="common-table">
    <el-table
    stripe
    height="90%"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="180">
        <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.sex==1?'男':'女' }}</span>
      </template>
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="birth"
        label="出生日期">
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)" type="primary">编辑</el-button>
        <el-button size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination 
    layout="prev, pager, next"
    @current-change="handlePage"
    :total="total">
  </el-pagination>
    </div>
   </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <span>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          inline
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
            value-format="yyyy-MM-dd"
              v-model="form.birth"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getUser,addUser,editUser,delUser} from '../api'
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      modalType:0,
      total:0,   //0表示新增的弹窗，1表示编辑的弹窗
      pageData:{
        page:1,
        limit:10,
      },
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData:[

      ],
      userform:{
        name:''
      }
    };
  },
  methods: {
    onSubmit(){
      this.getList()
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if(valid){
          if(this.modalType===0){
            addUser(this.form).then(()=>{
              this.getList()
            })
          }else{
            editUser(this.form).then(()=>{
              this.getList()
            })
          }
          this.$refs.form.resetFields()
          this.dialogVisible = false;
        }
        
      })
    
      
    },
    handleClose(){
    this.$refs.form.resetFields()
    this.dialogVisible = false
  },
  cancel(){
    this.handleClose()
  },
  handleEdit(res){
    this.modalType=1
    this.dialogVisible=true
    this.form=JSON.parse(JSON.stringify(res))
    
  },

  handleDelete(res){
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({
            id:res.id
          }).then(()=>{
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

  },
  handleAdd(){
    this.modalType=0
    this.dialogVisible = true
  },
  handlePage(val){
    this.pageData.page=val
    this.getList()
  },
  // 刷新页面
  getList(){
    getUser({params:{...this.pageData,...this.userform}}).then((data) =>{
      this.tableData=data.data.list
      this.total=data.data.count||0
      
    })
  }   
  },
  mounted(){
    this.getList()

  }
  
};
</script>

<style lang="less" scoped>
.manage{
  height: 90%;
  .common-table{
    position: relative;
    height: calc(100% - 50px);
    .page{
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
  .manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>