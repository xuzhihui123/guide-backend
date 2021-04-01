<template>
  <div class="all-data" ref="wrap">
    <div ref="wrapInnerZx" class="zhexian">

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getAllQuestion } from 'network/question'
import { getAllAlreadyOrders } from 'network/orders'
import moment from 'moment'

export default {
  name: 'AllData',
  data () {
    return {
      dataEcharts: null,
      dataEchartsTwo: null,
      data: {
        title: {
          text: '日订单折线图',
          textStyle: {
            color: '#03a9f4',
            fontWeight: 'bold'
          },
          left: '20%',
          top: '5%'
        },
        backgroundColor: '#E9EDF1',
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: '15%',
          left: '1%',
          right: '1%',
          bottom: '8%',
          containLabel: true
        },
        legend: {
          itemGap: 50,
          data: ['订单总量'],
          textStyle: {
            color: '#03a9f4',
            borderColor: '#fff'
          },
          top: '5%'
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisLine: { // 坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
              color: '#03a9f4'
            }
          },
          axisLabel: { // 坐标轴刻度标签的相关设置
            textStyle: {
              color: '#03a9f4',
              margin: 15
            }
          },
          axisTick: {
            show: false
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
        }],
        yAxis: [{
          type: 'value',
          min: 0,
          // max: 140,
          splitNumber: 7,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            margin: 20,
            textStyle: {
              color: '#03a9f4'
            }
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '订单总量',
          type: 'line',
          // smooth: true, //是否平滑曲线显示
          // symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 10,
          smooth: true,
          lineStyle: {
            normal: {
              color: '#03a9f4' // 线条颜色
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#03a9f4'
            },
            fontSize: 14
          },
          itemStyle: {
            borderColor: '#03a9f4'
          },
          tooltip: {
            show: true
          },
          areaStyle: { // 区域填充样式
            normal: {
              // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(3,169,244,1)'
              },
              {
                offset: 1,
                color: 'rgba(0,0,0, 0)'
              }
              ], false),
              shadowColor: 'rgba(53,142,215, 0.9)', // 阴影颜色
              shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: [393, 438, 485, 631, 689, 824, 987]
        }],
        color: ['#03a9f4']
      },
      dataOrdersData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      dataTwoData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      dataTwo: {
        color: ['#3275FB'],
        title: {
          text: '论坛问题数量汇总',
          textStyle: {
            color: '#444',
            fontWeight: 'bold'
          },
          left: '35%',
          top: '5%'
        },
        legend: {
          itemGap: 10,
          textStyle: {
            color: '#03a9f4',
            borderColor: '#fff'
          },
          top: '5%',
          right: '15%'
        },
        backgroundColor: '#E9EDF1',
        grid: {
          top: '15%',
          right: '10%',
          left: '10%',
          bottom: '12%'
        },
        xAxis: [{
          type: 'category',
          color: '#59588D',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLabel: {
            margin: 10,
            color: '#999',
            textStyle: {
              fontSize: 18
            },
            interval: 0
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(107,107,107,0.37)'
            }
          },
          axisTick: {
            show: true
          }
        }],
        yAxis: [{
          min: 0,
          axisLabel: {
            formatter: '{value}',
            color: '#999',
            textStyle: {
              fontSize: 18
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(107,107,107,0.37)'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(131,101,101,0.2)',
              type: 'dashed'
            }
          }
        }],
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: '<span style="color: #fff">数据统计</span> <br/>{a0}: {c0}条<br />{a1}: {c1}条'
        },
        series: [{
          data: [30, 32, 21, 21, 1, 30, 32, 21, 21, 1, 25, 152],
          type: 'line',
          smooth: true,
          name: '折线图',
          symbol: 'none',
          lineStyle: {
            color: '#3275FB',
            width: 4,
            shadowColor: 'rgba(0, 0, 0, 0.3)', // 设置折线阴影
            shadowBlur: 15,
            shadowOffsetY: 20
          }
        }
        ]
      }
    }
  },
  mounted () {
    this.$nextTick(() => {

      this.dataEchartsTwo = echarts.init(this.$refs.wrapInnerZx)
      this.getAllQues()
    })
  },
  methods: {
    // 获取所有问题  计算每个月的问题数量  保存在 dataTwoData
    async getAllQues () {
      const data = await getAllQuestion()
      data.forEach(item => {
        const dateTime = item.gmtCreate
        const d = parseInt(this.formatTime(dateTime))
        switch (d) {
          case 1:
            this.dataTwoData[0] += 1
            break
          case 2:
            this.dataTwoData[1] += 1
            break
          case 3:
            this.dataTwoData[2] += 1
            break
          case 4:
            this.dataTwoData[3] += 1
            break
          case 5:
            this.dataTwoData[4] += 1
            break
          case 6:
            this.dataTwoData[5] += 1
            break
          case 7:
            this.dataTwoData[6] += 1
            break
          case 8:
            this.dataTwoData[7] += 1
            break
          case 9:
            this.dataTwoData[8] += 1
            break
          case 10:
            this.dataTwoData[9] += 1
            break
          case 11:
            this.dataTwoData[10] += 1
            break
          case 12:
            this.dataTwoData[11] += 1
            break
        }
      })
      this.dataTwo.series[0].data = this.dataTwoData
      this.dataEchartsTwo.setOption(this.dataTwo)
    },

    // 获取所有订单 计算每个月的订单数量  保存在
    async getAllOrdersArray () {
      const d = await getAllAlreadyOrders()
      const data = d.msg
      data.forEach(item => {
        const ds = this.formatTime(parseInt(item.orderTime))
        const d = parseInt(ds)
        switch (d) {
          case 1:
            this.dataOrdersData[0] += 1
            break
          case 2:
            this.dataOrdersData[1] += 1
            break
          case 3:
            this.dataOrdersData[2] += 1
            break
          case 4:
            this.dataOrdersData[3] += 1
            break
          case 5:
            this.dataOrdersData[4] += 1
            break
          case 6:
            this.dataOrdersData[5] += 1
            break
          case 7:
            this.dataOrdersData[6] += 1
            break
          case 8:
            this.dataOrdersData[7] += 1
            break
          case 9:
            this.dataOrdersData[8] += 1
            break
          case 10:
            this.dataOrdersData[9] += 1
            break
          case 11:
            this.dataOrdersData[10] += 1
            break
          case 12:
            this.dataOrdersData[11] += 1
            break
        }
      })
      this.data.series[0].data = this.dataOrdersData
      this.dataEcharts.setOption(this.data)
    },

    // 时间初始化
    formatTime (date, fm = 'MM') {
      return moment(date).format(fm)
    }

  }
}
</script>

<style scoped lang="less">
  .all-data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;


    .zhexian {
      flex: 1;
      height: 500px;
    }
  }
</style>
