import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
interface IMobileProps {}

@Component
export default class Mobile extends VueComponent<IMobileProps> {
  public render(): VNode {
    return (
      <div class="mobile">
        <router-view></router-view>
      </div>
    );
  }
}
