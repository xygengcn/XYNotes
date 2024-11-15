import { defineComponent, ref, shallowRef } from 'vue';
import './editor/index.scss';
import './app.scss';
import { defineMarkdownEditor } from './editor/hook';

declare const __MARKDOWN__: string;

const useMarkdownEditor = defineMarkdownEditor();

export default defineComponent({
  name: 'App',
  setup() {
    // 文本
    const text = ref(__MARKDOWN__);
    // 输入文本
    const inputText = ref('');

    // 编辑器
    const { insertContent, setContent, getContent } = useMarkdownEditor({ defaultValue: text.value });

    /**
     * 处理输入事件
     *
     * 将输入框中的内容插入到编辑器中
     */
    const handleInput = () => {
      insertContent(inputText.value);
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
      console.log('content:', getContent());
    };

    return () => (
      <div class="app">
        <div class="app-menu">
          <input type="text" v-model={inputText.value} />
          <button onClick={handleInput}>插入</button>
          <button onClick={handleReset}>初始化</button>
          <button onClick={handleGetContent}>获取content</button>
        </div>
        {/* <MarkdownEditor modelValue={text.value} ref={editor} onCounter={onCounter} counter></MarkdownEditor> */}
        <div class="markdown-editor" ref="editor"></div>
      </div>
    );
  }
});
