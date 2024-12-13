import { defineCustomElement, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';
import { isMindMapLanguage } from './mindmap';
import { debounce } from '@xynotes/utils';

/**
 * 修改高度
 * @returns
 */
export const useResizeObserverRootHeight = () => {
  const root = ref<HTMLElement>();
  onMounted(() => {
    const parentNode = (root.value?.parentNode as ShadowRoot).host.parentElement;
    const onResize = debounce(() => {
      if (root.value && parentNode) {
        root.value.style.height = parentNode.clientHeight + 'px';
      }
    }, 100);
    const resizeObserver = new ResizeObserver(onResize);
    parentNode && resizeObserver.observe(parentNode);
    onBeforeUnmount(() => {
      parentNode && resizeObserver.unobserve(parentNode);
    });
  });
  return {
    root
  };
};

/**
 * 是不是可以预览的语言
 * @param lang
 */
export const isPreviewLanguage = (lang: string) => {
  return lang && isMindMapLanguage(lang);
};

/**
 * 预览
 */
export const CodeBlockPreview = defineCustomElement({
  name: 'CodeBlockPreview',
  shadowRoot: true,
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
      display: inline-block;
      width: 100%;
      height: 100%;
      min-height: 100%;
      box-sizing: border-box
    }
    .code-preview {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box
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
