<!-- 显示面板 -->
<template>
  <div id="TextContainer">
    <navbar @editMode="editMode"></navbar>
    <div class="EditContent">
      <EditTextarea v-if="mode==1 || mode ==2" class="panel"></EditTextarea>
      <ViewTextarea v-if="mode==0 || mode ==2" class="panel"></ViewTextarea>
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
        mode: 0
      }
    },
    methods: {
      editMode(mode) {
        this.mode = mode;
      }
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
    display: flex;
  }

  .EditContent .panel {
    flex: 1;
    border-right: 1px solid #ccc;
  }
</style>