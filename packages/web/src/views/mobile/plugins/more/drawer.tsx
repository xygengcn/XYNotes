import { Icon } from '@xynotes/components';
import { initAppData, syncApp } from '@xynotes/store/app';
import { defineComponent } from 'vue';
import './index.scss';

export default defineComponent({
  name: 'NoteHomeMore',
  emits: ['close', 'setting'],
  setup(_, { emit }) {
    const handleClose = () => {
      emit('close');
    };

    /**
     * 数据同步
     */
    const handleSyncList = () => {
      syncApp();
      handleClose();
    };

    /**
     * 重置
     */
    const handleReload = () => {
      window.location.reload();
    };

    const handleInitData = () => {
      console.log('[init] 初始化数据');
      window.$ui.confirm({
        type: 'warn',
        width: 300,
        title: '重置数据',
        content: '即将进行删除本地数据操作，包含本地所有笔记和配置，确定重置数据吗？',
        onSubmit: () => {
          initAppData();
          window.$ui.toast('重置成功，即将要刷新应用！');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
    };

    /**
     * 远程配置
     */
    const handleSetSetting = () => {
      emit('close');
      emit('setting');
    };
    return () => (
      <div class="mobile-home-more-drawer">
        <div class="mobile-home-more-drawer-header">操作</div>
        <div class="mobile-home-more-drawer-content">
          <div class="mobile-home-more-drawer-content-item">
            <span class="mobile-home-more-drawer-content-item-left">数据同步</span>
            <span class="mobile-home-more-drawer-content-item-right">
              <Icon onClick={handleSyncList} type="online" size="1.2em"></Icon>
            </span>
          </div>
          <div class="mobile-home-more-drawer-content-item">
            <span class="mobile-home-more-drawer-content-item-left">基础配置</span>
            <span class="mobile-home-more-drawer-content-item-right">
              <Icon onClick={handleSetSetting} type="setting" size="1.2em"></Icon>
            </span>
          </div>
          <div class="mobile-home-more-drawer-content-item">
            <span class="mobile-home-more-drawer-content-item-left">重置数据</span>
            <span class="mobile-home-more-drawer-content-item-right">
              <Icon onClick={handleInitData} type="sync" size="1.2em" class="error"></Icon>
            </span>
          </div>
          <div class="mobile-home-more-drawer-content-item">
            <span class="mobile-home-more-drawer-content-item-left">重启应用</span>
            <span class="mobile-home-more-drawer-content-item-right">
              <Icon onClick={handleReload} type="restart" size="1.2em" class="error"></Icon>
            </span>
          </div>
        </div>
        <div class="mobile-home-more-drawer-footer">
          <a href="https://github.com/xygengcn/XYNotes" target="_blank">
            Version {__APP_VERSION__} 此项目开源于XY笔记
          </a>
        </div>
      </div>
    );
  }
});
