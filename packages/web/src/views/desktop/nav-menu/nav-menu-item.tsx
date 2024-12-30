import IconNavMenu from '@/components/icon-nav-menu';
import { type PropType, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import './index.scss';

export interface IdesktopNavMenuItem {
  title: string;
  icon: string;
  name: string;
  action?: (menu: IdesktopNavMenuItem) => void;
  path?: string;
  visible: boolean;
  size?: number;
}

const DesktopNavMenuItem = defineComponent({
  name: 'DesktopNavMenuItem',
  props: {
    menu: {
      type: Object as PropType<IdesktopNavMenuItem>,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const handleClickNavMenu = () => {
      if (props.menu.path) {
        router.push(props.menu.path);
      }
      props.menu?.action?.(props.menu);
    };
    return () => (
      <div class="desktop-nav-menu-content-list-item" data-tauri-drag-region>
        <div class="desktop-nav-menu-content-list-item-content" data-tauri-drag-region>
          <IconNavMenu
            v-tippy={{ placement: 'right', content: props.menu.title }}
            width={30}
            height={30}
            size={props.menu.size || 14}
            type={props.menu.icon}
            active={props.menu.name === route.name}
            onClick={handleClickNavMenu}
          />
        </div>
      </div>
    );
  }
});

export default DesktopNavMenuItem;
