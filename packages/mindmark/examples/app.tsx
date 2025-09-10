import { MindMark, MindMarkElement } from '@/lib';
import { defineComponent, ref } from 'vue';
import './app.scss';
declare const __MARKDOWN__: string;
customElements.define('mind-mark', MindMarkElement);

export default defineComponent({
  name: 'App',
  setup() {
    // 文本
    const text = ref(__MARKDOWN__);

    return () => (
      <div class="app">
        <h1>MindMark</h1>
        <textarea v-model={text.value}></textarea>
        <div class="app-content">
          <MindMark markdown={text.value}></MindMark>
          <mind-mark markdown={text.value}></mind-mark>
        </div>
      </div>
    );
  }
});
