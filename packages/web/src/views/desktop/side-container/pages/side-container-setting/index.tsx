import Button from '@/components/common/button';
import { backupAppData, recoveryAppData } from '@xynotes/store/app';
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
      return backupAppData().then((backupData) => {
        downloadFile(JSON.stringify(backupData), 'database.json');
      });
    };

    // 数据恢复
    const handleRecovery = () => {
      console.log('[recovery] 数据恢复');
      return jsonFileReader()
        .then((backupData: any) => {
          recoveryAppData(backupData.database).then(() => {
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
