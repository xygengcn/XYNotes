<!-- 浏览模式 -->
<template>
  <div class="View">
    <div ref="view">
      <div class="ViewHeader">
        <div class="title" v-text="activeNoteText.title"></div>
      </div>
      <div class="ViewContain">
        <div class="ViewArea" v-html="activeNoteText.html"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:["activeNoteText"]
  };
</script>
<style lang='css'>
  .ViewHeader {
    height: 60px;
    margin-top: 10px;
    padding: 0 50px;
  }

  .ViewContain {
    width: 100%;
    padding: 0px 50px;
    box-sizing: border-box;
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
    width: calc(100% - 10px);
    box-sizing: border-box;
    height: 100%;
    border-top: 1px solid #f7f7f7;
    font-size: 14px;
    line-height: 1.5em;
    padding: 15px 0px 50px 0px;
    overflow: hidden;
  }

  .View .ViewArea p>code,
  .View .ViewArea span>code,
  .View .ViewArea li>code {
    margin: 0px 5px;
    border: 1px solid #ddd;
    background: #f6f6f6;
    padding: 3px;
    border-radius: 3px;
    font-size: 14px;
    color: #dc9696;
  }

  .View blockquote {
    color: #666;
    border-left: 4px solid #ddd;
    padding: 8px 15px;
    margin-left: 0;
    background-color: #f5f5f5;
  }

  .View pre {
    width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
    background: #333;
    padding: 10px 30px;
    color: #ccc;
    box-sizing: border-box;
  }

  .View ul,
  .View ol {
    padding: 0;
    margin: 0;
    padding-left: 20px;
  }
</style>