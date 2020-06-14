<!-- 移动端首页 -->
<template>
  <div class="home" :class="isMobie?'mobie':'pc'">
    <Sidebar></Sidebar>
    <transition tag="div" appear>
      <MainContainer v-if="isTriggle"></MainContainer>
    </transition>
    <TextContainer @Triggle="Triggle" v-if="!isMobie"></TextContainer>
  </div>
</template>

<script>
  import Sidebar from "../components/Sidebar";
  import MainContainer from "../views/MainContainer"
  import TextContainer from "./TextContainer"
  export default {
    components: {
      Sidebar,
      MainContainer,
      TextContainer
    },
    data() {
      return {
        isTriggle: true
      }
    },
    computed:{
      isMobie(){
        return this.$store.state.isMobie;
      }
    },
    methods: {
      Triggle(is) {
        this.isTriggle = is;
      }
    },
    created(){
      this.$store.dispatch("init");
    }
  }
</script>
<style scoped>
  .home {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display:flex;
  }
  .mobie {
    flex-direction: column-reverse;
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