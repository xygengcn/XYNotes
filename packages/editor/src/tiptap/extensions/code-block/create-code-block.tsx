import { Icon } from '@xynotes/components';
import { copyText } from '@xynotes/utils';
import { createApp, defineComponent, ref, PropType, Ref, inject, reactive } from 'vue';

const CodeBlockContainer = defineComponent({
  props: {
    lang: {
      type: String,
      default: 'plaintext'
    },
    isEditable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const code = inject<Ref<string>>('code');
    const handleInputChange = (e) => {
      emit('change', e);
    };
    /**
     * 复制
     */
    const handleCopy = () => {
      code?.value && copyText(code.value);
    };
    return {
      handleInputChange,
      handleCopy
    };
  },
  render() {
    return (
      <>
        <div class="markdown-editor-codeblock-header">
          <div class="markdown-editor-codeblock-header-icon">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div class="markdown-editor-codeblock-header-lang">
            <div class="markdown-editor-codeblock-header-lang-content">
              <input
                class="markdown-editor-codeblock-header-lang-content-input"
                type="text"
                spellcheck={false}
                value={this.lang}
                onChange={this.handleInputChange}
                disabled={!this.isEditable}
              />
            </div>
          </div>
          <div class="markdown-editor-codeblock-header-opts">
            <span>
              <Icon type="item-copy" onClick={this.handleCopy}></Icon>
            </span>
          </div>
        </div>
      </>
    );
  }
});

export function createCodeBlock(
  defaultLanguage: string,
  defaultCode: string,
  isEditable: boolean,
  onChange: (e) => void
) {
  // 创建根元素
  const codeBlock = document.createElement('pre');
  codeBlock.className = 'markdown-editor-codeblock';
  codeBlock.setAttribute('data-language', defaultLanguage);

  // 代码
  const code = ref(defaultCode);

  // 创建vue，挂载
  const container = createApp(CodeBlockContainer, {
    onChange,
    isEditable,
    lang: defaultLanguage
  });

  container.provide('code', code);
  container.mount(codeBlock);

  // 创建代码内容容器
  const codeContent = document.createElement('code');
  codeContent.className = 'markdown-editor-codeblock-content';
  codeContent.textContent = code.value;
  codeContent.setAttribute('spellcheck', 'false');

  // 将头部容器和代码内容容器添加到根元素
  codeBlock.appendChild(codeContent);

  return {
    codeBlock,
    codeContent,
    container,
    code
  };
}
