<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
html{
  background: url('./assets/img/back.png') no-repeat 0 0;
  background-position:50% 50% ;
  background-size:100%;
  background-attachment: fixed;
  overflow: hidden;
  height: 100%;
  body{
    height: 100%;
    #app{
      height: 100%;
    }
  }
}


</style>
