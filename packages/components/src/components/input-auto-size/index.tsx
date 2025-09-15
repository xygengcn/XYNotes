import { readText } from '@xynotes/utils';
import { defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import './index.scss';

export const InputAutoSize = defineComponent({
  name: 'InputAutoSize',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    change: (_value: string) => true,
    input: (_value: string) => true,
    enter: (_e: Event) => true,
    'update:value': (_value: string) => true,
    blur: (_e: Event, _value: string) => true,
    focus: (_e: Event, _value: string) => true
  },

  setup(props, context) {
    /**
     * 输入计时器
     */
    let inputTimeout: number | null = null;

    /**
     * 输入框
     */
    const refInput = ref(null);

    /**
     * 初始值
     */
    const initValueText = props.value;
    watch(
      () => props.value,
      () => {
        if (props.value !== refInput.value?.innerText) {
          refInput.value.innerText = props.value;
        }
      }
    );

    const handleInput = () => {
      context.emit('input', refInput.value?.innerText || '');
      handleChange();
    };

    const handleChange = () => {
      if (inputTimeout) {
        clearTimeout(inputTimeout);
      }
      inputTimeout = window.setTimeout(() => {
        if (initValueText !== refInput.value?.innerText) {
          context.emit('change', refInput.value?.innerText);
        }
        inputTimeout && clearTimeout(inputTimeout);
      }, 500);
    };

    const handleBlur = (event: Event) => {
      inputTimeout && clearTimeout(inputTimeout);
      context.emit('blur', event, refInput.value?.innerText || '');
      context.emit('change', refInput.value?.innerText || '');
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        context.emit('enter', event);
      }
    };

    const handleFocus = (event: Event) => {
      context.emit('focus', event, refInput.value?.innerText || '');
    };

    const setCursorAfter = (node: Node) => {
      const selection = window.getSelection();
      const range = document.createRange();
      if (!selection) return;
      range && node && range.selectNode && range.selectNode(node);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    };

    const insertText = (text: string) => {
      if (!text) return;
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      range?.deleteContents();
      const textNode = document.createTextNode(text);
      range?.insertNode(textNode);
      selection?.removeAllRanges();
      // 延迟一段时间后设置焦点到插入文本的末尾
      setTimeout(() => {
        setCursorAfter(textNode);
      }, 0);
    };

    const pasteEvent = async (event: ClipboardEvent) => {
      // 阻止默认粘贴行为
      event.preventDefault();
      // 获取粘贴的文本
      let pastedText = await readText();
      pastedText = pastedText.trim();
      // 在 div 中插入粘贴的文本
      insertText(pastedText);
      // 通知改变
      nextTick(() => {
        handleChange();
      });
    };

    onMounted(() => {
      nextTick(() => {
        refInput.value.addEventListener('paste', pasteEvent);
      });
    });

    onBeforeUnmount(() => {
      refInput.value?.removeEventListener('paste', pasteEvent);
      inputTimeout && clearTimeout(inputTimeout);
    });

    return () => (
      <div class={{ inputAutoSize: true, 'inputAutoSize-border': props.border, disabled: props.disabled }} data-nodrag>
        <div class="inputAutoSize-content">
          {h('div', {
            class: { 'inputAutoSize-content-inner': true, disabled: props.disabled },
            ref: refInput,
            placeholder: props.placeholder,
            contenteditable: 'plaintext-only',
            spellcheck: false,
            onInput: handleInput,
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onKeydown: handleKeyDown,
            innerText: initValueText
          })}
        </div>
      </div>
    );
  }
});
