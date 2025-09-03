import { Icon } from '@xynotes/components';
import { copyText, stopPropagation } from '@xynotes/utils';
import { Ref, defineComponent, inject } from 'vue';

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
  setup(_, { emit }) {
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
      code,
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
                onkeydown={stopPropagation}
                onkeyup={stopPropagation}
                onMouseup={stopPropagation}
                onMousedown={stopPropagation}
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

export default CodeBlockContainer;
