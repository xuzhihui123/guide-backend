<template>
  <el-container>
    <el-header>
      <div style="color: #fff;" class="left_logo">
          寻导-后台管理
      </div>
      <div class="top_user">
        <img src="~assets/main-logo.png" alt="">
        <el-dropdown @command="signOut" style="cursor: pointer">
        <span class="el-dropdown-link" style="color: #fff;">
          您好：{{loginUserName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="退出" icon="el-icon-s-promotion">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <el-row>
          <el-col :span="24">
            <div class="my-collapse" @click="changeCollapse"><i
                    :class="[iscollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i></div>
            <el-menu router
                     :collapse="iscollapse"
                     unique-opened
                     default-active="/home/superusers"
                     :collapse-transition="false"
                     background-color="#313743"
                     text-color="#fff"
                     active-text-color="#359BFF">

              <!--              一级菜单-->
              <el-submenu :index="item.index" v-for="item in asideNavList" :key="item.index">
                <template slot="title">
                  <i :class="asideNavListIcon[item.index]"></i>
                  <span>{{item.title}}</span>
                </template>
                <!--                二级菜单-->
                <el-menu-item :index="cItem.index" v-for="cItem in item.childeren" :key="cItem.title">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{cItem.title}}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <transition enter-active-class="fadeIn animated" leave-active-class="fadeOut animated"
                    :duration="{enter:100,leave:100}" mode="out-in">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  computed: {
  },
  data () {
    return {
      asideNavList: [
        {
          title: '管理员管理',
          childeren: [{
            title: '管理员列表',
            index: '/home/superusers'
          }],
          index: '1'
        },
        {
          title: '用户管理',
          childeren: [{
            title: '用户列表',
            index: '/home/users'
          }],
          index: '2'
        },
        {
          title: '数据统计',
          childeren: [
            { title: '数据统计图', index: '/home/alldata' }
          ],
          index: '5'
        }
      ],
      asideNavListIcon: {
        1: 'el-icon-s-custom',
        2: 'el-icon-user-solid',
        3: 'el-icon-s-help',
        4: 'el-icon-s-comment',
        5: 'el-icon-s-order',
        6: 'el-icon-s-platform'
      },
      iscollapse: false,
      loginUserName: ''
    }
  },
  methods: {
    changeCollapse () {
      this.iscollapse = !this.iscollapse
    },
    // 获取登录来的用户名
    getUserName () {
      this.loginUserName = window.sessionStorage.getItem('username')
    },
    // 退出点击
    signOut (c) {
      if (c === '退出') {
        window.sessionStorage.clear()
        this.$message({
          type: 'success',
          message: '您已安全退出！',
          duration: 2000
        })
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserName()
  }
}
</script>

<style scoped lang="less">
  .el-header, .el-aside {
    background-color: #313743;
  }

  .el-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .el-aside {
    min-height: 100vh;
  }

  .el-menu {
    border-right: none;
  }

  /deep/ .el-submenu__title {
    line-height: 65px;
    height: 65px;
  }

  .el-main {
    background-color: #E9EDF1;
  }
  .my-collapse {
    height: 40px;
    width: 100%;
    background-color: rgba(255, 255, 255, .3);
    text-align: center;

    > i {
      color: #fff;
      font-size: 25px;
      line-height: 40px;
    }
  }

  .top_user img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
  }

  .left_logo{
    font-size: 24px;
    font-weight: 700;
    color: #E9EDF1;
  }

</style>
