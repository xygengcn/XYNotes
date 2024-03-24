import parse from 'ini-simple-parser';
import { defineComponent, nextTick, onMounted, ref } from 'vue';
import Scroller from '../scroller';
import './index.scss';

const EditorConfig = defineComponent({
  name: 'EditorConfig',
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    }
  },
  emits: {
    change: (obj: any, value: string) => obj
  },
  setup(props, context) {
    /**
     * 编辑器节点
     */
    const refEditorContent = ref<HTMLDivElement>();

    /**
     * 输入监听
     * @param e
     */
    const onInput = (e: Event) => {
      try {
        const innerText = refEditorContent.value.innerText.trim();
        if (innerText) {
          const result = parse(innerText);
          context.emit('change', result, innerText);
        }
      } catch (error) {}
    };

    /**
     * 聚焦
     */
    const focus = () => {
      nextTick(() => {
        const range = document.createRange();
        range.selectNodeContents(refEditorContent.value);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      });
    };

    onMounted(() => {
      refEditorContent.value.innerText = props.value;
      focus();
    });

    return {
      refEditorContent,
      onInput
    };
  },
  render() {
    return (
      <Scroller class="editor-config" data-nodrag>
        <div
          class="editor-config-textarea"
          ref="refEditorContent"
          contenteditable
          spellcheck="false"
          onInput={this.onInput}
        ></div>
      </Scroller>
    );
  }
});

export default EditorConfig;
