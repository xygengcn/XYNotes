import { defineComponent } from 'vue';
import DesktopSideContainerListContent from './content';
import DesktopSideContainerListHeader from './header';
import './index.scss';
import DesktopSideContainerListSearch from './search';

const DesktopSideContainerList = defineComponent({
  name: 'DesktopSideContainerList',
  setup() {
    return () => (
      <div class="desktop-side-container-list">
        <DesktopSideContainerListHeader />
        <DesktopSideContainerListSearch />
        <DesktopSideContainerListContent />
      </div>
    );
  }
});

export default DesktopSideContainerList;
