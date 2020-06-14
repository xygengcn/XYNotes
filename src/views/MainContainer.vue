<!-- 控制面板 -->
<template>
  <div id="MainContainer">
    <router-view></router-view>
  </div>
</template>
<style scoped>
  .mobie #MainContainer {
    height: calc( 100% - 73px);
    flex: 1;
    border-right: 1px solid #d9d9d9;
  }

  .pc #MainContainer {
    width: 300px;
    height: 100%;
    border-right: 1px solid #d9d9d9;
  }
</style>