<template>
  <div class="all-data" ref="wrap">
      <vl-line width="100%" :settings="barSettings" :data="questionData" :options="questionOptions"></vl-line>
      <vl-pie width="100%" :height="500" :settings="lineSettings" :data="orderData" :options="orderOptions"></vl-pie>
  </div>
</template>

<script>
import { getAllQuestion } from 'network/question'
import { getAllAlreadyOrders } from 'network/orders'
import moment from 'moment'

export default {
  name: 'AllData',
  data () {
    return {
      barSettings: {
        tooltipVisible: true,
        legendVisible: true
      },
      lineSettings: {
        tooltipVisible: true,
        legendVisible: true
      },
      questionData: {
        columnList: [
          { name: '问题数量' },
          { name: '2021' }
        ],
        data: [

        ]
      },
      questionOptions: {
        title: {
          text: '论坛问题数量统计折线图',
          textStyle: {
            fontFamily: 'monospace',
            color: '#019688'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 2,
              color: '#019688'
            },
            type: 'cross'
          }
        },
        grid: {
          left: '5%',
          right: '3%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          boundaryGap: false,
          // 刻度文字颜色
          axisLabel: { color: '#808080' },
          axisLine: {
            lineStyle: {
              width: 3,
              color: '#019688'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgba(226,226,226,0.5)'
            }
          },
          axisTick: { // 轴刻度线
            show: false
          }
        },
        yAxis: {
          boundaryGap: [0, '30%'],
          axisTick: { // 轴刻度线
            show: false
          },
          // 刻度文字颜色
          axisLabel: { color: '#808080' },
          // y轴刻度设置
          axisLine: {
            lineStyle: {
              width: 3,
              color: '#019688'
            }
          },
          // y轴分隔线设置
          splitLine: {
            lineStyle: {
              color: 'rgba(226,226,226,0.5)'
            }
          },
          // y轴分隔区域设置
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.3)', 'rgba(226,226,226,0.3)']
            }
          }
        },
        color: ['#019688', '#119AC2'],
        // visualMap: {
        //   type: 'piecewise',
        //   show: false,
        //   dimension: 0,
        //   seriesIndex: 0,
        //   pieces: [{
        //     gt: 1,
        //     lt: 3,
        //     color: 'rgba(0, 180, 0, 0.5)'
        //   }, {
        //     gt: 5,
        //     lt: 7,
        //     color: 'rgba(0, 180, 0, 0.5)'
        //   }]
        // },
        series: {
          type: 'line',
          smooth: 0.6,
          // symbol: 'none',
          lineStyle: {
            color: '#83bff6',
            width: 3
          },
          areaStyle: {}
        }
      },
      orderOptions: {
        legend: {
          top: '25%',
          left: '20%',
          orient: 'vertical',
          textStyle: {
            color: '#F4606C'
          }
        },
        title: {
          text: '订单数量统计环形图',
          textStyle: {
            color: '#019688'
          }
        },
        grid: {
          top: '30%'
        },
        series: {
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          }
        }
      },
      orderData: {
        columnList: [
          { name: '订单数量' },
          { name: '2021' }
        ],
        data: [

        ]
      }
    }
  },
  async created () {
    await this.getAllQues()
    await this.getAllOrdersArray()
  },
  methods: {
    // 获取所有问题  计算每个月的问题数量
    async getAllQues () {
      const data = await getAllQuestion()
      this.formatData(data, 'gmtCreate', this.questionData.data)
    },

    formatData (postData, timeStr, echartsData) {
      const dataDict = {}
      postData.forEach(item => {
        item[timeStr] = this.formatTime(Number(item[timeStr]))
        item[timeStr] = item[timeStr].startsWith('0') ? Number(item[timeStr].substring(1)) : Number(item[timeStr])
        if (!dataDict[item[timeStr]]) {
          dataDict[item[timeStr]] = 1
        } else {
          dataDict[item[timeStr]] = ++dataDict[item[timeStr]]
        }
      })
      for (let i = 1; i < 13; i++) {
        echartsData.push([i + '月'])
      }
      Object.keys(dataDict) && Object.keys(dataDict).forEach(item => {
        echartsData[item - 1].push(dataDict[item])
      })
      echartsData.forEach(item => {
        if (item.length !== 2) {
          item.push(0)
        }
      })
    },

    // 获取所有订单 计算每个月的订单数量
    async getAllOrdersArray () {
      const { msg } = await getAllAlreadyOrders()
      this.formatData(msg, 'orderTime', this.orderData.data)
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
    flex-direction: column;
  }
</style>
