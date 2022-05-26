import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, VModel } from 'vue-property-decorator';
import './index.scss';
interface IDesktopSideContainerListProps {}

@Component
export default class DesktopSideContainerListSearch extends VueComponent<IDesktopSideContainerListProps> {
  @VModel() private readonly keyword!: string;
  public render(): VNode {
    return (
      <div class="desktop-side-container-list-search">
        <input type="text" placeholder="搜索笔记" vModel={this.keyword} />
      </div>
    );
  }
}
