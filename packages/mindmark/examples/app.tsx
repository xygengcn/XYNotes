import { MindMark } from '@/lib';
import { defineComponent, ref } from 'vue';
import "./app.scss"
declare const __MARKDOWN__: string;

export default defineComponent({
  name: 'App',
  setup() {
    // 文本
    const text = ref(__MARKDOWN__);

    return () => (
      <div class="app">
        <h1>MindMark</h1>
        <textarea v-model={text.value}></textarea>
        <MindMark markdown={text.value}></MindMark>
      </div>
    );
  }
});
