import { Note } from '@/services/note';
import { screenshot, screenshotCopy } from '@/utils/image';
import { PropType, createApp, defineComponent, ref } from 'vue';
import Dialog from '../common/dialog';
import Editor from '../common/editor';
import Icon from '../common/icon';
import Loading from '../common/loading';
import './index.scss';

interface IScreenshotProps {
  width?: string;
  height?: string;
  menu?: string[];
}
const Screenshot = defineComponent({
  name: 'Screenshot',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    },
    width: {
      type: String,
      default: '65%'
    },
    height: {
      type: String,
      default: '80%'
    },
    menu: {
      type: Array as PropType<string[]>,
      default: () => ['md', 'image', 'copyText', 'copyImage', 'copyJson']
    }
  },
  setup(props) {
    /**
     * 加载
     */
    const loading = ref(false);

    /**
     * 弹窗
     */
    const refDialog = ref<typeof Dialog>();
    /**
     * 编辑器
     */
    const refScreenshotPreview = ref<typeof Editor>();

    /**
     * 下载
     */
    const handleClickDownalodScreenshot = () => {
      loading.value = true;
      // 生成截图
      return screenshot(refScreenshotPreview.value.refEditorContent, props.note.title).then(() => {
        loading.value = false;
      });
    };

    /**
     * 复制图片
     * @returns
     */
    const handleClickCopyImage = () => {
      loading.value = true;
      // 生成截图
      return screenshotCopy(refScreenshotPreview.value.refEditorContent).then(() => {
        loading.value = false;
        window.$ui.toast('复制图片成功');
      });
    };

    /**
     * 关闭事件
     */
    const handleClose = () => {
      loading.value = false;
    };
    return () => (
      <Dialog
        customStyle={{
          width: props.width,
          height: props.height
        }}
        ref={refDialog}
        class="note-share-dialog"
        title={props.note.title}
        onClose={handleClose}
      >
        <div class="note-share-content">
          <div class="note-share-content-preview">
            <Editor ref={refScreenshotPreview} value={props.note.text || ''} type="preview" />
          </div>
          <div class="note-share-content-bottom">
            {props.menu.includes('copyImage') && (
              <span class="note-share-content-bottom-item">
                <Icon type="item-copy" onClick={handleClickCopyImage}></Icon>
              </span>
            )}
            {props.menu.includes('image') && (
              <span class="note-share-content-bottom-item">
                <Icon type="item-pic-download" onClick={handleClickDownalodScreenshot}></Icon>
              </span>
            )}
          </div>
          {loading.value && (
            <div class="note-share-content-loading">
              <Loading text="加载中" />
            </div>
          )}
        </div>
      </Dialog>
    );
  }
});

export default function showShareNoteDialog(note: Note, options: IScreenshotProps = {}) {
  console.log('[showShareNoteDialog]', note, options);
  const instance = document.querySelector('#screenshot');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'screenshot';
  document.body.appendChild(el);
  const app = createApp(Screenshot, {
    note,
    ...options,
    onClose() {
      app.unmount();
      el && document.body.removeChild(el);
    }
  });
  app.mount(el);
}
