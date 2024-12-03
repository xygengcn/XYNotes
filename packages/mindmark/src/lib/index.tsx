import { defineComponent, getCurrentInstance, onMounted, onUpdated, ref, shallowRef } from 'vue';
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
    markmap.value?.fit();
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
    const { svgRef, updated } = useMindMark(props.markdown);
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

export { MindMark, useMindMark };
