<template>
  <div class="all-orders">
    <!--    头部导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>全部订单</el-breadcrumb-item>
    </el-breadcrumb>

    <!--            搜索-->
    <div style="margin-top: 20px;">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="根据订单id搜索订单" v-model="OrderIdText"
                    class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchOrders(OrderIdText)"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>

    <el-card class="content-orders">
      <el-table
              v-loading="loading"
              :data="ordersData"
              border
              height="500"
              :row-class-name="tableRowClassName"
              style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="用户昵称：">
                <el-tag type="success" effect="dark">{{ props.row.orderUserInfo.user_nick}}</el-tag>
              </el-form-item>
              <el-form-item label="用户电话：">
                <el-tag type="success" effect="dark">{{ props.row.orderUserInfo.user_phone}}</el-tag>
              </el-form-item>
              <el-form-item label="导游昵称：">
                <el-tag type="success" effect="dark">{{ props.row.orderGuideInfo.guide_nick }}</el-tag>
              </el-form-item>
              <el-form-item label="导游姓名：">
                <el-tag type="success" effect="dark">{{ props.row.orderGuideInfo.guide_trueName }}</el-tag>
              </el-form-item>
              <el-form-item label="导游电话：">
                <el-tag type="success" effect="dark">{{ props.row.orderGuideInfo.guide_phone }}</el-tag>
              </el-form-item>
              <el-form-item label="订单完成时间：">
                <el-tag type="success" effect="dark">{{ props.row.orderTime | dateFormat}}</el-tag>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
                type="index"
                label="#"
                width="50">
        </el-table-column>
        <el-table-column
                prop="orderid"
                label="订单id"
                width="180">
        </el-table-column>
        <el-table-column
                label="订单用户id"
                width="180">
          <template slot-scope="scope">
            <span v-text="scope.row['orderuser']"></span>
          </template>
        </el-table-column>
        <el-table-column
                label="导游用户id"
                width="180">
          <template slot-scope="scope">
            {{scope.row["orderguide"]}}
          </template>
        </el-table-column>
        <el-table-column
                prop="orderprice"
                label="订单价格"
                width="100">
        </el-table-column>
        <el-table-column
                prop="orderfrom"
                label="订单来源"
                width="100">
        </el-table-column>
        <el-table-column
                label="订单详细地址"
                width="180">
          <template slot-scope="scope">
            {{scope.row.detailedlocation === "" ? "无" :scope.row.detailedlocation}}
          </template>
        </el-table-column>
        <el-table-column
                label="订单状态"
                align="center"
                width="180">
          <template slot-scope="scope">
            <el-tag :type="scope.row.orderstatus === '订单正常完结' ? 'success' : 'danger'">{{scope.row.orderstatus}}</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
              class="pgin"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="orderParams.pageNum"
              :page-sizes="[2, 4, 8, 10]"
              :page-size="orderParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalOrders">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  //导入network
  import { getAllAlreadyOrders, getOrderById, getOrdersPain } from "network/orders";

  export default {
    name: "AllOrders",
    data() {
      return {
        ordersData: [],
        totalOrders: null,
        orderParams: {
          pageNum: 1,
          pageSize: 10
        },
        loading: true,
        OrderIdText: null
      };
    },
    methods: {
      //获取所有完成订单信息
      async getAllOrders() {
        try {
          let data = await getOrdersPain(this.orderParams.pageNum, this.orderParams.pageSize);
          this.ordersData = data.data;
          this.ordersData.forEach(async (item, i) => {
            let d = await getOrderById(item.orderid);
            this.$set(this.ordersData[i], "orderUserInfo", d.data[2]);
            this.$set(this.ordersData[i], "orderGuideInfo", d.data[1]);
          });
          this.loading = false;
        } catch (error) {
          this.$message({
            showClose: true,
            message: "服务器错误，获取信息失败",
            type: "error"
          });
        }
      },

      async getAllOrderCount() {
        try {
          let data = await getAllAlreadyOrders();
          this.totalOrders = data.msg.length;
        } catch (error) {
          this.$message({
            showClose: true,
            message: "服务器错误，获取信息失败",
            type: "error"
          });
        }
      },


      //更改表格颜色
      tableRowClassName({ rowIndex }) {
        if (rowIndex % 2 === 0) {
          return "warning-row";
        } else if (rowIndex % 1 === 1) {
          return "success-row";
        }
      },


      //更改条数
      handleSizeChange(v) {
        this.orderParams.pageSize = v;
        this.getAllOrders();
      },
      handleCurrentChange(v) {
        this.orderParams.pageNum = v;
        this.getAllOrders();
      },


      //搜索
      async searchOrders(orderId) {
        try {
          let d = await getOrderById(orderId);
          console.log(d);
          if (d.code === "200") {
            let datas = [d.data[0]];
            this.ordersData = datas;
            this.$set(this.ordersData[0], "orderUserInfo", d.data[2]);
            this.$set(this.ordersData[0], "orderGuideInfo", d.data[1]);
          } else {
            this.$message({
              type: "error",
              message: "暂无该订单信息！"
            });
          }
        } catch (error) {
          this.$message({
            type: "error",
            message: "服务器错误！"
          });
        }
      }
    },
    components: {},
    created() {
      this.getAllOrderCount();
      this.getAllOrders();
    },
    watch:{
      OrderIdText(newValue){
        if(newValue===''){
          this.getAllOrders();
        }
      }
    }
  };
</script>

<style scoped lang="less">
  .content-orders {
    width: 100%;
    margin-top: 20px;
  }

  /deep/ .el-form-item__label {
    color: #99a9bf;
  }

  .pgin {
    margin-top: 20px;
  }
</style>
<style>
  .el-table .warning-row {
    background: #f4fbfe;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }


</style>