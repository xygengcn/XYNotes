import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './app.scss';
import { contextmenuHide } from './components/common/contextmenu';
import { VueComponent } from './shims-vue';

interface AppProps {}
@Component({
  name: 'App',
})
export default class App extends VueComponent<AppProps> {
  /**
   * 禁止右键
   * @param e
   */
  private handleContextMenu(e: Event) {
    contextmenuHide();
    e.preventDefault();
  }
  public render(): VNode {
    return (
      <div id="app" oncontextmenu={this.handleContextMenu}>
        <router-view />
      </div>
    );
  }
}
