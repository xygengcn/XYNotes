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

    /**
     * 获取编辑器内容并打印到控制台
     */
    const handleGetContent = () => {
      console.log('content:', editor.value?.getContent());
    };

    /**
     * 计数器回调函数
     *
     * @param e 回调函数参数
     * @returns 无返回值
     */
    const onCounter = (e) => {
      console.log('onCounter', e);
    };
    return () => (
      <div class="app">
        <div class="app-menu">
          <input type="text" v-model={inputText.value} />
          <button onClick={handleInput}>插入</button>
          <button onClick={handleReset}>初始化</button>
          <button onClick={handleGetContent}>获取content</button>
        </div>
        <MarkdownEditor modelValue={text.value} ref={editor} onCounter={onCounter} counter></MarkdownEditor>
      </div>
    );
  }
});
