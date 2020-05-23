<!-- 编辑器 -->
<template>
    <div class="">
        <textarea class="EditArea" v-model="markdString" />
        <div class="markdown-body vm-markdown-body" v-html="htmlString" ></div>
</div>
</template>
<script>
import marked from 'marked';
export default {
  props:{
      defaultText: {
            type: String,
            default: ''
        },
  },
  data() {
    return {
      markdString: '',
        htmlString: ''
    }
  },
  methods: {
    
  },
  computed: {
    
  },
  watch: {
    markdString(value) {
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            })
            this.htmlString = marked(value)
        },
  }
}
</script>
<style scoped>
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
    position: relative;
  }
</style>