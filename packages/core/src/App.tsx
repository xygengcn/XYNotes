import { defineComponent, ref, shallowRef } from 'vue';
import MarkdownEditor from './components/editor';
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
    const editor = shallowRef<typeof MarkdownEditor>();

    /**
     * 处理输入事件
     *
     * 将输入框中的内容插入到编辑器中
     */
    const handleInput = () => {
      editor.value?.insertContent(inputText.value);
    };

    /**
     * 初始化
     */
    const handleReset = () => {
      editor.value?.setContent(__MARKDOWN__);
    };

    const onCounter = (e) => {
      console.log('onCounter', e);
    };
    return () => (
      <div class="app">
        <div class="app-menu">
          <input type="text" v-model={inputText.value} />
          <button onClick={handleInput}>插入</button>
          <button onClick={handleReset}>初始化</button>
        </div>
        <MarkdownEditor modelValue={text.value} ref={editor} onCounter={onCounter} count></MarkdownEditor>
      </div>
    );
  }
});
