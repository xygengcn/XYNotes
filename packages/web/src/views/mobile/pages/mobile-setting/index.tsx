import Nav from '@/components/common/nav';
import RemoteConfigPage from '@/components/remote-config';
import { defineComponent } from 'vue';
import './index.scss';
import { useRouter } from 'vue-router';

const MobileRemoteConfig = defineComponent({
  name: 'MobileRemoteConfig',
  setup() {
    const router = useRouter();
    return () => (
      <div class="mobile-setting">
        <Nav
          backText="返回"
          title="设置"
          onBack={() => {
            router.push({
              name: 'mobile-home',
              query: {
                routerType: 'push'
              }
            });
          }}
        ></Nav>
        <div class="mobile-setting-container">
          <RemoteConfigPage></RemoteConfigPage>
        </div>
      </div>
    );
  }
});

export default MobileRemoteConfig;
