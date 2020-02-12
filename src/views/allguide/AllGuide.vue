<template>
  <div id="all-guide">
    <!--    头部导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导游管理</el-breadcrumb-item>
      <el-breadcrumb-item>导游列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--            搜索-->
    <div style="margin-top: 20px;">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="根据用户名搜索导游" v-model="singleGuide"
                    class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchGuides"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>

    <!--        表格开始-->
    <el-card class="my-card">
      <el-table
              :data="guideData"
              border
              stripe
              style="width: 100%">
        <el-table-column
                type="index"
                label="#"
                width="50">
        </el-table-column>
        <el-table-column
                prop="guide_name"
                label="用户名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="guide_password"
                label="密码"
                width="180">
        </el-table-column>
        <el-table-column
                prop="guide_nick"
                label="导游昵称"
                width="180">
        </el-table-column>
        <el-table-column
                label="导游头像"
                width="180"
                align="center">
          <template slot-scope="scope">
            <el-avatar :src="scope.row['guide_avatar']"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
                prop="guide_card"
                label="导游身份证"
                width="180">
        </el-table-column>
        <el-table-column
                prop="guide_phone"
                label="导游电话"
                width="180">
        </el-table-column>
        <el-table-column
                prop="guide_trueName"
                label="导游姓名"
                width="180">
        </el-table-column>
        <el-table-column
                label="导游性别"
        >
          <template slot-scope="scope">
            {{scope.row["guide_sex"] === 0 ? "男":"女"}}
          </template>
        </el-table-column>
        <el-table-column
                label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row['guide_power']===1 ? '' : 'danger'">
              {{scope.row["guide_power"] === 1 ? "正常" : "冻结"}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
                label="导游级别"
                width="150">
          <template slot-scope="scope">
            <el-tag :type="scope.row['guide_vip'] === 0 ? 'success' : ''">{{scope.row["guide_vip"] === 0 ? "普通导游" :
              "VIP用户"}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="170">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="editGuide(scope.row['guide_id'])"
            >
              <i class="el-icon-edit"></i>编辑
            </el-button>
            <el-button size="mini" type="danger" @click="deleteGuide(scope.row['guide_id'])"
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
              :current-page="guideParams.pageNum"
              :page-sizes="[2, 4, 8, 10]"
              :page-size="guideParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalGuideList"
              style="margin-top: 20px;"
      >
      </el-pagination>

    </el-card>

    <!--        编辑用户弹出框-->
    <el-dialog
            title="编辑导游信息"
            :visible.sync="changeGuideInfoShow"
            width="30%"
            :before-close="closeUserInfo"
    >
      <el-form :model="singleUserInfoDataForm" status-icon ref="ruleForm" label-width="100px"
               class="demo-ruleForm" label-position="left" :rules="formRules">
        <el-form-item label="密码：" prop="guide_password">
          <el-input type="text" v-model="singleUserInfoDataForm['guide_password']" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="guide_passwordAgain">
          <el-input type="text" v-model="singleUserInfoDataForm['guide_passwordAgain']" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="singleUserInfoDataForm['guide_nick']" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证：" prop="guide_card">
          <el-input v-model="singleUserInfoDataForm['guide_card']" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="guide_phone">
          <el-input v-model="singleUserInfoDataForm['guide_phone']" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="singleUserInfoDataForm['guide_trueName']" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio v-model="singleUserInfoDataForm['guide_sex']" :label="0">男</el-radio>
          <el-radio v-model="singleUserInfoDataForm['guide_sex']" :label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="头像：">
          <el-avatar :src="singleUserInfoDataForm['guide_avatar']"></el-avatar>
          <el-button type="primary" size="mini" style="position: relative;top: -10px;left: 20px;cursor: pointer">
            更换头像
          </el-button>
          <input type="file" @change="changeAvatar" ref="files" class="input-file">
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="singleUserInfoDataForm['guide_power']" placeholder="请选择">
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
  //导入network
  import {
    getAllGuideList,
    deleteSingleGuideById,
    searchGuideByName,
    getSingleGuideById,
    updateSingleGuideById,
    getRuleGuides
  } from "network/guides";
  import { submitAvator } from "network/users";
  import { VueCropper } from "vue-cropper";
  //导入工具类
  import { fileToBase, dataURLtoFile } from "commonjs/fileToBase64";

  export default {
    name: "AllGuide",
    data() {
      let validatorPassWord = (rule, value, callback) => {
        if (!/^(?![0-9]+$)[0-9A-Za-z]{6,14}$/.test(value)) {
          callback(new Error("密码必须包含字母,请按规定输入"));
        } else {
          callback();
        }
      };
      let validatePassWordAgain = (rule, value, callback) => {
        if (value !== this.singleUserInfoDataForm.guide_password) {
          callback(new Error("两次输入密码不一致，请重新输入！"));
        } else {
          callback();
        }
      };
      let validateCardTwo = (rule, value, callback) => {
        if (value === "") {
          callback();
        } else {
          if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
            return callback(new Error("请输入正确的身份证信息！"));
          } else {
            return callback();
          }
        }
      };
      let validatePhone = (rule, value, callback) => {
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
          callback(new Error("请输入正确的电话号码!"));
        } else {
          callback();
        }
      };
      return {
        singleGuide: "",
        guideData: [],
        //显示和隐藏用户编辑
        changeGuideInfoShow: false,

        //单个导游编辑的信息
        singleUserInfoDataForm: {
          guide_password: "",
          guide_passwordAgain: "",
          guide_nick: "",
          guide_card: "",
          guide_phone: "",
          guide_trueName: "",
          guide_sex: "",
          guide_power: "",
          guide_avatar: ""
        },
        option: {
          img: "",
          outputSize: 1,//裁剪生成图片的质量 0.1-1
          full: false,//是否输出原图比例的截图
          outputType: "png",//裁剪生成图片的格式
          canMove: false,//上传图片是否可以移动
          fixedBox: false,//固定截图框大小 不允许改变
          original: false,//上传图片按照原始比例渲染
          canMoveBox: true,//截图框能否拖动
          autoCrop: true,//是否默认生成截图框
          autoCropWidth: 200,
          autoCropHeight: 200,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [1, 1]
        },

        guideId: "",
        guideName: "",

        //用户编辑信息表单校验规则
        formRules: {
          guide_password: [
            { trigger: "change", message: "请输入密码" },
            { min: 6, max: 14, message: "用户名不得低于6位且不超过14位", trigger: "change" },
            { validator: validatorPassWord, trigger: "change" }
          ],
          guide_passwordAgain: [
            { trigger: "change", message: "请输入确认密码" },
            { validator: validatePassWordAgain, trigger: "blur" }
          ],
          guide_card: [
            { min: 18, max: 18, message: "请输入正确的身份证信息!", trigger: "change" },
            { validator: validateCardTwo, trigger: "blur" }
          ],
          guide_phone: [
            { min: 11, max: 11, message: "电话号码为11位!", trigger: "change" },
            { validator: validatePhone, trigger: "blur" }
          ]
        },

        avatorWrapperShow: false,

        //分页参数
        guideParams: {
          pageNum: 1,
          pageSize: 10
        },
        //总的导游列表数据
        totalGuideList: 0
      };
    },
    components: {
      VueCropper
    },
    methods: {
      async searchGuides() {
        let d = await searchGuideByName(this.singleGuide);
        if (d.status.code === "500") {
          this.$message({
            type: "error",
            message: "没有该用户！"
          });
        } else {
          let { data } = d;
          this.guideData = data;
        }
      },
      //编辑导游
      async editGuide(guideId) {
        let d = await getSingleGuideById({ guideId });
        let { data } = d;
        for (let key in this.singleUserInfoDataForm) {
          this.singleUserInfoDataForm[key] = data[key];
        }
        this.singleUserInfoDataForm["guide_passwordAgain"] = data["guide_password"];
        this.changeGuideInfoShow = true;
        this.guideId = guideId;
        this.guideName = data.guide_name;
      },
      // 删除导游
      deleteGuide(guideId) {
        this.$confirm("确定要删除该用户吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          let d = await deleteSingleGuideById({ guideId });
          if (d.code === "200") {
            this.$message({
              message: "删除成功~",
              type: "success"
            });
            //重新获取数据
            this.getAllGuideList();
          } else {
            this.$message({
              message: "服务器错误！删除失败了！",
              center: true,
              type: "error"
            });
          }
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      },

      //获取所有导游信息列表
      async getAllGuideList() {
        let d = await getAllGuideList();
        if (d.status.code === "200") {
          this.totalGuideList = d.data.length;
        }
      },

      //获取分页导游
      async getAllGuideFromRules() {
        let c = await getRuleGuides(this.guideParams.pageNum, this.guideParams.pageSize);
        this.guideData = c.data;
      },

      //关闭编辑导游页面
      closeUserInfo() {
        this.$confirm("确定不保存信息吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.changeGuideInfoShow = false;
        }).catch(() => {

        });
      },

      //更改头像
      changeAvatar() {
        let file = this.$refs.files.files[0];
        if (!/^image\/(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/.test(file.type)) {
          return this.$message({
            type: "error",
            message: "您上传的不是图片哦~"
          });
        } else {
          fileToBase(file).then(r => {
            this.option.img = r;
            this.changeGuideInfoShow = false;
            this.avatorWrapperShow = true;
          });
        }
      },

      savaEditUser() {
        let data = {};
        data.guide_id = this.guideId;
        data.user_vip = 0;
        data.user_lv = 1;
        data.user_name = this.guideName;
        for (let key in this.singleUserInfoDataForm) {
          data[key] = this.singleUserInfoDataForm[key];
        }
        delete data["user_passwordAgain"];
        this.$refs.ruleForm.validate((validate) => {
          if (validate) {
            // 判断头像是否为未更改前的数据  如果是未更改前的数据 直接上传
            if (data.guide_avatar.indexOf("http") === 0) {
              updateSingleGuideById(data).then(r => {
                if (r.code === "200") {
                  this.$message({
                    type: "success",
                    message: "修改成功！"
                  });
                  this.changeGuideInfoShow = false;
                  //重新获取数据
                  this.getAllGuideFromRules();
                } else {
                  this.$message({
                    type: "error",
                    message: "修改失败！"
                  });
                }
              });
            } else {
              //把base64转换为  file对象
              let file = dataURLtoFile(data.guide_avatar, "avator");
              //上传file返回 头像链接
              let f = new FormData();
              f.append("file", file);
              submitAvator(f).then(r => {
                data.guide_avatar = r;
                updateSingleGuideById(data).then(r => {
                  if (r.code === "200") {
                    this.$message({
                      type: "success",
                      message: "修改成功！"
                    });
                    this.changeGuideInfoShow = false;
                    //重新获取数据
                    this.getAllGuideFromRules();
                  } else {
                    this.$message({
                      type: "error",
                      message: "修改失败！"
                    });
                  }
                });
              });
            }
          } else {
            this.$message({
              type: "error",
              message: "请重新检查信息是否正确！"
            });
          }
        });
      },

      closeCropper() {
        this.$confirm("确定不保存头像吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.option.img = "";
          this.changeGuideInfoShow = true;
          this.avatorWrapperShow = false;
          this.$refs.files.value = "";
        }).catch(() => {

        });
      },

      //完成裁剪
      //完成裁剪
      finish() {
        this.$refs.cropper.getCropData((data) => {
          //暂时保存到  不急着上传
          this.singleUserInfoDataForm.guide_avatar = data;
          this.option.img = "";
          this.changeGuideInfoShow = true;
          this.avatorWrapperShow = false;
          this.$refs.files.value = "";
        });
      },


      //分页
      handleSizeChange(value) {
        this.guideParams.pageSize = value;
        this.getAllGuideFromRules();
      },
      handleCurrentChange(value) {
        this.guideParams.pageNum = value;
        this.getAllGuideFromRules();
      }
    },
    created() {
      this.getAllGuideList();
      this.getAllGuideFromRules();
    },
    watch: {
      singleGuide(newValue) {
        if (!newValue) {
          this.getAllGuideFromRules();
        }
      }
    }
  };
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