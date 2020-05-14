<template>
  <div class="home">
    <Sidebar></Sidebar>
    <MainContainer></MainContainer>
    <TextContainer></TextContainer>
  </div>
</template>

<script>
  import Sidebar from "../components/Sidebar";
  import MainContainer from "../views/MainContainer"
  import TextContainer from "../views/TextContainer"
  export default {
    name: 'Home',
    components: {
      Sidebar,MainContainer,TextContainer
    }
  }
</script>
<style scoped>
  .home {
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>