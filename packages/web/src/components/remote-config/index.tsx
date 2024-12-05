import Input from '@/components/common/input';
import Switch from '@/components/common/switch';
import { useConfigsStore } from '@/store/config.store';
import { defineComponent } from 'vue';
import './index.scss';
import Card from '../common/card';
import { useAppStore } from '@/store/app.store';

const RemoteConfigPage = defineComponent({
  name: 'RemoteConfigPage',
  setup() {
    const config = useConfigsStore();
    const app = useAppStore();
    /**
     * 数据修改
     * @param obj
     */
    const onInputChangeToSaveConfig = (e, origin) => {
      if (e.target.value === origin) {
        return;
      }
      return config.saveGlobalConfig();
    };

    /**
     * 数据切换
     * @param value
     */
    const onSwitchOnlineConfig = async (value: boolean) => {
      if (value && config.configJson.REMOTE_AUTHORIZATION && config.configJson.REMOTE_BASE_URL) {
        config.configJson.REMOTE_ONLINE_SYNC = value;
        // 保存配置
        await config.saveGlobalConfig();
      } else if (!value) {
        config.configJson.REMOTE_ONLINE_SYNC = value;
        // 保存配置
        await config.saveGlobalConfig();
      }
      // 同步数据
      app.sync();
    };
    return () => (
      <div class="remote-config">
        <div class="remote-config-title">服务端配置</div>
        <Card class="remote-config-container">
          <div class="remote-config-container-li">
            <div class="remote-config-container-li-label">同步服务端数据</div>
            <div class="remote-config-container-li-value">
              <Switch value={config.configJson.REMOTE_ONLINE_SYNC} onChange={onSwitchOnlineConfig}></Switch>
            </div>
          </div>
          <div class="remote-config-container-li">
            <div class="remote-config-container-li-label">服务端API地址</div>
            <div class="remote-config-container-li-value">
              <Input
                v-model:value={config.configJson.REMOTE_BASE_URL}
                onBlur={onInputChangeToSaveConfig}
                placeholder="API地址"
              ></Input>
            </div>
          </div>
          <div class="remote-config-container-li">
            <div class="remote-config-container-li-label">服务端Authorization</div>
            <div class="remote-config-container-li-value">
              <Input
                v-model:value={config.configJson.REMOTE_AUTHORIZATION}
                onBlur={onInputChangeToSaveConfig}
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
