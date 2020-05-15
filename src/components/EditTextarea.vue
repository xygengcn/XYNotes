<template>
  <div class="Edit">
    <div class="EditHeader">
      <input type="text" class="title" :value="activeNoteText.title" @blur="editTitle" placeholder="写下笔记标题" />
      <em class="tag">正在编辑</em>
    </div>
    <div class="EditContain">
      <textarea id="EditArea" class="EditArea" :value="activeNoteText.text" @blur="editNote" @input="autoSave"
        @keydown="handleEvent" placeholder="直接开始输入" ref="EditArea"></textarea>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        autosave: null,
        isSave: true, //防止多次保存
        marked: ""
      };
    },
    computed: {
      activeNoteText() {
        return this.$store.state.note;
      }
    },
    watch: {},
    methods: {
      editNote: function (e) {
        if (!this.isSave) {
          this.save(e);
          clearTimeout(this.autosave);
          this.upload();
        }
      },
      editTitle: function (e) {
        var text = e.target.value;
        this.$store.commit("setTitle", text);
        this.editTime();
        this.upload();
      },
      editTime: function () {
        var time = this.$utils.getTime();
        this.$store.commit("setTime", time);
      },
      //无操作5s自动保存
      autoSave: function (e) {
        var event = e;
        this.isSave = false;
        this.save(event);
        if (this.autosave != null) {
          clearTimeout(this.autosave);
        }
        this.autosave = setTimeout(() => {
          this.upload();
        }, 5000);
      },
      //保存操作
      save(e) {
        var text = e.target.value;
        this.$store.commit("setText", text);
        let html = this.marked(text);
        this.$store.commit("setHtml", html);
        this.editTime();
        this.$store.commit("removeNote");
      },
      upload() {
        clearTimeout(this.autosave);
        this.isSave = true;
        if (this.$store.state.data.configs.isLocalStorage) {
          this.$store.dispatch("isLocalStorageSave");
        }
        console.log("自动保存成功");
      },
      //键盘监听
      handleEvent(event) {
        if (event.keyCode === 83 && event.ctrlKey) {
          this.upload();
          this.$message({
            message: "保存成功",
            type: "success"
          });
          event.preventDefault();
          event.returnValue = false;
          return false;
        }
        if (event.keyCode == 9) {
          this.insertText(this.$refs.EditArea, '\t');
          if (event.preventDefault) {
            event.preventDefault();
          }
        }
      },
      //插入文本
      insertText(obj, tabStr) {
        if (document.selection) {
          var sel = document.selection.createRange();
          sel.text = tabStr;
        } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
          var startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            cursorPos = startPos,
            tmpStr = obj.value;
          obj.value = tmpStr.substring(0, startPos) + tabStr + tmpStr.substring(endPos, tmpStr.length);
          cursorPos += tabStr.length;
          obj.selectionStart = obj.selectionEnd = cursorPos;
        } else {
          obj.value += tabStr;
        }
      }
    },

    beforeMount() {
      //初始化md句柄
      this.marked = require('marked');
    }
  };
</script>
<style lang='css' scoped>
  .Edit {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }

  .EditHeader {
    height: 60px;
    margin-top: 10px;
    padding: 0 50px;
    position: relative;
  }

  .EditContain {
    width: 100%;
    height: 100%;
    padding: 0px 50px;
    box-sizing: border-box;
  }

  /* 标题 */
  .EditHeader .title,
  .title::-webkit-input-placeholder {
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
  }

  .tag {
    position: absolute;
    font-style: normal;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 1.5em;
    line-height: 1.5em;
    font-size: 12px;
    right: 50px;
    padding: 2px 5px;
    box-sizing: border-box;
    display: inline-block;
    background: #f7f7f7;
    color: #adacac;
  }

  /* 正文 */
  .EditArea {
    font-family: gotham, helvetica, arial, sans-serif;
    width: calc(100% - 10px);
    box-sizing: border-box;
    height: 100%;
    border: none;
    outline: none;
    border-top: 1px solid #f7f7f7;
    border-radius: 0;
    font-size: 14px;
    line-height: 1.5em;
    resize: none;
    padding: 15px 0px 50px 0px;
    -webkit-appearance: none;
  }
</style>
<style lang="css">
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    height: 200px;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: #f5f5f5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #eeeeee;
  }
</style>