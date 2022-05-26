import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
interface IDesktopSideContainerListProps {}

@Component
export default class DesktopSideContainerList extends VueComponent<IDesktopSideContainerListProps> {
  public render(): VNode {
    return <div class="desktop-side-container-setting">设置</div>;
  }
}
