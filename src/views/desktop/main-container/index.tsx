import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';

interface IDesktopMainContainerProps {}

@Component
export default class DesktopMainContainer extends VueComponent<IDesktopMainContainerProps> {
  public render(): VNode {
    return (
      <div class="desktop-main-container">
        <router-view name="main" />
      </div>
    );
  }
}
