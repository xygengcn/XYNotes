import { Editor } from '@tiptap/core';
import { useScroller } from '@xynotes/utils';
import Eventemitter from 'eventemitter3';
import { getCurrentInstance, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import './index.scss';

type callback = ((...args: any) => void) | null;

/**
 * 定制编辑器
 * @returns
 */
export const defineMarkdownEditor = () => {
  // 编辑器
  const editor = shallowRef<Editor>();

  // 编辑器事件
  const editorEvent = new Eventemitter();

  // 编辑器加载
  const loading = ref(true);

  // 缓存
  const editorCache = ref();

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
    if (loading.value) {
      editorCache.value = content;
    }
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

  return (options?: { defaultValue: string; editable?: boolean }) => {
    const instance = getCurrentInstance();
    const { state } = useScroller('editor');

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
    onMounted(async () => {
      const el = instance?.refs.editor as HTMLDivElement;
      if (el && !editor.value) {
        el.classList.add('markdown-editor');
        const extensions = (await import('./extensions')).default;
        editor.value = new Editor({
          element: el,
          content: editorCache.value || options?.defaultValue || '',
          extensions: extensions,
          editable: options?.editable ?? true,
          onCreate() {
            editorEvent.emit('created', editor.value);
            // 加载结束
            loading.value = false;
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
        // 重新创建会失败
        editor.value = undefined;
      }
    });
    return {
      editor,
      loading,
      state,
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

/**
 * 定制编辑器预览
 * @returns
 */
export const defineMarkdownEditorPreview = () => {
  // 编辑器
  const editor = shallowRef<Editor>();

  // 编辑器加载
  const loading = ref(true);

  // 缓存
  const editorCache = ref();

  /**
   * 设置值
   * @param content
   * @returns
   */
  const setContent = (content: string) => {
    if (loading.value) {
      editorCache.value = content;
    }
    return editor.value?.commands.setContent(content);
  };

  return (options?: { defaultValue: string }) => {
    const instance = getCurrentInstance();

    /**
     * 获取预览节点
     * @returns
     */
    const previewElement = () => {
      return editor.value?.view.dom as HTMLDivElement;
    };

    /**
     * 挂载
     */
    onMounted(async () => {
      const el = instance?.refs.editor as HTMLDivElement;
      if (el && !editor.value) {
        el.classList.add('markdown-editor');
        const extensions = (await import('./extensions')).default;
        editor.value = new Editor({
          element: el,
          content: editorCache.value || options?.defaultValue || '',
          extensions: extensions,
          editable: false,
          onCreate() {
            // 加载结束
            loading.value = false;
          }
        });
      }
    });
    onBeforeUnmount(() => {
      if (instance?.refs.editor) {
        editor.value?.destroy();
        // 重新创建会失败
        editor.value = undefined;
      }
    });
    return {
      editor,
      loading,
      setContent,
      previewElement
    };
  };
};
