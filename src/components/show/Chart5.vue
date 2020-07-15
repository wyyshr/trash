<template>
  <div>
    <div id="myChart5" :style="{width: '500px', height: '320px'}"></div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Chart5 extends Vue {
  private mounted() {
    this.drawLine();
  }
  private drawLine() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = (this as any).$echarts.init(
      document.getElementById("myChart5")
    );
    let option = {
      backgroundColor: "#2c343c",
      title: {
        text: "投递最低TOP3",
        left: "center",
        top: 20,
        textStyle: {
          color: "#ccc"
        }
      },

      tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)"
      },

      visualMap: {
        show: false,
        min: 500,
        max: 600,
        inRange: {
          //colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "50%",
          center: ["50%", "50%"],
          color: ["rgb(131,249,103)", "#FBFE27", "#FE5050", "#1DB7E5"], //'#FBFE27','rgb(11,228,96)','#FE5050'
          data: [
            {
              value: 28,
              name: "设备7"
            },
            {
              value: 41,
              name: "设备2"
            },
            {
              value: 14,
              name: "设备8"
            }
          ].sort(function(a: any, b: any) {
            return a.value - b.value;
          }),
          roseType: "radius",

          label: {
            normal: {
              formatter: ["{c|{c}次}", "{b|{b}}"].join("\n"),
              rich: {
                c: {
                  color: "rgb(241,246,104)",
                  fontSize: 20,
                  fontWeight: "bold",
                  lineHeight: 5
                },
                b: {
                  color: "rgb(98,137,169)",
                  fontSize: 15,
                  height: 40
                }
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: "rgb(98,137,169)"
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              shadowColor: "rgba(0, 0, 0, 0.8)",
              shadowBlur: 50
            }
          }
        }
      ]
    };

    myChart.setOption(option);
  }
}
</script>


<style lang="less" scope>
</style>