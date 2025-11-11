import { DesktopLeftContainer } from '@desktop/container/left';
import DesktopMainContainer from '@desktop/container/main';
import DesktopNavContainer from '@desktop/container/nav';
import { defineComponent } from 'vue';
const DesktopContainer = defineComponent({
  name: 'DesktopContainer',
  setup() {
    return () => (
      <div class="desktop-container">
        <DesktopLeftContainer side={false}>
          <DesktopNavContainer />
        </DesktopLeftContainer>
        <DesktopMainContainer />
      </div>
    );
  }
});

export default DesktopContainer;
