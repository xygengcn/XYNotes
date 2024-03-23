import Button from '@/components/common/button';
import database from '@/database';
import middlewareHook from '@/middlewares';
import { syncDataByV2 } from '@/services/note.action';
import { downloadFile, jsonFileReader } from '@/utils/file';
import { defineComponent } from 'vue';
import './index.scss';
import { useAppStore } from '@/store/app.store';

const DesktopSideContainerSetting = defineComponent({
  name: 'DesktopSideContainerSetting',
  setup() {
    // 同步旧版本数据
    const handleV2Data = () => {
      syncDataByV2();
    };

    // 数据备份
    const handleBackup = () => {
      console.error('[backup]', '数据备份');
      database
        .backup()
        .then((database) => {
          const appStore = useAppStore();
          const backupData = {
            version: appStore.version,
            database
          };
          downloadFile(JSON.stringify(backupData), 'database.json');
        })
        .catch((e) => {
          console.error('[backup]', e);
        });
    };

    // 数据恢复
    const handleRecovery = () => {
      console.log('[recovery] 数据恢复');
      return jsonFileReader()
        .then((backupData: any) => {
          database.recovery(backupData.database).then(() => {
            window.$ui.toast('数据恢复恢复成功');
            middlewareHook.registerMiddleware('recovery');
          });
        })
        .catch((e) => {
          window.$ui.toast('数据恢复失败');
          console.error('[recovery]', e);
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
            <span class="desktop-side-container-setting-content-item-left">数据迁移</span>
            <span class="desktop-side-container-setting-content-item-right">
              <Button size="min" onClick={handleV2Data}>
                迁移
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
