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
    const { insertContent, setContent, getMarkdown, setCodeBlock, getData } = useEditor({ defaultValue: text.value });

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

    return () => (
      <div class="app">
        <div class="app-menu">
          <input type="text" v-model={inputText.value} />
          <button onClick={handleInput}>插入</button>
          <button onClick={handleInsertMind}>插入思维导图</button>
          <button onClick={handleReset}>初始化</button>
          <button onClick={handleGetContent}>获取content</button>
        </div>
        <Editor value={text.value}></Editor>
      </div>
    );
  }
});
