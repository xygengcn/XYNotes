import VueContextMenu from '@/directive/contextmenu';
import { Note } from '@/services/note';
import { screenshot, screenshotCopy } from '@/utils/image';
import { PropType, createApp, defineComponent, ref } from 'vue';
import Dialog from '../common/dialog';
import Editor from '../common/editor-plus';
import Icon from '../common/icon';
import Loading from '../common/loading';
import Popover from '../common/popover';
import './index.scss';

interface IScreenshotProps {
  width?: string;
  height?: string;
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
      const el = refScreenshotPreview.value.getContentElement();
      // 生成截图
      return screenshot(el, props.note.title).then(() => {
        loading.value = false;
      });
    };

    /**
     * 复制图片
     * @returns
     */
    const handleClickCopyImage = () => {
      loading.value = true;
      const el = refScreenshotPreview.value.getContentElement();
      // 生成截图
      return screenshotCopy(el).then(() => {
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
        onClose={handleClose}
        v-slots={{
          title: () => {
            return (
              <div class="note-share-title">
                <h3>{props.note.title}</h3>
                <div class="note-share-title-right">
                  <Popover position="left">
                    {{
                      default: () => (
                        <span class="note-share-title-right-icon">
                          <Icon type="item-share"></Icon>
                        </span>
                      ),
                      popover: () => (
                        <div class="note-share-title-right-menu">
                          <div class="note-share-title-right-menu-item" onClick={handleClickCopyImage}>
                            复制
                          </div>
                          <div class="note-share-title-right-menu-item" onClick={handleClickDownalodScreenshot}>
                            存储为图像
                          </div>
                        </div>
                      )
                    }}
                  </Popover>
                </div>
              </div>
            );
          }
        }}
      >
        <div class="note-share-content">
          <div class="note-share-content-preview">
            <Editor ref={refScreenshotPreview} value={props.note.text || ''} type="preview" />
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
  app.use(VueContextMenu).mount(el);
}
