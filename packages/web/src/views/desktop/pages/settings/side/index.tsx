import { Button } from '@xynotes/components';
import { appStoreAction } from '@xynotes/store/app';
import { downloadFile, jsonFileReader } from '@xynotes/utils';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import './index.scss';

const DesktopSideContainerSetting = defineComponent({
  name: 'DesktopSideContainerSetting',
  setup() {
    // 路由
    const router = useRouter();

    // 数据备份
    const handleBackup = () => {
      console.info('[backup]', '数据备份');
      return appStoreAction.backupAppData().then((backupData) => {
        downloadFile(JSON.stringify(backupData), 'database.json');
      });
    };

    // 数据恢复
    const handleRecovery = () => {
      console.log('[recovery] 数据恢复');
      return jsonFileReader()
        .then((backupData: any) => {
          appStoreAction.recoveryAppData(backupData.database).then(() => {
            window.$ui.toast('数据恢复成功');
          });
        })
        .catch((e) => {
          window.$ui.toast('数据恢复失败');
          console.error('[recovery]', e);
        });
    };

    // 编辑配置
    const handleEditConfig = () => {
      router.push('/setting/config');
    };

    const handleInitData = () => {
      console.log('[init] 初始化数据');
      window.$ui.confirm({
        type: 'warn',
        width: 300,
        title: '重置数据',
        content: '即将进行删除本地数据操作，包含本地所有笔记和配置，确定重置数据吗？',
        onSubmit: () => {
          appStoreAction.initAppData();
          window.$ui.toast('重置成功，即将要刷新应用！');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
    };

    return () => (
      <div class="desktop-side-container-setting">
        <div class="desktop-side-container-setting-header" data-tauri-drag-region>
          <h3 data-tauri-drag-region>设置</h3>
        </div>
        <div class="desktop-side-container-setting-content">
          <div class="desktop-side-container-setting-content-item">
            <span class="desktop-side-container-setting-content-item-left">数据备份</span>
            <span class="desktop-side-container-setting-content-item-right">
              <Button size="min" onClick={handleBackup}>
                备份
              </Button>
            </span>
          </div>
          <div class="desktop-side-container-setting-content-item">
            <span class="desktop-side-container-setting-content-item-left">数据恢复</span>
            <span class="desktop-side-container-setting-content-item-right">
              <Button size="min" onClick={handleRecovery}>
                恢复
              </Button>
            </span>
          </div>
          <div class="desktop-side-container-setting-content-item">
            <span class="desktop-side-container-setting-content-item-left">基础配置</span>
            <span class="desktop-side-container-setting-content-item-right">
              <Button size="min" onClick={handleEditConfig}>
                配置
              </Button>
            </span>
          </div>
          <div class="desktop-side-container-setting-content-item">
            <span class="desktop-side-container-setting-content-item-left">重置数据</span>
            <span class="desktop-side-container-setting-content-item-right">
              <Button size="min" onClick={handleInitData} type="error">
                重置
              </Button>
            </span>
          </div>
        </div>
        <div class="desktop-side-container-setting-footer">
          <a href="https://github.com/xygengcn/XYNotes" target="_blank">
            Version {__APP_VERSION__} 此项目开源于XY笔记
          </a>
        </div>
      </div>
    );
  }
});

export default DesktopSideContainerSetting;
