import { useDrawer } from '@xynotes/components';
import { defineAsyncComponent } from 'vue';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import './index.scss';

export function showMobileHomeMoreDrawer(options: { onSetting?: () => void }) {
  const { show } = useDrawer(
    defineAsyncComponent(() => import('./drawer')),
    {
      id: 'mobile-home-more-drawer',
      drawerOptions: { height: 'max-content' },
      contentProps: {
        onSetting: options.onSetting
      }
    }
  );
  show();
}
