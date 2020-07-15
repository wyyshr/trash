<template>
  <div id="search">
    <el-input placeholder="请输入ID" prefix-icon="el-icon-search" v-model="input" type="number"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="search"></el-button>
  </div>
</template>


<script lang="ts">
import{Component,Vue,Emit}from 'vue-property-decorator';
import { req1 } from "../network/request";

@Component
export default class Search extends Vue{
  private input: string = ''

  @Emit('sendAllDev')
  private updated() {
    if(this.input == ''){
      return true
    }
  }

  @Emit('sendSearchDev')
  private async search() {
    let res = await req1({
      url: "/admin/findDustbin",
      params: {
        id: this.input
      }
    });
    return JSON.parse(JSON.stringify(res));
  }
}
</script>


<style lang="less" scope>
#search{
  display: flex;
  width: 300px;
}
</style>