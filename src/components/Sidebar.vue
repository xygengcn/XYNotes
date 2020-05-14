<!-- 左侧菜单 -->
<template>
  <div id="sidebar">
    <div id="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="toolbar">
      <div class="sideBtn" @click="addNote">
        <i class="el-icon-plus" aria-hidden="true"></i>
      </div>
      <div class="sideBtn">
        <i class="el-icon-s-order" aria-hidden="true"></i>
      </div>
      <div class="sideBtn">
        <i class="el-icon-star-on" aria-hidden="true"></i>
      </div>
      <div class="sideBtn">
        <i class="el-icon-upload" aria-hidden="true"></i>
      </div>
      <div class="sideBtn">
        <i class="el-icon-s-tools" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    computed: {

    },
    methods: {
      addNote(){
        this.$store.commit("addNote");
      }
    }
  };
</script>

<style scoped>
  #sidebar {
    width: 73px;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    border-right: 1px solid #ececec;
    background-color: #f8f8f8;
    -webkit-app-region: drag;
    padding: 15px;
  }

  #logo {
    width: 36px;
    height: 100px;
    text-align: center;
  }

  #logo img {
    height: 36px;
    line-height: 36px;
    font-size: 2em;
  }

  .sideBtn {
    width: 36px;
    height: 36px;
    margin-bottom: 20px;
    border-radius: 18px;
    background-color: #fff;
    color: #2dbe60;
    border: #eee 1px solid;
    text-align: center;
    cursor: pointer;
    -webkit-app-region: no-drag;
  }

  .sideBtn i {
    height: 36px;
    line-height: 36px;
    font-size: 1.5em;
  }

  .sideBtn:hover,
  .sideBtn.active {
    background-color: #2dbe60;
    color: #fff;
    border: #2dbe60 1px solid;
  }
</style>