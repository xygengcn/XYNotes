import { defineComponent, ref } from 'vue';
import { Editor, useEditor } from '../src/index';
import '../src/tiptap/index.scss';
import './app.scss';

declare const __MARKDOWN__: string;

export default defineComponent({
  name: 'App',
  setup() {
    // 文本
    const text = ref(__MARKDOWN__);
    // 输入文本
    const inputText = ref('');

    // 编辑器
    const { editor, insertContent, setContent, getMarkdown, setCodeBlock, getData } = useEditor({
      defaultValue: text.value
    });

    /**
     * 处理输入事件
     *
     * 将输入框中的内容插入到编辑器中
     */
    const handleInput = () => {
      insertContent(inputText.value);
    };

    const handleInsertMind = () => {
      setCodeBlock('mindmap', '- 主题1\n  - 主题2\n  - 主题3');
    };

    /**
     * 初始化
     */
    const handleReset = () => {
      setContent(__MARKDOWN__);
    };

    /**
     * 获取编辑器内容并打印到控制台
     */
    const handleGetContent = () => {
      console.log('content:', getMarkdown());
      console.log('json:', getData());
    };

    const handleAddTable = () => {
      // 在表格后面插入一个换行的段落
      const { state } = editor.value;
      const pos = state.selection.from;
      editor.value
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .insertContentAt(pos + 43, { type: 'paragraph' })
        .focus(pos + 1)
        .run();
    };

    return () => (
      <div class="app">
        <div class="app-menu">
          <input type="text" v-model={inputText.value} />
          <button onClick={handleInput}>插入</button>
          <button onClick={handleInsertMind}>插入思维导图</button>
          <button onClick={handleReset}>初始化</button>
          <button onClick={handleGetContent}>获取content</button>
          <button onClick={handleAddTable}>插入表格</button>
        </div>
        <Editor value={text.value}></Editor>
      </div>
    );
  }
});
