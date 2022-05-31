import Button from '@/components/common/button';
import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
import { syncDataByV2 } from '@/services/note.action';
interface IDesktopSideContainerListProps {}

@Component({ name: 'DesktopSideContainerList' })
export default class DesktopSideContainerList extends VueComponent<IDesktopSideContainerListProps> {
  // 同步旧版本数据
  private handleV2Data() {
    syncDataByV2();
  }
  public render(): VNode {
    return (
      <div class="desktop-side-container-setting">
        <div class="desktop-side-container-setting-header">
          <h3>设置</h3>
        </div>

        <div class="desktop-side-container-setting-content">
          <div class="desktop-side-container-setting-content-item">
            <span class="desktop-side-container-setting-content-item-left">数据迁移</span>
            <span class="desktop-side-container-setting-content-item-right">
              <Button size="min" onclick={this.handleV2Data}>
                迁移
              </Button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
