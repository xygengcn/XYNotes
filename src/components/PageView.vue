<!-- 中间栏模板 -->
<template>
  <div class="main-wrap">
    <div class="title">
      <i :class="icon"></i>{{title}}
    </div>
    <div class="main-wrap-container">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['title', "icon"]
  }
</script>
<style scoped>
  .main-wrap {
    color: #878787;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }

  .main-wrap>.title {
    padding: 0px 20px;
    height: 60px;
    line-height: 60px;
    color: #878787;
    box-sizing: border-box;
    border-bottom: 1px solid #d9d9d9;
  }

  .main-wrap .title i {
    margin-right: 10px;
    color: #878787;
  }

  .main-wrap .main-wrap-container {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    padding-bottom: 20px;
  }
</style>