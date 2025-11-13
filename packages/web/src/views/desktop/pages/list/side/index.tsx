import { onAppSynced } from '@xynotes/store/app';
import { sycnNoteList } from '@xynotes/store/note';
import { defineComponent } from 'vue';
import DesktopSideContainerListContent from './content';
import DesktopSideContainerListHeader from './header';
import './index.scss';
import DesktopSideContainerListSearch from './search';

const DesktopSideContainerList = defineComponent({
  name: 'DesktopSideContainerList',
  setup() {
    onAppSynced(() => {
      sycnNoteList();
    });
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
