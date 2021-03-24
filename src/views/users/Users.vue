<template>
  <div class="user-list">
    <!--    头部导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--            搜索-->
    <div style="margin-top: 20px;">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="根据用户名搜索用户" v-model="singleUser"
                    class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchUsers"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <!--        表格开始-->
    <el-card class="my-card">
      <el-table
              :data="userData"
              border
              stripe
              style="width: 100%">
        <el-table-column
                type="index"
                label="#"
                width="50">
        </el-table-column>
        <el-table-column
                prop="user_name"
                label="用户名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="user_password"
                label="密码"
                width="180">
        </el-table-column>
        <el-table-column
                prop="user_nick"
                label="用户昵称"
                width="180">
        </el-table-column>
        <el-table-column
                label="用户头像"
                width="180"
                align="center">
          <template slot-scope="scope">
            <el-avatar :src="scope.row['user_avatar']"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
                prop="user_card"
                label="用户身份证"
                width="180">
        </el-table-column>
        <el-table-column
                prop="user_phone"
                label="用户电话"
                width="180">
        </el-table-column>
        <el-table-column
                prop="user_trueName"
                label="用户姓名"
                width="180">
        </el-table-column>
        <el-table-column
                label="用户性别"
        >
          <template slot-scope="scope">
            {{scope.row["user_sex"] === 0 ? "男":"女"}}
          </template>
        </el-table-column>
        <el-table-column
                label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row['user_power']===1 ? '' : 'danger'">
              {{scope.row["user_power"] === 1 ? "正常" : "冻结"}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
                label="用户级别"
                width="150">
          <template slot-scope="scope">
            <el-tag :type="scope.row['user_vip'] === 0 ? 'success' : ''">{{scope.row["user_vip"] === 0 ? "普通用户" :
              "VIP用户"}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="170">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="editUser(scope.row['user_id'])"
            >
              <i class="el-icon-edit"></i>编辑
            </el-button>
            <el-button size="mini" type="danger" @click="deleteUser(scope.row['user_id'])"
            >
              <i class="el-icon-delete"></i>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--      //分页-->
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="userParams.pageNum"
              :page-sizes="[2, 4, 8, 10]"
              :page-size="userParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalUserList"
              style="margin-top: 20px;"
      >
      </el-pagination>

    </el-card>

    <!--        编辑用户弹出框-->
    <el-dialog
            title="编辑用户信息"
            :visible.sync="changeUserInfoShow"
            width="30%"
            :before-close="closeUserInfo"
    >
      <el-form :model="singleUserInfoDataForm" status-icon ref="ruleForm" label-width="100px"
               class="demo-ruleForm" label-position="left" :rules="formRules">
        <el-form-item label="密码：" prop="user_password">
          <el-input type="text" v-model="singleUserInfoDataForm['user_password']" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="user_passwordAgain">
          <el-input type="text" v-model="singleUserInfoDataForm['user_passwordAgain']" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="singleUserInfoDataForm['user_nick']" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证：" prop="user_card">
          <el-input v-model="singleUserInfoDataForm['user_card']" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="user_phone">
          <el-input v-model="singleUserInfoDataForm['user_phone']" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="singleUserInfoDataForm['user_trueName']" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio v-model="singleUserInfoDataForm['user_sex']" :label="0">男</el-radio>
          <el-radio v-model="singleUserInfoDataForm['user_sex']" :label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="头像：">
          <el-avatar :src="singleUserInfoDataForm['user_avatar']"></el-avatar>
          <el-button type="primary" size="mini" style="position: relative;top: -10px;left: 20px;cursor: pointer">
            更换头像
          </el-button>
          <input type="file" @change="changeAvatar" ref="files" class="input-file">
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="singleUserInfoDataForm['user_power']" placeholder="请选择">
            <el-option :value="1" label="正常"></el-option>
            <el-option :value="0" label="冻结"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeUserInfo">取 消</el-button>
        <el-button type="primary" @click="savaEditUser">确 定</el-button>
      </div>
    </el-dialog>

    <div class="bg-wrapper" v-show="avatorWrapperShow" @click="closeCropper">

    </div>
    <!--        剪裁头像-->
    <div class="wrap-inner" v-show="avatorWrapperShow">
      <vue-cropper
              ref="cropper"
              :img="option.img"
              :outputType="option.outputType"
              :info="false"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :fixedBox="option.fixedBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
      ></vue-cropper>
      <div class="btn">
        <span @click="closeCropper">取消</span>
        <span @click="finish">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
// 导入network
import {
  getAllUserList,
  deleteSingleUserById,
  getSingleUserById,
  updateSingleUserById,
  submitAvator,
  getRuleUsers,
  searchUserByName
} from 'network/users'
// 导入工具类
import { fileToBase, dataURLtoFile } from 'commonjs/fileToBase64'

import { VueCropper } from 'vue-cropper'

export default {
  name: 'Users',
  data () {
    const validatorPassWord = (rule, value, callback) => {
      if (!/^(?![0-9]+$)[0-9A-Za-z]{6,14}$/.test(value)) {
        callback(new Error('密码必须包含字母,请按规定输入'))
      } else {
        callback()
      }
    }
    const validatePassWordAgain = (rule, value, callback) => {
      if (value !== this.singleUserInfoDataForm.user_password) {
        callback(new Error('两次输入密码不一致，请重新输入！'))
      } else {
        callback()
      }
    }
    const validateCardTwo = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else {
        if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
          return callback(new Error('请输入正确的身份证信息！'))
        } else {
          return callback()
        }
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
        callback(new Error('请输入正确的电话号码!'))
      } else {
        callback()
      }
    }
    return {
      // 用户表格数据,
      userData: [],

      // 显示和隐藏用户编辑
      changeUserInfoShow: false,

      singleUserId: '',

      // 裁剪框 显示和隐藏
      avatorWrapperShow: false,
      // 单个用户编辑的信息
      singleUserInfoDataForm: {
        user_password: '',
        user_passwordAgain: '',
        user_nick: '',
        user_card: '',
        user_phone: '',
        user_trueName: '',
        user_sex: '',
        user_power: '',
        user_avatar: ''
      },
      // 用户编辑信息表单校验规则
      formRules: {
        user_password: [
          { trigger: 'change', message: '请输入密码' },
          { min: 6, max: 14, message: '用户名不得低于6位且不超过14位', trigger: 'change' },
          { validator: validatorPassWord, trigger: 'change' }
        ],
        user_passwordAgain: [
          { trigger: 'change', message: '请输入确认密码' },
          { validator: validatePassWordAgain, trigger: 'blur' }
        ],
        user_card: [
          { min: 18, max: 18, message: '请输入正确的身份证信息!', trigger: 'change' },
          { validator: validateCardTwo, trigger: 'blur' }
        ],
        user_phone: [
          { min: 11, max: 11, message: '电话号码为11位!', trigger: 'change' },
          { validator: validatePhone, trigger: 'blur' }
        ]
      },

      option: {
        img: '',
        outputSize: 1, // 裁剪生成图片的质量 0.1-1
        full: false, // 是否输出原图比例的截图
        outputType: 'png', // 裁剪生成图片的格式
        canMove: false, // 上传图片是否可以移动
        fixedBox: false, // 固定截图框大小 不允许改变
        original: false, // 上传图片按照原始比例渲染
        canMoveBox: true, // 截图框能否拖动
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200,
        autoCropHeight: 200,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },

      userId: '',
      userName: '',
      singleUser: '',
      // 分页的参数
      userParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 总的数据条数
      totalUserList: 0
    }
  },
  methods: {
    // 查找用户
    async searchUsers () {
      const d = await searchUserByName(this.singleUser)
      if (d.code === '500') {
        this.$message({
          type: 'error',
          message: '没有该用户！'
        })
      } else {
        const { data } = d
        this.userData = data
      }
    },
    // 编辑用户
    async editUser (userId) {
      const d = await getSingleUserById({ userId })
      const { data } = d
      for (const key in this.singleUserInfoDataForm) {
        this.singleUserInfoDataForm[key] = data[key]
      }
      this.singleUserInfoDataForm.user_passwordAgain = data.user_password
      this.changeUserInfoShow = true
      this.userId = userId
      this.userName = data.user_name
    },
    // 删除用户
    deleteUser (userId) {
      this.$confirm('确定要删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const d = await deleteSingleUserById({ userId })
        if (d.code === '200') {
          this.$message({
            message: '删除成功~',
            type: 'success'
          })
          // 重新获取数据
          this.getAllUserList()
        } else {
          this.$message({
            message: '服务器错误！删除失败了！',
            center: true,
            type: 'error'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 获取所有用户信息列表
    async getAllUserList () {
      const d = await getAllUserList()
      if (d.status.code === '200') {
        this.totalUserList = d.data.length
        getRuleUsers(this.userParams.pageNum, this.userParams.pageSize).then(r => {
          this.userData = r.data
        })
      }
    },

    // 更改头像
    changeAvatar () {
      const file = this.$refs.files.files[0]
      if (!/^image\/(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/.test(file.type)) {
        return this.$message({
          type: 'error',
          message: '您上传的不是图片哦~'
        })
      } else {
        fileToBase(file).then(r => {
          this.option.img = r
          this.changeUserInfoShow = false
          this.avatorWrapperShow = true
        })
      }
    },

    closeCropper () {
      this.$confirm('确定不保存头像吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.option.img = ''
        this.changeUserInfoShow = true
        this.avatorWrapperShow = false
        this.$refs.files.value = ''
      }).catch(() => {

      })
    },

    // 完成裁剪
    finish () {
      this.$refs.cropper.getCropData((data) => {
        // 暂时保存到  不急着上传
        this.singleUserInfoDataForm.user_avatar = data
        this.option.img = ''
        this.changeUserInfoShow = true
        this.avatorWrapperShow = false
        this.$refs.files.value = ''
      })
    },

    // 关闭编辑页面前的函数
    closeUserInfo () {
      this.$confirm('确定不保存信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.changeUserInfoShow = false
      }).catch(() => {

      })
    },

    // 保存编辑单个用户信息
    savaEditUser () {
      const data = {}
      data.user_id = this.userId
      data.user_vip = 0
      data.user_lv = 1
      data.user_name = this.userName
      for (const key in this.singleUserInfoDataForm) {
        data[key] = this.singleUserInfoDataForm[key]
      }
      delete data.user_passwordAgain

      // 上传数据

      this.ruleFormRef.validate((v) => {
        if (v) {
          // 判断头像是否为未更改前的数据  如果是未更改前的数据 直接上传
          if (data.user_avatar.indexOf('http') === 0) {
            updateSingleUserById(data).then(r => {
              if (r.code === '200') {
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
                this.changeUserInfoShow = false
                // 重新获取数据
                this.getAllUserList()
              } else {
                this.$message({
                  type: 'error',
                  message: '修改失败！'
                })
              }
            })
          } else {
            // 把base64转换为  file对象
            const file = dataURLtoFile(data.user_avatar, 'avator')
            // 上传file返回 头像链接
            const f = new FormData()
            f.append('file', file)
            submitAvator(f).then(r => {
              data.user_avatar = r
              updateSingleUserById(data).then(r => {
                if (r.code === '200') {
                  this.$message({
                    type: 'success',
                    message: '修改成功！'
                  })
                  this.changeUserInfoShow = false
                  // 重新获取数据
                  this.getAllUserList()
                } else {
                  this.$message({
                    type: 'error',
                    message: '修改失败！'
                  })
                }
              })
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: '请重新检查信息是否正确！'
          })
        }
      })
    },

    //
    handleCurrentChange (val) {
      this.userParams.pageNum = val
      this.getAllUserList()
    },

    handleSizeChange (val) {
      this.userParams.pageSize = val
      this.getAllUserList()
    }

  },
  created () {
    this.getAllUserList()
  },
  computed: {
    ruleFormRef () {
      return this.$refs.ruleForm
    }
  },
  components: {
    VueCropper
  },
  watch: {
    singleUser (newValue) {
      if (!newValue) {
        this.getAllUserList()
      }
    }
  }

}
</script>

<style scoped lang="less">
  .my-card {
    margin-top: 20px;
  }

  .input-file {
    position: absolute;
    top: 12px;
    left: 60px;
    width: 80px;
    height: 28px;
    opacity: 0;
    cursor: pointer;
    font-size: 0;
  }

  .bg-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 998;
  }

  .wrap-inner {
    background-color: #fff;
    width: 400px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    > .btn {
      width: 100%;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.1);
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        color: #fff;
        height: 100%;
        padding: 0 20px;
        line-height: 50px;
        cursor: pointer;
        font-size: 18px;
      }
    }
  }
</style>
