import { VueComponent } from '@/shims-vue';
import { SideContainerMaxWidth, SideContainerMinWidth, useConfigsStore } from '@/store/config.store';
import { appWindow } from '@tauri-apps/api/window';
import { VNode } from 'vue';
import { Component, Ref } from 'vue-property-decorator';
import './index.scss';
import DesktopMainContainer from './main-container';
import DesktopNavMenu from './nav-menu';
import DesktopSideContainer from './side-container';

interface IDesktopProps {}

@Component
export default class Desktop extends VueComponent<IDesktopProps> {
  @Ref() private readonly drapLine!: HTMLDivElement;

  private get sideContainerWidth(): number {
    const store = useConfigsStore();
    return store.sideContainerWidth;
  }

  public render(): VNode {
    return (
      <div class="desktop">
        <DesktopNavMenu />
        <DesktopSideContainer
          width={this.sideContainerWidth}
          maxWidth={SideContainerMaxWidth}
          minWidth={SideContainerMinWidth}
        />
        <div class="desktop-drap-line" ref="drapLine"></div>
        <DesktopMainContainer />
      </div>
    );
  }

  public mounted(): void {
    const store = useConfigsStore();
    // 修改侧边栏宽度
    this.$nextTick(() => {
      // pc端
      this.drapLine.onmousedown = () => {
        document.onmousemove = (e: MouseEvent) => {
          const clientX = e.clientX - DesktopNavMenu.DESKTOP_NAV_MENU_WIDTH;
          store.setSideContainerWidth(clientX);
          return false;
        };
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        return false;
      };
      // 移动端
      this.drapLine.ontouchstart = () => {
        document.ontouchmove = (e: TouchEvent) => {
          const clientX = e.touches[0].clientX - DesktopNavMenu.DESKTOP_NAV_MENU_WIDTH;
          store.setSideContainerWidth(clientX);
        };
      };
      this.drapLine.ontouchend = function () {
        document.ontouchmove = null;
      };
    });
  }
  created(): void {
    if (window.__TAURI__) {
      document.addEventListener('mousedown', async (e) => {
        if ((e.target as HTMLElement).dataset?.['nodrag'] === 'false' || !(e.target as HTMLElement).dataset) {
          return;
        }
        await appWindow.startDragging();
      });
    }
  }
}
