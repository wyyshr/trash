<template>
  <div>
    <div id="myChart1" :style="{width: '100%', height: '220px'}"></div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Chart1 extends Vue {
  private mounted() {
    this.drawLine();
  }
  private drawLine() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = (this as any).$echarts.init(document.getElementById("myChart1"));
    // 绘制图表
    let option = {
      backgroundColor: "#ffffff",
      legend: {
        name: ["环比"],
        right: 20,
        top: 20
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: [
        {
          type: "category",
          axisLine: {
            show: true,
            lineStyle: {
              color: "#6c50f3"
            }
          },
          splitArea: {
            color: "#f00",
            lineStyle: {
              color: "#f00"
            }
          },
          axisLabel: {
            lineStyle: {
              color: "#6c50f3"
            }
          },
          splitLine: {
            show: false
          },
          boundaryGap: false,
          data: [
            "2020-02-03",
            "2020-02-04",
            "2020-02-05",
            "2020-02-06",
            "2020-02-07",
            "2020-02-08"
          ]
        }
      ],

      yAxis: [
        {
          name: "单位（个）",
          nameTextStyle: {
            color: "#6c50f3",
            fontSize: 14
          },
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.1)"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#6c50f3"
            }
          },
          axisLabel: {
            show: true,
            margin: 20,
            textStyle: {
              color: "#6c50f3"
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "#6c50f3"
            }
          }
        }
      ],
      series: [
        {
          // name: "周比",
          type: "line",
          smooth: true,
          showAllSymbol: true,
          symbol: "circle",
          symbolSize: 25,
          lineStyle: {
            normal: {
              color: "#6c50f3",
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 5,
              shadowOffsetX: 5
            }
          },
          label: {
            show: true,
            position: "top",
            textStyle: {
              color: "#6c50f3"
            }
          },
          itemStyle: {
            color: "#6c50f3",
            borderColor: "#fff",
            borderWidth: 3,
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2
          },
          tooltip: {
            show: false
          },
          areaStyle: {
            normal: {
              color: new (this as any).$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(108,80,243,0.3)"
                  },
                  {
                    offset: 1,
                    color: "rgba(108,80,243,0)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(108,80,243, 0.9)",
              shadowBlur: 20
            }
          },
          data: [8, 10, 7, 6, 8, 12]
        }
      ]
    };

    myChart.setOption(option);
  }
}
</script>


<style lang="less" scope>
</style>