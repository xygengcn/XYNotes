<!-- 移动端首页 -->
<template>
  <div class="wrap" v-loading="isLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <sidebar></sidebar>
    <transition tag="div" appear>
      <main-container v-if="isTriggle"></main-container>
    </transition>
    <text-container @Triggle="Triggle" v-if="!isMobie" @changeLoading="changeLoading"></text-container>
  </div>
</template>
<script>
  import sidebar from "../components/SideBar";
  import MainContainer from "../views/MainContainer"
  import TextContainer from "./TextContainer"
  export default {
    components: {
      sidebar,
      MainContainer,
      TextContainer
    },
    data() {
      return {
        isTriggle: true,
        isLoading:false,
      }
    },
    computed: {
      isMobie() {
        return this.$store.state.isMobie;
      }
    },
    methods: {
      Triggle(is) {
        this.isTriggle = is;
      },
      changeLoading(isLoading){
        this.isLoading =isLoading;
      }
    },
    created() {
      this.$store.dispatch("init");
      this.$plugins.init("start");
    }
  }
</script>
<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
  }

  .v-enter,
  .v-leave-to {
    opacity: 0;
    transform: translateX(-300px);
  }

  .v-enter-active,
  .v-leave-active {
    transition: all .5s ease;
  }

  .v-move {
    transition: all .5s ease;
  }

  .v-leave-active {
    position: absolute;
  }
</style>