<template>
  <div>
    <div class="page_change_search">
      <!-- 翻页 -->
      <div class="chag">
        <change-page @sendTableData="getTableData" @sendCurrentPage="getCurrentPage" :allArr="allArr" :pagesize="pagesize"></change-page>
      </div>
      <!-- 搜索框 -->
      <div class="seac">
        <search @sendSearchDev="getSearchDev" @sendAllDev="showAllDev"></search>
      </div>
    </div>
    <!-- 信息表 -->
    <el-table :data="searchArr[0]?searchArr:tableData" style="width: 100%">
      <el-table-column label="id" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>名称: {{ scope.row.dustbinName }}</p>
            <p>地址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.dustbinName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="180">
        <template slot-scope="scope">
          <i class="el-icon-position"></i>
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可回收容量" width="180">
        <template slot-scope="scope">
          <i class="iconfont icon-kehuishouwu"></i>
          <span style="margin-left: 10px">{{ scope.row.recycle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="不可回收容量" width="180">
        <template slot-scope="scope">
          <i class="iconfont icon-bukehuishou_huaban1"></i>
          <span style="margin-left: 10px">{{ scope.row.unrecycle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.times }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除设备</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加设备 -->
    <div class="add_btn">
      <el-button type="primary" icon="el-icon-plus" @click="addClick">添加设备</el-button>
    </div>
    <addDev @sendDev="getDev" @sendIsAdd="getIsAdd"></addDev>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import search from "../Search.vue";
import changePage from "../ChangePage.vue";
import addDev from "./AddDev.vue";

import { req1 } from "../../network/request";

@Component({
  components: {
    search,
    changePage,
    addDev
  }
})
export default class MainContent2 extends Vue {
  // data
  private dialogFormVisible: boolean = false;
  private pagesize: number = 8;
  private currentPage: number = 0;
  private tableData: Array<any> = [];
  private allArr: Array<any> = [];
  private searchArr: Array<any> = [];
  private isdelete: boolean = false
  private isadd: boolean = false
  /**
   * cerated
   * - table第一页显示数据
   */
  private async created() {
    let res = await req1({
      url: "/user/findDustbin"
    });
    this.allArr = JSON.parse(JSON.stringify(res));

    let arr = this.allArr;
    this.tableData = arr.slice(
      this.currentPage * this.pagesize,
      (this.currentPage + 1) * this.pagesize
    );
  }
  /**
   * watch
   * - 监听是否添加
   * - 监听是否删除
   */
  @Watch('isadd')
  private async onIsaddChange() {
    console.log('添加后渲染');
    let res = await req1({
      url: "/user/findDustbin"
    });
    this.allArr = JSON.parse(JSON.stringify(res));

    let arr = this.allArr;
    this.tableData = arr.slice(
      this.currentPage * this.pagesize,
      (this.currentPage + 1) * this.pagesize
    );
    this.isadd = false
    this.isdelete = false
  }
  @Watch('isdelete')
  private async onIsdeleteChange() {
    console.log('删除后渲染');
    let res = await req1({
      url: "/user/findDustbin"
    });
    this.allArr = JSON.parse(JSON.stringify(res));

    let arr = this.allArr;
    this.tableData = arr.slice(
      this.currentPage * this.pagesize,
      (this.currentPage + 1) * this.pagesize
    );
    this.isdelete = false
  }

  /**
   * methods
   */
  private getIsAdd(e: boolean) {
    this.isadd = e
  }

  private getTableData(e: any) {
    (this as any).$store.commit('initDelete')
    this.tableData = e;
  }

  private getCurrentPage(e: number) {
    this.currentPage = e
  }

  private addClick() {
    (this as any).$store.commit("addClick");
  }

  private getDev(e: any) {
    this.allArr = e;
  }

  private handleDelete(index: number, row: any) {
    (this as any)
      .$confirm("此操作将永久删除该设备, 是否继续?", "删除设备", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        req1({
          url: "/admin/deleteDustbin",
          params: {
            id: row.id
          }
        }).then((res: any) => {
          if (res.toString() == "success") {
            // console.log((this as any).$store.state.isDelete);
            (this as any).$message({
              message: "删除成功",
              type: "success"
            });
            (this as any).$store.commit('delete')
            this.isdelete = true
          }
        })

      })
      .catch(() => {
        (this as any).$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }

  private getSearchDev(e: any) {
    let arr = [];
    arr.push(e);
    this.searchArr = arr;
  }
  private showAllDev(e: boolean) {
    this.searchArr = [];
  }
}
</script>


<style lang="less" scope>
.page_change_search {
  display: flex;
  justify-content: flex-start;
  .chag {
    flex: 1;
    text-align: left;
  }
  .seac {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}
.add_btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.icon-bukehuishou_huaban1 {
  font-size: 22px;
}
</style>