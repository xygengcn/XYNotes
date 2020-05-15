<template>
  <div class="home">
    <Sidebar></Sidebar>
    <transition tag="div" appear>
      <MainContainer v-if="isTriggle"></MainContainer>
    </transition>
    <TextContainer @Triggle="Triggle"></TextContainer>
  </div>
</template>

<script>
  import Sidebar from "../components/Sidebar";
  import MainContainer from "../views/MainContainer"
  import TextContainer from "../views/TextContainer"
  export default {
    name: 'Home',
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
    methods: {
      Triggle(is) {
        this.isTriggle = is;
      }
    },
    created(){
      if(localStorage.getItem("XYNOTESCONFIGS")){
        this.$store.commit("setConfigs",JSON.parse(localStorage.getItem("XYNOTESCONFIGS")))
      }

      if(localStorage.getItem("XYNOTESDATA") && this.$store.state.data.configs.isLocalStorage){
        this.$store.commit("setNotes",JSON.parse(localStorage.getItem("XYNOTESDATA")))
      }
    }
  }
</script>
<style scoped>
  .home {
    display: flex;
    width: 100%;
    height: 100%;
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