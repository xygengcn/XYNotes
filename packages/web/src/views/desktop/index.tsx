import { defineComponent } from 'vue';
import DesktopGap from './container/gap';
import { DesktopLeftContainer } from './container/left';
import DesktopMainContainer from './container/main';
import DesktopNavContainer from './container/nav';
import DesktopSideContainer from './container/side';
import './index.scss';

const Desktop = defineComponent({
  name: 'Desktop',
  setup() {
    return () => (
      <div class="desktop">
        <DesktopLeftContainer>
          <DesktopNavContainer />
          <DesktopSideContainer />
          <DesktopGap />
        </DesktopLeftContainer>
        <DesktopMainContainer />
      </div>
    );
  }
});

export default Desktop;
