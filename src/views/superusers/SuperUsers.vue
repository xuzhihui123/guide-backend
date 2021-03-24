<template>
  <div class="super-users">
    <!--    头部导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    搜索-->
    <div style="margin-top: 20px;">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="搜索管理员" @input="searchAdminUserInput" v-model="searchAdminUser"
                    class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchAdminUsers"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="addAdminUser" :disabled="loginUserPower<5 ? true : false">添加管理员</el-button>
        </el-col>
      </el-row>
    </div>
    <!--    表格-->
    <el-card class="box-card">
      <el-table
              :data="tableData"
              border
              stripe
              style="width: 100%">
        <el-table-column
                type="index"
                label="#"
                width="50">
        </el-table-column>
        <el-table-column
                prop="userName"
                label="用户名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="passWord"
                label="密码"
                width="180">
        </el-table-column>
        <el-table-column
                sortable
                prop="create_time"
                label="创建时间">
          <template slot-scope="scope">
            {{scope.row.create_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column
                label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status==='正常' ? '' : 'danger'">
              {{scope.row.status}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
                label="权限">
          <template slot-scope="scope">
            <el-tag :type="scope.row.power >= 5 ? 'success' : ''">{{scope.row.power >= 5 ? "超级管理员" : "管理员"}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
                label="操作"
                width="170">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="editUser(scope.row)"
                       :disabled="inputDis(scope.row.userName)">
              <i class="el-icon-edit"></i>编辑
            </el-button>
            <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)"
                       :disabled="inputDis(scope.row.userName)">
              <i class="el-icon-delete"></i>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--    分页-->
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="AdminUsersParams.pageNum"
              :page-sizes="[2, 4, 8, 10]"
              :page-size="AdminUsersParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDataLength">
      </el-pagination>
    </el-card>

    <!--    编辑弹窗-->
    <el-dialog
            title="编辑管理员"
            :visible.sync="editDialogVisible"
            width="30%"
            :before-close="handleClose"
    >
      <!--      内容模块-->
      <el-form :model="editAdminUserData" status-icon :rules="addAdminUserDataRules" ref="editUserForm"
               label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="editAdminUserData.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input type="text" v-model="editAdminUserData.passWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="power">
          <el-select v-model="editAdminUserData.power" placeholder="请更改权限">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="editAdminUserData.status" placeholder="请更改状态">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="冻结" value="冻结"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEditUser">确 定</el-button>
      </span>
    </el-dialog>

    <!--    添加弹窗-->
    <el-dialog
            title="添加管理员"
            :visible.sync="addUserDialogVisible"
            width="30%"
            @close="closeAddUserDialog"
            :before-close="handleClose"
    >
      <!--      添加管理员表单内容-->
      <el-form :model="addAdminUserData" status-icon :rules="addAdminUserDataRules" ref="addUserForm"
               label-width="100px"
               class="demo-ruleForm"
               label-position="left">
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="addAdminUserData.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="passWord">
          <el-input v-model="addAdminUserData.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="passWordAgain">
          <el-input v-model="addAdminUserData.passWordAgain" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="addAdminUserData.power" placeholder="请选择权限">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAddUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllSuperUsers,
  getRuleSuperUsers,
  deleteAdminUsersById,
  addAdminUser,
  searchAdminUser,
  editAdminUser
} from 'network/super_users'

export default {
  name: 'SuperUsers',
  data () {
    // 添加用户  输入框校验
    const validateUser = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9_-]{6,16}$/.test(value)) {
        callback(new Error('用户名必须是字母，数字，下划线组成！'))
      } else {
        callback()
      }
    }
    // 添加密码  输入框校验
    const validatePassWord = (rule, value, callback) => {
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)) {
        callback(new Error('密码需要包括数字和英文！'))
      } else {
        callback()
      }
    }
    // 添加再次输入密码  输入框校验
    const validatePassWordAgain = (rule, value, callback) => {
      if (value !== this.addAdminUserData.passWord) {
        callback(new Error('两次输入密码不一样'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      tableDataLength: 0,
      AdminUsersParams: {
        pageNum: 1,
        pageSize: 10
      },
      searchAdminUser: '',
      editDialogVisible: false,
      editAdminUserData: {},
      addUserDialogVisible: false,
      addAdminUserData: {
        userName: '',
        passWord: '',
        passWordAgain: '',
        power: '管理员'
      },
      addAdminUserDataRules: {
        userName: [
          { required: true, trigger: 'change', message: '请输入用户名' },
          { min: 6, max: 16, message: '用户名不得低于6位且不超过16位', trigger: 'change' },
          { validator: validateUser, trigger: 'change' }
        ],
        passWord: [
          { required: true, trigger: 'change', message: '请输入密码' },
          { min: 6, max: 20, message: '密码不得低于6位且不超过20位', trigger: 'change' },
          { validator: validatePassWord, trigger: 'change' }
        ],
        passWordAgain: [
          { required: true, trigger: 'change', message: '请输入确认密码' },
          { validator: validatePassWordAgain, trigger: 'change' }
        ]
      },
      loginUserName: '',
      loginUserPower: null
    }
  },
  computed: {
    addUserFormRef () {
      return this.$refs.addUserForm
    },
    editUserFormRef () {
      return this.$refs.editUserForm
    }
  },
  methods: {
    // 初始化管理员信息
    getSuperUsersData () {
      getAllSuperUsers().then(d => {
        this.tableDataLength = d.data.length
      })
      getRuleSuperUsers(this.AdminUsersParams.pageNum, this.AdminUsersParams.pageSize)
        .then(d => {
          this.tableData = d.data
        })
    },

    // 删除单个管理员
    deleteUser (d) {
      this.$confirm('您确定要删除该管理员吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAdminUsersById(d).then(d => {
          if (d.code === '200') {
            this.$message({
              message: '嘻嘻！删除成功！',
              center: true,
              type: 'success'
            })
            this.getSuperUsersData()
          } else {
            this.$message({
              message: '服务器错误！删除失败了！',
              center: true,
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 编辑单个管理员
    editUser (d) {
      console.log(d)
      this.editDialogVisible = true
      this.editAdminUserData = d
      this.editAdminUserData.power = this.editAdminUserData.power >= 5 ? '超级管理员' : '管理员'
    },
    // 确认编辑
    submitEditUser () {
      this.editUserFormRef.validate(r => {
        if (r) {
          const { userName: uN, passWord: pD, status: sta, id: uid } = this.editAdminUserData
          const data = {}
          data.userName = uN
          data.passWord = pD
          data.status = sta
          data.id = uid
          data.power = this.editAdminUserData.power === '管理员' ? 4 : 5

          editAdminUser(data).then(d => {
            if (d.code === '200') {
              this.$message({
                type: 'success',
                message: '修改成功',
                duration: 2000
              })
            }
            this.editDialogVisible = false
            this.getSuperUsersData()
          })
        } else {
          this.$message({
            type: 'error',
            message: '请检查表单是否填写准确完整！',
            duration: 2000
          })
        }
      })
    },

    // 添加单个管理员
    addAdminUser () {
      this.addUserDialogVisible = true
    },

    // 确认添加管理员
    submitAddUser () {
      this.addUserFormRef.validate(r => {
        // 校验成功  传数据
        if (r) {
          const { userName: uN, passWord: pD } = this.addAdminUserData
          const data = {}
          data.userName = uN
          data.passWord = pD
          if (this.addAdminUserData.power === '管理员') {
            data.power = 4
          } else {
            data.power = 5
          }
          addAdminUser(data).then(d => {
            if (d.code === '200') {
              this.addUserDialogVisible = false
              this.$message({
                type: 'success',
                message: '添加管理员成功！',
                duration: 2000
              })
              // 重新请求赋值
              this.getSuperUsersData()
            } else if (d.code === '500') {
              this.$message({
                type: 'error',
                message: '用户名已经存在！',
                duration: 2000
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '请检查表单是否填写准确完整！',
            duration: 2000
          })
        }
      })
    },

    // 关闭添加的dialog  重置表单数据
    closeAddUserDialog () {
      this.addAdminUserData = {
        userName: '',
        passWord: '',
        passWordAgain: '',
        power: '管理员'
      }
    },

    // 关闭前的回调
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },

    // 搜索单个管理员用户
    searchAdminUsers () {
      searchAdminUser(this.searchAdminUser).then(d => {
        if (d.status.code === '200') {
          this.tableData = []
          this.tableData.push(d.admin)
        } else {
          this.$message.error('查询失败！用户名不存在')
        }
      })
    },

    // 搜索输入框没值的时候显示所有
    searchAdminUserInput () {
      if (this.searchAdminUser === '') {
        this.getSuperUsersData()
      }
    },

    // 更改当前页
    handleCurrentChange (val) {
      this.AdminUsersParams.pageNum = val
      this.getSuperUsersData()
    },
    // 更改每页条数
    handleSizeChange (val) {
      this.AdminUsersParams.pageSize = val
      this.getSuperUsersData()
    },

    inputDis (d) {
      const a = this.loginUserName !== d
      const b = !(this.loginUserPower >= 5)
      if (a === false || b === false) {
        return false
      }
      if (a === true || b === false) {
        return true
      }
    }
  },

  created () {
    this.getSuperUsersData()
    // 获取sessionstorage的username
    this.loginUserName = window.sessionStorage.getItem('username') || ''

    this.loginUserPower = window.sessionStorage.getItem('power')
  }

}
</script>

<style scoped lang="less">
  .el-card {
    margin-top: 20px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .15);
  }

  .el-pagination {
    margin-top: 20px;
  }
</style>
