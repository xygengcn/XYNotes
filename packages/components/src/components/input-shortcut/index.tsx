import { preventDefault } from '@xynotes/utils';
import { defineComponent } from 'vue';
import './index.scss';

/**
 * 快捷键输入
 */

const ShortcutInput = defineComponent({
  name: 'ShortcutInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  emits: {
    'update:value': (value: string) => value,
    input: (_value: string, _origin: string) => {}
  },
  setup(props, context) {
    /**
     * 原始数据
     */
    let orignalValue = props.value;
    /**
     * 监听键盘
     * @param e
     */

    const onKeydown = (e) => {
      console.info('[shortcut]', e);
      // 阻止事件冒泡
      // e.stopPropagation();
      // 阻止默认事件
      e.preventDefault();

      // 移除
      if (e.key === 'Backspace') {
        e.target.value = '';
        context.emit('update:value', '');
        context.emit('input', '', orignalValue);
        orignalValue = e.target.value;
        return;
      }

      // 提取快捷键，生成字符串，判断至少两个键
      if (e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift' || e.key === 'Meta') {
        return;
      }

      // 功能键
      if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
        const key = [e.ctrlKey && 'Ctrl', e.altKey && 'Alt', e.shiftKey && 'Shift', e.metaKey && 'Cmd', e.code]
          .filter(Boolean)
          .join('+');
        if (key === e.target.value) {
          return;
        }
        e.target.value = key;
        context.emit('update:value', key);
        context.emit('input', key, orignalValue);
        orignalValue = e.target.value;
      }
    };

    /**
     * 输入事件
     * @param e
     */
    const onInput = (e) => {
      preventDefault(e);
      e.target.value = '';
    };
    return () => (
      <input
        class="shortcut-input"
        onKeydown={onKeydown}
        onInput={onInput}
        value={props.value}
        type="text"
        placeholder={props.placeholder}
      ></input>
    );
  }
});

export default ShortcutInput;
