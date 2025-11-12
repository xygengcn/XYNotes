import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import DesktopGap from './container/gap';
import { DesktopLeftContainer } from './container/left';
import DesktopMainContainer from './container/main';
import DesktopNavContainer from './container/nav';
import DesktopSideContainer from './container/side';
import './index.scss';

const Desktop = defineComponent({
  name: 'Desktop',
  setup() {
    const route = useRoute();
    return () => (
      <div class="desktop">
        <div class="desktop-container">
          <DesktopLeftContainer side={route.meta?.side ?? true} nav={route.meta?.nav ?? true}>
            <DesktopNavContainer />
            <DesktopSideContainer>
              <router-view name="side"></router-view>
            </DesktopSideContainer>
            <DesktopGap v-show={route.meta?.side ?? true} />
          </DesktopLeftContainer>
          <DesktopMainContainer />
        </div>
      </div>
    );
  }
});

export default Desktop;
