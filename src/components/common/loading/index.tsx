import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Icon from '../icon';
import './index.scss';

interface ILoadingProps {
  text?: string;
}

@Component
export default class Loading extends VueComponent<ILoadingProps> {
  @Prop() private readonly text!: string;
  public render(): VNode {
    return (
      <div class="loading">
        <span class="loading-icon">
          <Icon type="loading" />
        </span>
        {this.text && <span class="loading-text">{this.text}</span>}
      </div>
    );
  }
}
