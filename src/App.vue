<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style>
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    font-size: 16px;
    margin: 0;
    padding: 0;
    color: #383838;
    font-family: gotham, helvetica, arial, sans-serif;
  }

  a,
  button {
    -webkit-tap-highlight-color: transparent;
    outline: none;
  }

  .noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
<style>
@media screen and (max-width: 750px) {
  .el-message-box ,.el-dialog{
    width: 60% !important;
  }
}
</style>