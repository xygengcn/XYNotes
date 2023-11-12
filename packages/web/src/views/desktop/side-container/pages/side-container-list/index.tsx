import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import DesktopSideContainerListContent from './content';
import DesktopSideContainerListHeader from './header';
import './index.scss';
import DesktopSideContainerListSearch from './search';
interface IDesktopSideContainerListProps {}

@Component
export default class DesktopSideContainerList extends VueComponent<IDesktopSideContainerListProps> {
  // 搜索关键词
  private keyword = '';
  public render(): VNode {
    return (
      <div class="desktop-side-container-list">
        <DesktopSideContainerListHeader />
        <DesktopSideContainerListSearch vModel={this.keyword} />
        <DesktopSideContainerListContent keyword={this.keyword} />
      </div>
    );
  }
}
