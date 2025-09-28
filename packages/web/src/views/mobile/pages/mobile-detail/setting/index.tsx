import { showNoteShareDrawer } from '@/components/note-share';
import router from '@/router';
import { Drawer, Icon } from '@xynotes/components';
import { activeNote } from '@xynotes/store/note';
import { ref } from 'vue';
import './index.scss';

export function useMobileDetailSetting() {
  /**
   * 是否显示抽屉
   */
  const visibleMoreDrawer = ref(false);

  const show = () => {
    visibleMoreDrawer.value = true;
  };

  const hide = () => {
    visibleMoreDrawer.value = false;
  };

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

  const MobileDetailSettingView = () => {
    return (
      <Drawer
        visible={visibleMoreDrawer.value}
        onClose={() => {
          visibleMoreDrawer.value = false;
        }}
      >
        <div class="mobile-detail-setting-drawer">
          <div class="mobile-detail-setting-drawer-item">
            <span class="mobile-detail-setting-drawer-item-icon">
              <Icon type="item-delete" size={24} onClick={handleClickDelete}></Icon>
            </span>
            <span class="mobile-detail-setting-drawer-item-text">删除</span>
          </div>
          <div class="mobile-detail-setting-drawer-item">
            <span class="mobile-detail-setting-drawer-item-icon">
              <Icon type="item-share" size={24} onClick={handleClickShare}></Icon>
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
              <Icon type="item-markdown" size={24} onClick={handleClickDownload}></Icon>
            </span>
            <span class="mobile-detail-setting-drawer-item-text">下载</span>
          </div>
        </div>
      </Drawer>
    );
  };

  return {
    MobileDetailSettingView,
    showMobileDetailSettingView: show,
    hideMobileDetailSettingView: hide
  };
}
