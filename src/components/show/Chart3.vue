<template>
  <div id="chart3">
    <div id="myChart3" :style="{width: '700px', height: '650px'}"></div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Chart3 extends Vue {
  private mounted() {
    this.drawLine();
  }
  private drawLine() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = (this as any).$echarts.init(
      document.getElementById("myChart3")
    );
    // 绘制图表
    var dfColor = {
      type: "linear",
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 1,
          color: "#0489f0" // 0% 处的颜色
        },
        {
          offset: 0,
          color: "#28d9e8" // 100% 处的颜色
        }
      ],
      global: false // 缺省为 false
    };

    var provRank = [
      "设备1",
      "设备2",
      "设备3",
      "设备4",
      "设备5",
      "设备6",
      "设备7",
      "设备8",
      "设备9",
      "设备10"
    ];
    let option = {
      backgroundColor: "#000",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: function(objs: any, index: number) {
          let obj = objs[0];
          return `${obj.name}<br/>${obj.marker}${obj.seriesName} : ${obj.value} 个`;
        }
      },
      grid: {
        top: "3%",
        left: "3%",
        right: "2%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "value",
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "category",
        boundaryGap: true,
        inverse: true, //反向
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 18,
          formatter: function(value: any, index: number) {
            var ind = index + 1;
            if (ind == 1) {
              return "{a|" + value + "}";
            } else if (ind == 2) {
              return "{b|" + value + "}";
            } else if (ind == 3) {
              return "{c|" + value + "}";
            } else {
              return "{d|" + value + "}";
            }
          },
          rich: {
            a: {
              color: "#fb4d4b"
            },
            b: {
              color: "#f39c12"
            },
            c: {
              color: "#00a65a"
            },
            d: {
              color: "#fff"
            }
          }
        },
        data: provRank
      },
      series: [
        {
          name: "销售量",
          barMaxWidth: "40%",
          type: "bar",

          label: {
            normal: {
              show: true,
              position: "insideLeft",
              formatter: "{c}",
              textStyle: {
                color: "#fff"
              }
            }
          },
          data: [
            {
              value: 150,
              itemStyle: {
                color: "#fb4d4b"
              }
            },
            {
              value: 14,
              itemStyle: {
                color: "#f39c12"
              }
            },
            {
              value: 92,
              itemStyle: {
                color: "#00a65a"
              }
            },
            {
              value: 100,
              itemStyle: {
                color: dfColor
              }
            },
            {
              value: 62,
              itemStyle: {
                color: dfColor
              }
            },
            {
              value: 89,
              itemStyle: {
                color: dfColor
              }
            },
            {
              value: 28,
              itemStyle: {
                color: dfColor
              }
            },
            {
              value: 41,
              itemStyle: {
                color: dfColor
              }
            },
            {
              value: 64,
              itemStyle: {
                color: dfColor
              }
            },
            {
              value: 80,
              itemStyle: {
                color: dfColor
              }
            }
          ]
        }
      ]
    };

    myChart.setOption(option);
  }
}
</script>


<style lang="less" scope>
#chart3 {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>