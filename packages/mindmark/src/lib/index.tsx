import {
  defineComponent,
  defineCustomElement,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  render,
  shallowRef
} from 'vue';
import { transformer } from './transformer';
import { Markmap } from 'markmap-view';
import './index.scss';

const useMindMark = (markdown: string, svg: SVGElement | null = null) => {
  const svgRef = ref();
  let markmap = shallowRef<Markmap>();
  // 更新
  const updated = (text: string) => {
    const { root } = transformer.transform(text);
    markmap.value?.setData(root);
    nextTick(() => {
      markmap.value?.fit();
    });
  };

  const vueInstance = getCurrentInstance();
  if (vueInstance) {
    // 创建
    onMounted(() => {
      markmap.value = Markmap.create(svgRef.value);
      updated(markdown);
    });
  } else if (svg) {
    markmap.value = Markmap.create(svg);
    updated(markdown);
  }

  return {
    markmap,
    svgRef,
    updated
  };
};

const MindMark = defineComponent({
  name: 'MindMark',
  props: {
    markdown: {
      type: String,
      default: '',
      required: true
    }
  },
  setup(props) {
    const { svgRef, updated, markmap } = useMindMark(props.markdown);

    // 更新
    onUpdated(() => {
      updated(props.markdown);
    });
    return () => (
      <div class="mind-mark">
        <svg ref={svgRef}></svg>
      </div>
    );
  }
});

const MindMarkElement = defineCustomElement({
  name: 'MindMarkElement',
  shadowRoot: true,
  props: {
    markdown: {
      type: String,
      default: '',
      required: true
    }
  },
  styles: [
    `:host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
    .mind-mark {
      display: flex;
      width: 100%;
      height: 100%;
      position: relative;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      --markmap-text-color: #fff !important;
    }`
  ],
  setup(props) {
    const { svgRef, updated, markmap } = useMindMark(props.markdown);
    const root = ref();
    // 更新
    onUpdated(() => {
      updated(props.markdown);
    });

    onMounted(() => {
      const parentNode = root.value?.parentNode;
      parentNode.fit = () => {
        markmap.value?.fit();
      };
      const resizeObserver = new ResizeObserver(() => {
        markmap.value?.fit();
      });
      resizeObserver.observe(root.value);
      onBeforeUnmount(() => {
        resizeObserver.unobserve(root.value);
        markmap.value?.destroy();
      });
    });
    return {
      svgRef,
      root
    };
  },
  render() {
    return (
      <div class="mind-mark" width="100%" height="100%" style="display:flex" ref="root">
        <svg ref="svgRef"></svg>
      </div>
    );
  }
});

export { MindMark, useMindMark, MindMarkElement };
