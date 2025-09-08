import { Content, Editor } from '@tiptap/core';
import { useScroller } from '@xynotes/utils';
import Eventemitter from 'eventemitter3';
import { getCurrentInstance, onBeforeUnmount, onMounted, ref, ShallowRef, shallowRef } from 'vue';
import './index.scss';

type callback = ((...args: any) => void) | null;

/**
 * defineMarkdownEditor返回函数的返回类型
 */
export interface MarkdownEditorInstance {
  editor: ShallowRef<Editor | undefined>;
  loading: ReturnType<typeof ref<boolean>>;
  state: { top: number; bottom: number };
  onCreated: (cb: (editor: Editor) => void) => void;
  onChange: (cb: (editor: Editor) => void) => void;
  onBlur: (cb: (editor: Editor) => void) => void;
  onFocus: (cb: (editor: Editor) => void) => void;
  onUpload: (cb: (file: FileList, e: Event, editor: Editor) => void) => void;
  getMarkdown: () => string | undefined;
  insertContent: (value: string) => ReturnType<Editor['commands']['insertContent']> | undefined;
  setEditable: (value: boolean) => ReturnType<Editor['setEditable']> | undefined;
  setContent: (content: Content) => boolean | undefined;
  getCounter: () => { characters: number; words: number };
  getData: () => ReturnType<Editor['getJSON']> | undefined;
  getContent: () => ReturnType<Editor['getJSON']> | undefined;
  setImage: (options: {
    src: string;
    alt?: string;
    title?: string;
  }) => ReturnType<Editor['commands']['insertImage']> | undefined;
  focus: () => void;
}

/**
 * 定制编辑器
 * @returns
 */
export function defineMarkdownEditor() {
  // 编辑器
  const editor = shallowRef<Editor>();

  // 编辑器事件
  const editorEvent = new Eventemitter();

  // 编辑器加载
  const loading = ref(true);

  // 缓存
  const editorCache = ref<Content>('');

  /**
   * 获取 Markdown 内容
   *
   * @returns 返回 Markdown 文本内容
   */
  const getMarkdown = () => {
    // @ts-ignore
    return editor.value?.storage.markdown.getMarkdown();
  };

  /**
   * 获取 Markdown 内容
   *
   * @returns 返回 Markdown 文本内容
   */
  const getContent = () => {
    return editor.value?.getJSON();
  };

  /**
   * 获取结构数据
   *
   * @returns 返回结构数据
   */
  const getData = () => {
    return editor.value?.getJSON();
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
   * 设置图片
   * @param options
   */
  const setImage = (options: { src: string; alt?: string; title?: string }) => {
    return editor.value?.commands.insertImage(options);
  };

  /**
   * 聚焦

   * @returns 
   */
  const focus = () => editor.value?.chain().focus().run();

  /**
   * 设置值
   * @param content
   * @returns
   */
  const setContent = (content: Content): boolean | undefined => {
    if (loading.value || !editor.value) {
      editorCache.value = content;
    }
    return editor.value?.chain().setContent(content).run();
  };

  /**
   * 获取字数
   * @returns
   */
  const getCounter = () => {
    return {
      // @ts-ignore
      characters: editor.value?.storage.characterCount.characters() || 0,
      // @ts-ignore
      words: editor.value?.storage.characterCount.words() || 0
    };
  };

  return (options?: { defaultValue: string; editable?: boolean }): MarkdownEditorInstance => {
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
      console.log('[editor] create', el);
      if (el && !editor.value) {
        el.classList.add('markdown-editor');
        const { CommonExtension, EditorExtension } = await import('./extensions');
        editor.value = new Editor({
          element: el,
          content: editorCache.value || options?.defaultValue || '',
          extensions: [...CommonExtension(), ...EditorExtension()],
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
      console.log('[editor] before unmount', instance?.refs.editor);
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
      getMarkdown,
      insertContent,
      setEditable,
      setContent,
      getCounter,
      getData,
      onUpload,
      getContent,
      setImage,
      focus
    };
  };
}

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
  const setContent = (content: Content) => {
    console.log('[editor] setContent', content, loading.value);
    if (loading.value) {
      editorCache.value = content;
    }
    return editor.value?.commands.setContent(content);
  };

  return (options?: { defaultValue: Content }) => {
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
        const { CommonExtension } = await import('./extensions');
        editor.value = new Editor({
          element: el,
          content: editorCache.value || options?.defaultValue || '',
          extensions: CommonExtension(),
          editable: false,
          onCreate() {
            // 加载结束
            loading.value = false;
            console.log('[editor] created');
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
