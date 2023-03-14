import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import './index.scss';

interface AppViewProps {
  name?: string;
}

@Component
export default class AppView extends VueComponent<AppViewProps> {
  @Prop({ default: String }) private name: string;
  private transitionName = '';

  @Watch('$route')
  watchRouter(to: Route, from: Route) {
    if (to.meta.index > from.meta.index) {
      //设置动画名称
      this.transitionName = 'slide-left';
    } else {
      this.transitionName = 'slide-right';
    }
  }
  public render(): VNode {
    return (
      <transition name={this.transitionName}>
        <router-view name={this.name}></router-view>
      </transition>
    );
  }
}
