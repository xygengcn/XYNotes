import { Editor, EditorContent } from '@tiptap/vue-3';
import { VNodeRef, defineComponent, onBeforeUnmount, ref } from 'vue';
import { extensions } from './extensions';
import './index.scss';

const MarkdownEditor = defineComponent({
  name: 'MarkdownEditor',
  components: {
    EditorContent
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    // 是否开启计数
    counter: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    'update:modelValue': (value: string) => value,
    created: (editor: Editor) => editor,
    change: (editor: Editor) => editor,
    counter: (content: { characters: number; words: number }) => content,
    blur: (editor: Editor) => editor,
    focus: (editor: Editor) => editor
  },
  setup(props, { emit }) {
    // 节点
    const refEditor = ref<VNodeRef>();

    // 编辑器初始化
    const editorInstance = new Editor({
      content: props.modelValue,
      extensions: extensions,
      editable: props.editable ?? true,
      onCreate() {
        emit('created', editorInstance);
      },
      onUpdate({ editor }) {
        const content = editor.storage.markdown.getMarkdown();
        // 赋值
        emit('update:modelValue', content);
        // 改变
        emit('change', editorInstance);
        // 计数
        props.counter &&
          emit('counter', {
            characters: editor.storage.characterCount.characters(),
            words: editor.storage.characterCount.words()
          });
      },
      onBlur() {
        emit('blur', editorInstance);
      },
      onFocus() {
        emit('focus', editorInstance);
      }
    });

    /**
     * 获取 Markdown 内容
     *
     * @returns 返回 Markdown 文本内容
     */
    const getContent = () => {
      return editorInstance.storage.markdown.getMarkdown();
    };

    /**
     * 插入内容到编辑器中
     *
     * @param value 要插入的内容
     * @returns 插入内容后的操作结果
     */
    const insertContent = (value: string) => {
      return editorInstance.commands.insertContent(value);
    };

    /**
     * 设置是否能编辑
     * @param value
     * @returns
     */
    const setEditable = (value: boolean) => {
      return editorInstance.setEditable(value);
    };

    /**
     * 设置值
     * @param content
     * @returns
     */
    const setContent = (content: string) => {
      return editorInstance.commands.setContent(content);
    };

    /**
     * 销毁
     */
    onBeforeUnmount(() => {
      editorInstance.destroy();
    });

    return { editor: editorInstance, refEditor, getContent, insertContent, setEditable, setContent };
  },
  render() {
    return (
      <EditorContent
        ref={this.refEditor}
        class="markdown-editor"
        editor={this.editor}
        data-editable={this.editable}
      ></EditorContent>
    );
  }
});
export default MarkdownEditor;
