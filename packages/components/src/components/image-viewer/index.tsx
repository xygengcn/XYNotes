import { isBlobUrl } from '@xynotes/utils';
import 'photoswipe/style.css';
import { defineComponent, defineCustomElement, ref } from 'vue';
import './index.scss';
export const Viewer = defineComponent({
  name: 'Viewer',
  props: {
    src: String,
    alt: String,
    width: Number,
    heigth: Number,
    iseditable: String
  },
  setup(props) {
    const loaded = ref(false);
    const onClick = (e) => {
      const img = e.target as HTMLImageElement;
      imageViewer([{ src: img.src, width: img.naturalWidth, height: img.naturalHeight }]);
    };

    const onLoad = () => {
      loaded.value = true;
    };
    const onError = () => {
      loaded.value = false;
    };
    return () => (
      <div
        class={{
          'img-viewer': true,
          'img-viewer-blob': props.iseditable === 'true' && loaded.value && isBlobUrl(props.src)
        }}
        contenteditable="false"
      >
        <img
          src={props.src}
          alt={props.alt}
          width={props.width || 'auto'}
          heigth={props.heigth || 'auto'}
          onClick={onClick}
          onLoad={onLoad}
          onError={onError}
        />
      </div>
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
