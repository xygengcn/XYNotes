import DesktopGap from '@desktop/container/gap';
import { DesktopLeftContainer } from '@desktop/container/left';
import DesktopMainContainer from '@desktop/container/main';
import DesktopNavContainer from '@desktop/container/nav';
import DesktopSideContainer from '@desktop/container/side';
import { defineComponent } from 'vue';
import DesktopSideContainerList from './side';

const DesktopContainer = defineComponent({
  name: 'DesktopContainer',
  setup() {
    return () => (
      <div class="desktop-container">
        <DesktopLeftContainer>
          <DesktopNavContainer />
          <DesktopSideContainer>
            <DesktopSideContainerList />
          </DesktopSideContainer>
          <DesktopGap />
        </DesktopLeftContainer>
        <DesktopMainContainer />
      </div>
    );
  }
});

export default DesktopContainer;
