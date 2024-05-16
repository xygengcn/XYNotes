import parse from 'ini-simple-parser';
import { defineComponent, nextTick, onMounted, ref } from 'vue';
import Scroller from '../scroller';
import './index.scss';
import { debounce } from '@/utils/debounce-throttle';
import { readText } from '@/utils/clipboard';

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
        const result = innerText ? parse(innerText) : {};
        context.emit('change', result, innerText);
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
     * 插入
     * @param text
     */
    const insertTextAtCursor = (text: string) => {
      if (window.getSelection) {
        // Get the selection object
        const sel = window.getSelection();
        if (sel.rangeCount) {
          // Get the first range of the selection
          const range = sel.getRangeAt(0);

          // Delete the selected text, if any
          range.deleteContents();

          // Create a new text node with the inserted text
          var textNode = document.createTextNode(text);

          // Insert the new text node at the current cursor position
          range.insertNode(textNode);

          // Move the cursor to the end of the inserted text
          range.setStartAfter(textNode);
          range.setEndAfter(textNode);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    };

    /**
     * 粘贴
     * @param e
     */
    const onPaste = async (e: ClipboardEvent) => {
      e.preventDefault();
      const text = await readText();
      console.log(111, text);
      // 插入文本
      insertTextAtCursor(text);
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
