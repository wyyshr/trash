import { Component, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class'
import './leftTab.less'

@Component
export default class LeftTab extends Vue {

  @Mutation('homeClick') private homeClick!: Function
  // private homeClick() {
  //   this.$store.commit('homeClick')
  // }
  @Mutation('devClick') private devClick!: Function
  // private devClick() {
  //   this.$store.commit('devClick')
  // }
  @Mutation('deliverClick') private deliverClick!: Function
  // private deliverClick() {
  //   this.$store.commit('deliverClick')
  // }
  protected render() {
    return (
      <div id="left_tab">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#E6A23C"
        >
          <el-menu-item index="1" onclick={this.homeClick}>
            <i class="iconfont icon-shouye"></i>
            <span slot="title">首页信息</span>
          </el-menu-item>
          <el-menu-item index="2" onclick={this.devClick}>
            <i class="iconfont icon-shebei"></i>
            <span slot="title">设备管理</span>
          </el-menu-item>
          <el-menu-item index="3" onclick={this.deliverClick}>
            <i class="iconfont icon-toudi"></i>
            <span slot="title">投递信息</span>
          </el-menu-item>
        </el-menu>
      </div>
    )
  }
}