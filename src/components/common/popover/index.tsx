import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
import { VueComponent } from '@/shims-vue';

interface IPopoverProps {}
@Component({
  name: 'Popover',
})
export default class Popover extends VueComponent<IPopoverProps> {
  private isShowPopover = false;

  public render(): VNode {
    return (
      <div class="popover">
        {this.isShowPopover && <div class="popover-shadow" onclick={() => (this.isShowPopover = false)}></div>}
        <div class="popover-slot" onclick={() => (this.isShowPopover = true)}>
          {this.$slots.default}
        </div>
        {this.isShowPopover && (
          <div class="popover-content" onclick={() => (this.isShowPopover = false)}>
            {this.$slots.popover}
          </div>
        )}
      </div>
    );
  }
}
