<template>
  <div id="app">
    <Home></Home>
  </div>
</template>
<script>
  import Home from './views/Home';
  export default {
    name: "App",
    components: {
      Home
    }
  };
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  color: #383838;
}
</style>