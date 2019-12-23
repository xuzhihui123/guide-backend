<template>
  <div class="all-data" ref="wrap">
    <div ref="wrapInner" class="zhuzhuang">

    </div>
    <div class="zhexian" ref="wrapInnerZx">

    </div>
  </div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name: "AllData",
    data() {
      return {
        dataEcharts: null,
        dataEchartsTwo:null,
        data: {
          color:["#1cb1f5"],
          title: {
            text: "每日订单数据"
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }],
        },
        dataTwo:{
          title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
        }
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.dataEcharts = echarts.init(this.$refs.wrapInner);
        this.dataEcharts.setOption(this.data);

        this.dataEchartsTwo = echarts.init(this.$refs.wrapInnerZx)
        this.dataEchartsTwo.setOption(this.dataTwo)
      });
    }
  };
</script>

<style scoped lang="less">
  .all-data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .zhuzhuang {
      flex: 1;
      height: 500px;
    }

    .zhexian {
      flex: 1;
      height: 500px;
    }
  }
</style>