<template>
  <div>
    <el-dialog title="添加设备" :visible.sync="$store.state.dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="垃圾桶" :label-width="formLabelWidth">
          <el-input
            prefix-icon="el-icon-delete"
            placeholder="请输入垃圾桶名称"
            v-model="form.trash"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input
            prefix-icon="el-icon-position"
            placeholder="请输入垃圾桶地址"
            v-model="form.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="经度" :label-width="formLabelWidth">
          <el-input
            prefix-icon="el-icon-guide"
            type="number"
            placeholder="请输入垃圾桶经度"
            v-model="form.lng"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="纬度" :label-width="formLabelWidth">
          <el-input
            prefix-icon="el-icon-discount"
            type="number"
            placeholder="请输入垃圾桶纬度"
            v-model="form.lat"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="可回收" :label-width="formLabelWidth">
          <div class="recy">
            <el-input
              class="left"
              type="number"
              placeholder="请输入垃圾桶容量"
              v-model="form.recycled.size"
              autocomplete="off"
            ></el-input>
            <el-input
              class="right"
              type="number"
              placeholder="请输入最大满溢值"
              v-model="form.recycled.min"
              autocomplete="off"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="不可回收" :label-width="formLabelWidth">
          <div class="unrecy">
            <el-input
              class="left"
              type="number"
              placeholder="请输入垃圾桶容量"
              v-model="form.Unrecycle.size"
              autocomplete="off"
            ></el-input>
            <el-input
              class="right"
              type="number"
              placeholder="请输入最大满溢值"
              v-model="form.Unrecycle.min"
              autocomplete="off"
            ></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleAdd">取 消</el-button>
        <el-button type="primary" @click="sureAdd(),sureAdd1()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { req1 } from "../../network/request";

@Component
export default class AddDev extends Vue {
  @Prop() private dialogFormVisible!: boolean;
  private formLabelWidth: string = "120px";
  private allArr: Array<any> = [];
  private form = {
    trash: "",
    address: "",
    lng: "",
    lat: "",
    recycled: {
      size: "",
      min: ""
    },
    Unrecycle: {
      size: "",
      min: ""
    }
  };

  private cancleAdd() {
    (this as any).$store.commit("cancleAdd");
  }
  @Emit('sendDev')
  private async sureAdd() {
    (this as any).$store.commit("sureAdd");

    let res = await req1({
      url: "/admin/fillDustbin",
      params: {
        dustbinName: this.form.trash,
        address: this.form.address,
        longitude: this.form.lng,
        latitude: this.form.lat,
        recycle: this.form.recycled.size,
        unrecycle: this.form.Unrecycle.size,
        recyclelimit: this.form.recycled.min,
        unrecyclelimit: this.form.Unrecycle.min,
      }
    });
    
    if (res.toString() == "success") {
      (this as any).$message({
          message: "添加成功",
        type: "success"
      });
      let res1 = await req1({
        url: "/user/findDustbin"
      });
      this.allArr = JSON.parse(JSON.stringify(res1))
    }
    return this.allArr
  }
  @Emit('sendIsAdd')
  private sureAdd1() {
    return true
  }
}
</script>


<style lang="less" scope>
.recy {
  display: flex;
  .left {
    margin-right: 10px;
  }
  .right {
    margin-left: 10px;
  }
}
.unrecy {
  display: flex;
  .left {
    margin-right: 10px;
  }
  .right {
    margin-left: 10px;
  }
}
</style>