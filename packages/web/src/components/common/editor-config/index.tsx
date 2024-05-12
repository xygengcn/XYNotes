import parse from 'ini-simple-parser';
import { defineComponent, nextTick, onMounted, ref } from 'vue';
import Scroller from '../scroller';
import './index.scss';
import { debounce } from '@/utils/debounce-throttle';

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
    change: (obj: any, value: string) => obj,
    save: (obj: any, value: string) => obj
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
    const onInput = debounce(() => {
      try {
        const innerText = refEditorContent.value.innerText.trim();
        if (innerText) {
          const result = parse(innerText);
          context.emit('change', result, innerText);
        }
      } catch (error) {}
    }, 1000);

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

    /**
     * 粘贴
     * @param e
     */
    const onPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      // 插入文本
      document.execCommand('insertHTML', false, text);
    };

    /**
     * 监听
     * @param e
     */
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === 's') || (e.metaKey && e.key === 's')) {
        const innerText = refEditorContent.value.innerText.trim();
        if (innerText) {
          const result = parse(innerText);
          context.emit('save', result, innerText);
        }
      }
    };

    onMounted(() => {
      refEditorContent.value.innerText = props.value;
    });

    return {
      refEditorContent,
      onInput,
      onPaste,
      onKeyDown,
      focus
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
          onPaste={this.onPaste}
          onKeydown={this.onKeyDown}
        ></div>
      </Scroller>
    );
  }
});

export default EditorConfig;
