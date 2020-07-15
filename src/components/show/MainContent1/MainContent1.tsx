import { Component, Vue } from 'vue-property-decorator';
import mainMap from '../MainMap/MainMap'
// import mainMap from '../MainMap.vue'
import chart1 from '../Chart1.vue'
import chart2 from '../Chart2.vue'

import { req1 } from "../../../network/request";

import './MainContent1.less'

@Component({
  components: {
    mainMap,
    chart1,
    chart2
  }
})
export default class MainContent1 extends Vue{
  private show1: boolean = false
  private show2: boolean = false
  private allNum: number = 0
  private activityNum: number = 0
  private unActivityNum: number = 0
  private fullNum: number = 0

  private created() {
    this.getAllDevNum()
    this.getActivityNum()
    this.getUnActivityNum()
    this.getFullNum()
  }

  private showMap(e: boolean) {
    this.show2 = e
    this.show1 = e
  }
  private closeMap() {
    this.show2 = false
    setTimeout(() => {
      this.show1 = false
    }, 300);
  }
  private async getAllDevNum() {
    let res = await req1({
      url: '/admin/equipmentNumber'
    })
    this.allNum = parseInt(res.toString())
  }
  private async getActivityNum() {
    let res = await req1({
      url: '/admin/activityNumber'
    })
    this.activityNum = parseInt(res.toString())
  }
  private async getUnActivityNum() {
    let res = await req1({
      url: '/admin/unActivityNumber'
    })
    this.unActivityNum = parseInt(res.toString())
  }
  private async getFullNum() {
    let res = await req1({
      url: '/admin/fullNumber'
    })
    this.fullNum = parseInt(res.toString())
  }

  protected render() {
    return (
      <div id="main_content">
        <div class="top_nav">
          <div class="all_dev_num">
            <div class="left iconfont icon-shebei1"></div>
            <div class="right">
              <div class="num">{ this.allNum }</div>
              <div class="text">总设备数</div>
            </div>
          </div>
          <div class="activited_num">
            <div class="left iconfont icon-huoyue"></div>
            <div class="right">
              <div class="num">{ this.activityNum }</div>
              <div class="text">活跃数</div>
            </div>
          </div>
          <div class="unactivited_num">
            <div class="left iconfont icon-buhuoyue"></div>
            <div class="right">
              <div class="num">{ this.unActivityNum }</div>
              <div class="text">腐烂</div>
            </div>
          </div>
          <div class="full_num">
            <div class="left iconfont icon-zhanyongqingkuang"></div>
            <div class="right">
              <div class="num">{ this.fullNum }</div>
              <div class="text">满溢数</div>
            </div>
          </div>
        </div>
        <div class="bottom_nav">
          
          <div class="left_nav">
            <main-map onshowMap={ this.showMap }></main-map>
          </div>
          <div class="right_nav">
            <div class="top_bar">
              <h2>每日满溢设备</h2>
              <chart1/>
            </div>
            <div class="bottom_bar">
              <h2>满溢设备占比</h2>
              <chart2></chart2>
            </div>
          </div>
        </div>
        <div class="transition_box" v-show={ this.show1 }>
          <transition name="el-zoom-in-center">
            
            <div v-show={ this.show2 } class="transition-box">
              <el-button plain icon="el-icon-error" onclick={ this.closeMap }></el-button>
              <mainMap show2={ this.show2 }></mainMap>
            </div>
          </transition>
        </div>
        
      </div>
    )
  }
}