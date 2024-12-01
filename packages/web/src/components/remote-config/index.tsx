import Input from '@/components/common/input';
import Switch from '@/components/common/switch';
import { useConfigsStore } from '@/store/config.store';
import { defineComponent } from 'vue';
import './index.scss';
import Card from '../common/card';

const RemoteConfigPage = defineComponent({
  name: 'RemoteConfigPage',
  setup() {
    const config = useConfigsStore();
    /**
     * 数据切换
     * @param obj
     */
    const onChange = () => {
      config.saveGlobalConfig();
    };
    return () => (
      <div class="remote-config">
        <div class="remote-config-title">服务端配置</div>
        <Card class="remote-config-container">
          <div class="remote-config-container-li">
            <div class="remote-config-container-li-label">同步服务端数据</div>
            <div class="remote-config-container-li-value">
              <Switch
                value={config.configJson.REMOTE_ONLINE_SYNC}
                onChange={(value) => {
                  if (value && config.configJson.REMOTE_AUTHORIZATION && config.configJson.REMOTE_BASE_URL) {
                    config.configJson.REMOTE_ONLINE_SYNC = value;
                    onChange();
                  }
                }}
              ></Switch>
            </div>
          </div>
          <div class="remote-config-container-li">
            <div class="remote-config-container-li-label">服务端API地址</div>
            <div class="remote-config-container-li-value">
              <Input v-model:value={config.configJson.REMOTE_BASE_URL} onBlur={onChange} placeholder="API地址"></Input>
            </div>
          </div>
          <div class="remote-config-container-li">
            <div class="remote-config-container-li-label">服务端Authorization</div>
            <div class="remote-config-container-li-value">
              <Input
                v-model:value={config.configJson.REMOTE_AUTHORIZATION}
                onBlur={onChange}
                placeholder="输入token"
              ></Input>
            </div>
          </div>
        </Card>
      </div>
    );
  }
});

export default RemoteConfigPage;
