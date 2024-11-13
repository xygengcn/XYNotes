import { Editor } from '@tiptap/core';
import Eventemitter from 'eventemitter3';
import { onBeforeUnmount, onMounted, shallowRef, getCurrentInstance } from 'vue';
import { extensions } from './extensions';
import './index.scss';

type callback = ((...args: any) => void) | null;

export const defineMarkdownEditor = () => {
  const editor = shallowRef<Editor>();
  const editorEvent = new Eventemitter();

  /**
   * 获取 Markdown 内容
   *
   * @returns 返回 Markdown 文本内容
   */
  const getContent = () => {
    return editor.value?.storage.markdown.getMarkdown();
  };

  /**
   * 插入内容到编辑器中
   *
   * @param value 要插入的内容
   * @returns 插入内容后的操作结果
   */
  const insertContent = (value: string) => {
    return editor.value?.commands.insertContent(value);
  };

  /**
   * 设置是否能编辑
   * @param value
   * @returns
   */
  const setEditable = (value: boolean) => {
    return editor.value?.setEditable(value);
  };

  /**
   * 设置值
   * @param content
   * @returns
   */
  const setContent = (content: string) => {
    return editor.value?.commands.setContent(content);
  };

  return (options: { defaultValue: string; editable?: boolean; counter: boolean }) => {
    const instance = getCurrentInstance();

    // 编辑器事件
    let createdCallback: callback = null;
    let changeCallback: callback = null;
    let blurCallback: callback = null;
    let counterCallback: callback = null;
    let focusCallback: callback = null;
    const onCreated = (cb: (editor: Editor) => void) => {
      if (createdCallback) editorEvent.off('created', createdCallback);
      editorEvent.on('created', (createdCallback = cb));
    };
    const onChange = (cb: (editor: Editor) => void) => {
      if (changeCallback) editorEvent.off('change', changeCallback);
      editorEvent.on('change', (changeCallback = cb));
    };
    const onBlur = (cb: (editor: Editor) => void) => {
      if (blurCallback) editorEvent.off('blur', blurCallback);
      editorEvent.on('blur', (blurCallback = cb));
    };
    const onFocus = (cb: (editor: Editor) => void) => {
      if (focusCallback) editorEvent.off('focus', focusCallback);
      editorEvent.on('focus', (focusCallback = cb));
    };
    const onCounter = (cb: (editor: Editor) => void) => {
      if (counterCallback) editorEvent.off('counter', counterCallback);
      editorEvent.on('counter', (counterCallback = cb));
    };

    onMounted(() => {
      if (instance?.refs.editor) {
        editor.value = new Editor({
          element: instance?.refs.editor as HTMLDivElement,
          content: options.defaultValue,
          extensions: extensions,
          editable: options.editable ?? true,
          onCreate() {
            editorEvent.emit('created', editor.value);
          },
          onUpdate({ editor }) {
            // 改变
            editorEvent.emit('change', editor);
            // 计数
            options.counter && editorEvent.emit('counter', editor);
          },
          onBlur() {
            editorEvent.emit('blur', editor.value);
          },
          onFocus() {
            editorEvent.emit('focus', editor.value);
          }
        });
      }
    });
    onBeforeUnmount(() => {
      createdCallback && editorEvent.off('created', createdCallback);
      changeCallback && editorEvent.off('change', changeCallback);
      blurCallback && editorEvent.off('blur', blurCallback);
      counterCallback && editorEvent.off('counter', counterCallback);
      focusCallback && editorEvent.off('focus', focusCallback);
      if (instance?.refs.editor) {
        editor.value?.destroy();
        editorEvent.removeAllListeners();
      }
    });
    return {
      editor,
      onCreated,
      onChange,
      onBlur,
      onFocus,
      onCounter,
      getContent,
      insertContent,
      setEditable,
      setContent
    };
  };
};
