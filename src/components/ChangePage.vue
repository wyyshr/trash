<template>
  <div>
    <el-pagination
      background
      layout="prev, pager, next"
      :data="tableData"
      :page-size="pagesize"
      @current-change="current_change"
      :total="allArr.length"
    ></el-pagination>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator";

@Component
export default class ChangePage extends Vue {
  @Prop() private pagesize!: number;
  private currentPage: number = 0;
  private tableData: Array<any> = [];
  @Prop() private allArr!: Array<any>;

  @Watch('allArr')
  @Emit("sendCurrentPage")
  private sendPageData(): number {
    console.log('返回页码',this.tableData.length == 1,(this as any).$store.state.isDelete);
    if(this.tableData.length == 1 && (this as any).$store.state.isDelete){
      return this.currentPage - 1 
    }else{
      return this.currentPage;
    }
  }
  @Watch('currentPage')
  @Emit('sendCurrentPage')
  private onPageChange() {
    console.log('页码变化');
    
    return this.currentPage
  }

  /**
   * methods
   */
  @Emit("sendTableData")
  private current_change(e: any) {
    this.currentPage = e - 1;
    let arr = this.allArr;
    if (arr.length > this.pagesize) {
      this.tableData = arr.slice(
        this.currentPage * this.pagesize,
        (this.currentPage + 1) * this.pagesize
      );
    }
    return this.tableData;
  }
}
</script>


<style lang="less" scope>
</style>