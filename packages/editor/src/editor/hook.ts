import { Editor } from '@tiptap/core';
import Eventemitter from 'eventemitter3';
import { onBeforeUnmount, onMounted, shallowRef, getCurrentInstance } from 'vue';
import { extensions } from './extensions';
import './index.scss';

type callback = ((...args: any) => void) | null;

/**
 * 定制编辑器
 * @returns
 */
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
   * 获取结构数据
   *
   * @returns 返回结构数据
   */
  const getData = () => {
    return editor.value?.storage.markdown.getData();
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

  /**
   * 获取字数
   * @returns
   */
  const getCounter = () => {
    return {
      characters: editor.value?.storage.characterCount.characters() || 0,
      words: editor.value?.storage.characterCount.words() || 0
    };
  };

  return (options: { defaultValue: string; editable?: boolean }) => {
    const instance = getCurrentInstance();

    // 编辑器事件
    let createdCallback: callback = null;
    let changeCallback: callback = null;
    let blurCallback: callback = null;
    let focusCallback: callback = null;
    let uploadCallback: callback = null;

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
    const onUpload = (cb: (file: FileList, e: Event, editor: Editor) => void) => {
      if (uploadCallback) editorEvent.off('upload', uploadCallback);
      editorEvent.on('upload', (uploadCallback = cb));
    };

    /**
     * 挂载
     */
    onMounted(() => {
      if (instance?.refs.editor && !editor.value) {
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
          },
          onBlur() {
            editorEvent.emit('blur', editor.value);
          },
          onFocus() {
            editorEvent.emit('focus', editor.value);
          }
        });
        /**
         * 图片粘贴上传
         */
        // @ts-ignore
        editor.value.on('upload', (files: FileList, event: Event) => {
          console.log('[editor] upload', files);
          editorEvent.emit('upload', files, event, editor.value);
        });
      }
    });
    onBeforeUnmount(() => {
      createdCallback && editorEvent.off('created', createdCallback);
      changeCallback && editorEvent.off('change', changeCallback);
      blurCallback && editorEvent.off('blur', blurCallback);
      focusCallback && editorEvent.off('focus', focusCallback);
      uploadCallback && editorEvent.off('upload', uploadCallback);
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
      getContent,
      insertContent,
      setEditable,
      setContent,
      getCounter,
      getData,
      onUpload
    };
  };
};
