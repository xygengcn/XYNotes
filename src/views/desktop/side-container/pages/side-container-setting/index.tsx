import Button from '@/components/common/button';
import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
import { syncDataByV2 } from '@/services/note.action';
import database from '@/database';
import { downloadFile, jsonFileReader } from '@/utils/file';
interface IDesktopSideContainerListProps {}

@Component({ name: 'DesktopSideContainerList' })
export default class DesktopSideContainerList extends VueComponent<IDesktopSideContainerListProps> {
  // 同步旧版本数据
  private handleV2Data() {
    syncDataByV2();
  }

  // 数据备份
  private handleBackup() {
    database.backup().then((result) => {
      downloadFile(JSON.stringify(result), 'database.json');
    });
  }

  // 数据备份
  private handleRecovery() {
    jsonFileReader().then((result: any) => {
      database.recovery(result);
    });
  }

  public render(): VNode {
    return (
      <div class="desktop-side-container-setting">
        <div class="desktop-side-container-setting-header">
          <h3>设置</h3>
        </div>
        <div class="desktop-side-container-setting-content">
          <div class="desktop-side-container-setting-content-item">
            <span class="desktop-side-container-setting-content-item-left">数据备份</span>
            <span class="desktop-side-container-setting-content-item-right">
              <Button size="min" onclick={this.handleBackup}>
                备份
              </Button>
            </span>
          </div>
          <div class="desktop-side-container-setting-content-item">
            <span class="desktop-side-container-setting-content-item-left">数据恢复</span>
            <span class="desktop-side-container-setting-content-item-right">
              <Button size="min" onclick={this.handleRecovery}>
                恢复
              </Button>
            </span>
          </div>
          <div class="desktop-side-container-setting-content-item">
            <span class="desktop-side-container-setting-content-item-left">数据迁移</span>
            <span class="desktop-side-container-setting-content-item-right">
              <Button size="min" onclick={this.handleV2Data}>
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
}
