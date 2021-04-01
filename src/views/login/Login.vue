<template>
  <div class="login" style="min-width: 1200px">
    <div class="login-title">
      寻导后台管理系统
    </div>
    <div class="login-inner">
      <el-form :model="loginForm" status-icon ref="ruleForm" label-width="0px" class="demo-ruleForm"
               label-position="left">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" autocomplete="off" clearable="" prefix-icon="el-icon-user"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="loginForm.passWord" autocomplete="off" clearable="" prefix-icon="el-icon-lock"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="idenCode">
          <el-input v-model="loginForm.idenCode" autocomplete="off" clearable="" prefix-icon="el-icon-edit-outline"
                    placeholder="请输入验证码"></el-input>
          <img :src="this.idenCodeData.idenCodeImg" alt="" class="idenCode-inner_img" @click="getCode">
        </el-form-item>
        <el-form-item label-width="0">
          <div class="submit" @click="loginSubmit">登&nbsp;录</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { adminlogin, getIdenCode } from 'network/login'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        userName: '',
        passWord: '',
        idenCode: ''
      },
      idenCodeData: {
        idenCodeValue: '',
        idenCodeImg: ''
      }
    }
  },
  methods: {
    // 登录点击
    loginSubmit () {
      // if (!(this.loginForm.idenCode.toLowerCase() !== this.idenCodeData.idenCodeValue) || (this.loginForm.idenCode.toUpperCase() !== this.idenCodeData.idenCodeValue)) {
      //   this.getCode()
      //   return this.$message({
      //     type: 'error',
      //     message: '请重新输入验证码！'
      //   })
      // }
      adminlogin({ userName: this.loginForm.userName, passWord: this.loginForm.passWord })
        .then(d => {
          if (d.status.code === '200') {
            window.sessionStorage.setItem('token', d.token)
            window.sessionStorage.setItem('username', this.loginForm.userName)
            window.sessionStorage.setItem('power', d.power)
            this.$message({
              type: 'success',
              message: '登录成功！'
            })
            this.$router.push('/home')
          } else {
            this.$message({
              type: 'error',
              message: '用户名或密码错误！'
            })
            this.getCode()
          }
        })
    },
    // 获取验证码
    getCode () {
      getIdenCode().then(d => {
        if (d.status.code === '200') {
          this.idenCodeData.idenCodeValue = d.value
          this.idenCodeData.idenCodeImg = d.url
        }
      })
    }
  },
  created () {
    this.getCode()
  }
}
</script>

<style scoped lang="less">
  /deep/ .el-input__inner {
    border: 1px solid #1cb1f5;
  }

  /deep/ .el-form-item__label {
    color: #666;
  }

  /deep/ .el-input__icon {
    color: #666;
    font-size: 18px;
  }

  /deep/ .el-form-item__content {
    display: flex;
  }

  .login {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%);

    .login-inner {
      width: 500px;
      margin: 0 auto;
      background-color: #fff;
      padding: 30px;
      padding-bottom: 20px;
      border-radius: 10px;
    }

    .login-title {
      width: 100%;
      text-align: center;
      margin: 0 auto;
      margin-top: 180px;
      margin-bottom: 30px;
      font-size: 32px;
      color: #fff;
    }
  }

  .idenCode-inner_img {
    height: 40px;
    margin-left: 20px;
  }

  .submit {
    width: 100%;
    text-align: center;
    background-image: linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%);
    border: 0;
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    transition: all .1s;
    cursor: pointer;
  }
</style>
