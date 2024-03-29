import { defineComponent, ref } from 'vue';
import DesktopSideContainerListContent from './content';
import DesktopSideContainerListHeader from './header';
import './index.scss';
import DesktopSideContainerListSearch from './search';

const DesktopSideContainerList = defineComponent({
  name: 'DesktopSideContainerList',
  setup() {
    const keyword = ref('');
    return () => (
      <div class="desktop-side-container-list">
        <DesktopSideContainerListHeader />
        <DesktopSideContainerListSearch v-model:keyword={keyword.value} />
        <DesktopSideContainerListContent keyword={keyword.value} />
      </div>
    );
  }
});

export default DesktopSideContainerList;
