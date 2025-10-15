import { Icon, Loading } from '@xynotes/components';
import { EditorPerview, useEditorPreview } from '@xynotes/editor';
import type { Note } from '@xynotes/store';
import { screenshot, screenshotCopy } from '@xynotes/utils';
import { defineComponent, ref, type PropType } from 'vue';
import './index.scss';
export default defineComponent({
  name: 'NoteShareDrawer',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(props) {
    /**
     * 加载
     */
    const loading = ref(false);

    /**
     * 预览
     */
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

    return () => (
      <div class="note-share-drawer">
        <div class="note-share-drawer-header">
          <Icon type="copy" size={20} onClick={handleClickCopyImage}></Icon>
          <Icon type="image-preview" size={20} onClick={handleClickDownalodScreenshot}></Icon>
        </div>
        <div class="note-share-drawer-content">
          <div class="note-share-drawer-content-preview">
            <EditorPerview value={props.note.content || props.note.text || ''} />
          </div>
          {loading.value && (
            <div class="note-share-drawer-content-loading">
              <Loading text="加载中" />
            </div>
          )}
        </div>
      </div>
    );
  }
});
