import { defineCustomElement } from 'vue';
import { isMindMapLanguage } from './mindmap';
/**
 * 是不是可以预览的语言
 * @param lang
 */
const isPreviewLanguage = (lang: string) => {
  return isMindMapLanguage(lang);
};

/**
 * 预览
 */
export const CodeBlockPreview = defineCustomElement({
  name: 'CodeBlockPreview',
  shadowRoot: false,
  props: {
    code: {
      type: String,
      default: '',
      required: true
    },
    language: {
      type: String,
      default: 'plaintext',
      required: true
    }
  },
  styles: [
    `
    :host {
      display: block;
      flex;
    }
    .code-preview {
      width:100%;
      height:100%;
    }
    `
  ],
  setup(props) {
    return () => (
      <div class="code-preview" v-show={isPreviewLanguage(props.language)} data-language={props.language}>
        {isMindMapLanguage(props.language) && <mind-mark markdown={props.code}></mind-mark>}
      </div>
    );
  }
});

// 检查自定义元素是否已经注册
if (!customElements.get('code-preview')) {
  // 定义自定义元素
  customElements.define('code-preview', CodeBlockPreview);
}
