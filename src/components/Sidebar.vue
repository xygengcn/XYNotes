<!-- 左侧菜单 -->
<template>
  <div id="sidebar">
    <router-link to="/">
      <div id="logo">
        <img src="../assets/logo.png" alt="">
      </div>
    </router-link>
    <div class="toolbar">
       <router-link to="/">
        <div class="sideBtn" @click="addNote">
          <i class="el-icon-plus" aria-hidden="true"></i>
        </div>
      </router-link>
      <router-link to="/">
        <div class="sideBtn" :class="{active:$route.path=='/'}">
          <i class="el-icon-s-order" aria-hidden="true"></i>
        </div>
      </router-link>
      <router-link to="/mark">
        <div class="sideBtn" :class="{active:$route.path=='/mark'}">
          <i class="el-icon-star-on" aria-hidden="true"></i>
        </div>
      </router-link>
      
      <router-link to="/backup">
        <div class="sideBtn" :class="{active:$route.path=='/backup'}">
          <i class="el-icon-upload" aria-hidden="true"></i>
        </div>
      </router-link>
      <router-link to="/setting">
        <div class="sideBtn" :class="{active:$route.path=='/setting'}">
          <i class="el-icon-s-tools" aria-hidden="true"></i>
        </div>
      </router-link>
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
      addNote() {
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
  .mobie #sidebar{
    /* position: absolute;
    bottom: 0; */
    display:flex;
    flex-direction: row;
    height: 73px;
    width: 100%;
  }
  .mobie .toolbar{
    width: 100%;
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
  }
</style>