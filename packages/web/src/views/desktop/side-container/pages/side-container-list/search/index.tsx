import { VueComponent } from '@/shims-vue';
import { debounce } from '@/utils/debounce-throttle';
import { VNode } from 'vue';
import { Component, VModel } from 'vue-property-decorator';
import './index.scss';
interface IDesktopSideContainerListProps {}

@Component
export default class DesktopSideContainerListSearch extends VueComponent<IDesktopSideContainerListProps> {
  @VModel() private readonly keyword!: string;

  /**
   * 搜索
   * @param e
   * @returns
   */
  private handleInput() {
    return debounce((e: PointerEvent) => {
      const target = e.target as HTMLInputElement;
      this.$emit('input', target.value);
    });
  }

  public render(): VNode {
    return (
      <div class="desktop-side-container-list-search">
        <input type="text" placeholder="搜索笔记" value={this.keyword} onInput={this.handleInput()} />
      </div>
    );
  }
}
