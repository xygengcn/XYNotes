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

  a {
    -webkit-tap-highlight-color: transparent;
    outline: none;
  }
</style>