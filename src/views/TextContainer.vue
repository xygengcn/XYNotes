<!-- 显示面板 -->
<template>
  <div id="TextContainer">
    <navbar @editMode="isEdit=!isEdit"></navbar>
    <div class="EditContent">
      <EditTextarea v-if="isEdit"></EditTextarea>
      <ViewTextarea v-if="!isEdit"></ViewTextarea>
    </div>

  </div>
</template>
<script>
  import navbar from "../components/NavBar"
  import EditTextarea from "../components/EditTextarea";
  import ViewTextarea from "../components/ViewTextarea";
  export default {
    name: '',
    components: {
      navbar,
      EditTextarea,
      ViewTextarea
    },
    data() {
      return {
        isEdit: false
      }
    },
    methods: {},
    computed: {

    },
    watch: {

    }
  }
</script>
<style scoped>
  #TextContainer {
    flex: 1;
    display: flex;
    height: 100%;
    max-height: 100%;
    flex-direction: column;
  }

  .EditContent {
    flex: 1;
    height: 100%;
  }
</style>