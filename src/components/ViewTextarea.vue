<!-- 浏览模式 -->
<template>
  <div class="View" ref="view">
    <div class="ViewHeader">
      <div class="title" v-text="activeNoteText.title"></div>
    </div>
    <div class="ViewContain" @dblclick="dblclick">
      <div class="ViewArea marked" v-html="activeNoteText.html"
        :style="{'font-size':font.size+'px','line-height':font.lineHeight+'em'}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["activeNoteText"],
    computed: {
      font() {
        return this.$store.state.data.font;
      }
    },
    methods:{
      dblclick(){
        console.log(0);
      }
    }
  };
</script>
<style lang='css' scoped>
  .View {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }

  .ViewHeader {
    height: 60px;
    margin-top: 10px;
    padding: 0 50px;
  }

  .mobie .ViewHeader {
    height: 48px;
    margin: 0px;
  }

  .mobie .ViewHeader .title {
    height: 48px;
    line-height: 48px;
  }

  .ViewContain {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px 0px 50px 50px;
  }

  .mobie .ViewContain {
    padding: 0px 0px 50px;
  }

  .mobie .ViewHeader,
  .mobie .View .ViewArea {
    padding: 0px 20px;
    font-size: 1em;
  }

  /* 标题 */
  .ViewHeader .title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border: none;
    outline: none;
    font-family: caecilia, times, serif;
    font-size: 28px;
    font-weight: 300;
    color: #2dbe60;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 1px 0px;
  }

  /* 正文 */
  .View .ViewArea {
    font-family: gotham, helvetica, arial, sans-serif;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    border-top: 1px solid #f7f7f7;
    font-size: 14px;
    line-height: 1.5em;
    padding: 15px 50px 50px 0px;
    overflow: auto;
  }
</style>