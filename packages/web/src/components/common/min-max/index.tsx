import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
import { VueComponent } from '@/shims-vue';
import Icon from '../icon';
import { appWindow } from '@tauri-apps/api/window';
import { app } from '@tauri-apps/api';
interface IMinMaxProps {}

@Component({
  name: 'MinMax',
})
export default class MinMax extends VueComponent<IMinMaxProps> {
  /**
   * 是否全屏
   */
  private isFullScrean: boolean = false;
  /**
   * 全屏
   */
  private async handleMaxWindow() {
    if (window.__TAURI__) {
      if (await appWindow.isMaximized()) {
        appWindow.setFullscreen(false);
      } else {
        appWindow.setFullscreen(true);
      }
    }
  }

  /**
   * 关闭
   */
  private handleCloseWindow() {
    if (window.__TAURI__) {
      app.hide();
    }
  }

  /**
   * 最小化
   */
  private handleMinWindow() {
    if (window.__TAURI__) {
      appWindow.minimize();
    }
  }

  public render(): VNode {
    return (
      <div class={{ 'min-max': true, visiable: !this.isFullScrean }} vShow={window.__TAURI__}>
        <Icon type="close-window" size={14} onclick={this.handleCloseWindow}></Icon>
        <Icon type="minus-window" size={14} onclick={this.handleMinWindow}></Icon>
        <Icon type="max-window" size={14} onclick={this.handleMaxWindow}></Icon>
      </div>
    );
  }

  async created() {
    if (window.__TAURI__) {
      this.isFullScrean = await appWindow.isFullscreen();
      appWindow.onResized(async () => {
        this.isFullScrean = await appWindow.isFullscreen();
      });
    }
  }
}
