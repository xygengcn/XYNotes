import RemoteConfigPage from '@/components/remote-setting';
import { Nav } from '@xynotes/components';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import './index.scss';

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
