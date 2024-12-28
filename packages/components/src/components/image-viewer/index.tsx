import 'photoswipe/style.css';
import { defineComponent, defineCustomElement } from 'vue';

export const Viewer = defineComponent({
  name: 'Viewer',
  props: {
    src: String,
    alt: String,
    width: Number,
    heigth: Number
  },
  setup(props) {
    const onLoad = (e) => {
      console.log(e.target.naturalWidth);
    };
    const onClick = (e) => {
      const img = e.target as HTMLImageElement;
      imageViewer([{ src: img.src, width: img.naturalWidth, height: img.naturalHeight }]);
    };
    return () => (
      <img
        class="img-viewer"
        src={props.src}
        alt={props.alt}
        width={props.width || 'auto'}
        heigth={props.heigth || 'auto'}
        onLoad={onLoad}
        onClick={onClick}
      />
    );
  }
});

/**
 * 图片预览
 * @param urls
 */
export async function imageViewer(urls: { src: string; width: number; height: number; alt?: string }[] = []) {
  const PhotoSwipe = (await import('photoswipe')).default as any;
  const p = new PhotoSwipe({
    dataSource: urls,
    showHideAnimationType: 'none'
  });
  p.init();
}

const HTMLViewerElement = defineCustomElement(Viewer, { shadowRoot: false });

// 定义自定义元素
if (!customElements.get('img-viewer')) {
  customElements.define('img-viewer', HTMLViewerElement);
}
