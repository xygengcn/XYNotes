import { showNoteShareDrawer } from '@/components/note-share';
import router from '@/router';
import { Icon } from '@xynotes/components';
import { activeNote } from '@xynotes/store/note';
import { defineComponent } from 'vue';
import './index.scss';

export default defineComponent({
  name: 'NoteDetailSettingDrawer',
  setup() {
    /**
     * 分享
     */
    const handleClickShare = () => {
      activeNote.value && showNoteShareDrawer(activeNote.value);
    };

    /**
     * 同步数据
     */
    const handleClickSync = () => {
      activeNote.value?.sync();
    };

    /**
     * 下载markdown
     */
    const handleClickDownload = () => {
      activeNote.value?.toMarkdown();
    };

    /**
     * 删除
     */
    const handleClickDelete = () => {
      activeNote.value &&
        window.$ui.confirm({
          type: 'warn',
          width: 300,
          content: '确定删除这个笔记吗？',
          onSubmit: () => {
            activeNote.value.archive();
            router.back();
          }
        });
    };
    return () => (
      <div class="mobile-detail-setting-drawer">
        <div class="mobile-detail-setting-drawer-item">
          <span class="mobile-detail-setting-drawer-item-icon">
            <Icon type="trash" size={24} onClick={handleClickDelete}></Icon>
          </span>
          <span class="mobile-detail-setting-drawer-item-text">删除</span>
        </div>
        <div class="mobile-detail-setting-drawer-item">
          <span class="mobile-detail-setting-drawer-item-icon">
            <Icon type="share" size={24} onClick={handleClickShare}></Icon>
          </span>
          <span class="mobile-detail-setting-drawer-item-text">分享</span>
        </div>
        <div class="mobile-detail-setting-drawer-item">
          <span class="mobile-detail-setting-drawer-item-icon">
            <Icon type="sync" size={24} onClick={handleClickSync}></Icon>
          </span>
          <span class="mobile-detail-setting-drawer-item-text">同步</span>
        </div>
        <div class="mobile-detail-setting-drawer-item">
          <span class="mobile-detail-setting-drawer-item-icon">
            <Icon type="markdown" size={24} onClick={handleClickDownload}></Icon>
          </span>
          <span class="mobile-detail-setting-drawer-item-text">下载</span>
        </div>
      </div>
    );
  }
});
