<template>
  <div id="show">
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <div class="weather">
          <div class="city">{{weather.city}}</div>
          <div class="wea">{{weather.wea}}</div>
          <div class="wea_day">{{weather.wea_day}}</div>
          <div class="tem">{{weather.tem2}} ~ {{weather.tem1}}°</div>
        </div>
        <h2>智能垃圾管理系统</h2>
        <el-button type="info" plain icon="el-icon-switch-button" @click="quit">退出</el-button>
      </el-header>
      <el-container>
        <!-- 左侧 -->
        <el-aside width="230px">
          <left @sendName="getName"></left>
        </el-aside>
        <!-- 内容 -->
        <el-main>
          <div v-show="$store.state.showId == 1">
            <mainContent1></mainContent1>
          </div>
          <div v-show="$store.state.showId == 2">
            <mainContent2></mainContent2>
          </div>
          <div v-show="$store.state.showId == 3">
            <mainContent3></mainContent3>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import left from "../components/show/left/left";
// import left from "../components/show/Left.vue";
import mainContent1 from "../components/show/MainContent1/MainContent1";
// import mainContent1 from "../components/show/MainContent1.vue";
import mainContent2 from "../components/show/MainContent2.vue";
import mainContent3 from "../components/show/MainContent3/MainContent3";
// import mainContent3 from "../components/show/MainContent3.vue";
import { req1 } from "../network/request";
import axios from "axios";

@Component({
  components: {
    left,
    mainContent1,
    mainContent2,
    mainContent3
  }
})
export default class Show extends Vue {
  // private showId: number = 1;
  private weather = {
    wea: "",
    wea_day: "",
    city: "",
    tem1: "",
    tem2: ""
  };

  /**
   * created
   */
  private created() {
    this.getWeather();
    if((this as any).$store.state.refresh){
      (this as any).$store.commit("devClick");
    }
  }

  /**
   * methods
   */
  // 退出登录
  private quit() {
    (this as any)
      .$confirm("此操作将退出登录, 是否继续?", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        localStorage.clear();
        (this as any).$message({
          type: "success",
          message: "退出成功!"
        });
        setTimeout(() => {
          (this as any).$router.replace({
            path: "/"
          });
        }, 500);
      })
      .catch(() => {
        (this as any).$message({
          type: "info",
          message: "已取消退出"
        });
      });
  }
  // 获取天气
  private async getWeather() {
    let res = await axios({
      url:
        "http://www.tianqiapi.com/api?version=v9&appid=23035354&appsecret=8YvlPNrz"
    });
    // this.weather = JSON.parse(JSON.stringify(res.data))
    this.weather.city = res.data.city;
    this.weather.wea = res.data.data[0].wea;
    this.weather.wea_day = res.data.data[0].wea_day;
    this.weather.tem1 = res.data.data[0].tem1;
    this.weather.tem2 = res.data.data[0].tem2;
  }
  // 获取用户名
  private getName(e: string) {
    if(e == ''){
      (this as any).$message.error('还未登录，不可访问~');
      (this as any).$router.replace({
        path: '/'
      })
    }
  }
}
</script>


<style lang="less" scope>
#show {
  height: 100%;
}
.el-header {
  background-color: rgb(94, 94, 94);
  color: #333;
  text-align: center;
  line-height: 60px;
  .weather {
    width: 350px;
    position: fixed;
    left: 10px;
    color: #fff;
    display: flex;

    .city {
      margin: 0 5px;
    }
    .wea {
      margin: 0 5px;
    }
    .wea_day {
      margin: 0 5px;
    }
    .tem {
      margin: 0 5px;
    }
  }
  h2 {
    color: #fff;
  }
  .el-button {
    position: fixed;
    right: 10px;
    top: 10px;
  }
}

.el-aside {
  background-color: rgb(53, 53, 53);
  color: #333;
  text-align: center;
  line-height: 100%;
}

.el-main {
  background-color: rgb(236, 236, 236);
  color: #333;
  text-align: center;
  // line-height: 760px;
}

.el-container {
  height: 100%;
}
</style>