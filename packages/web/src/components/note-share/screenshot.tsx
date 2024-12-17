import { Dialog, Icon, Loading, Popover } from '@xynotes/components';
import { EditorPerview, useEditorPreview } from '@xynotes/editor';
import { Note } from '@xynotes/store';
import { screenshot, screenshotCopy } from '@xynotes/utils';
import { type PropType, defineComponent, ref } from 'vue';
import MinMax from '../min-max';
import './index.scss';

export default defineComponent({
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

    const { previewElement } = useEditorPreview();

    /**
     * 下载
     */
    const handleClickDownalodScreenshot = () => {
      loading.value = true;
      const el = previewElement();
      // 生成截图
      return screenshot(el, props.note.title)
        .catch((e) => {
          console.error('[screenshot]', e);
          window.$ui.toast('生成图片失败');
        })
        .finally(() => {
          loading.value = false;
        });
    };

    /**
     * 复制图片
     * @returns
     */
    const handleClickCopyImage = () => {
      loading.value = true;
      const el = previewElement();
      // 生成截图
      return screenshotCopy(el)
        .then(() => {
          window.$ui.toast('复制图片成功');
        })
        .catch((e) => {
          console.error('[screenshotCopy]', e);
          window.$ui.toast('复制图片失败');
        })
        .finally(() => {
          loading.value = false;
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
          title: ({ onClose, onFullScreen }) => {
            return (
              <div class="note-share-title">
                <MinMax type="dialog" disabled={['min']} onClose={onClose} onFullscreen={onFullScreen}></MinMax>
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
            <EditorPerview value={props.note.text || ''} />
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
