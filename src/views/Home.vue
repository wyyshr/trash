<template>
  <div>
    <login></login>
  </div>
</template>


<script lang="ts">
import{Component,Vue}from 'vue-property-decorator';
import login from '../components/home/LoginBox1'
// import login from "../components/home/LoginBox.vue";

@Component({
  components: {
    login
  }
})
export default class Home extends Vue{

}
</script>


<style lang="less" scope>

</style>