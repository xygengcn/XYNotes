import Input from '@/components/common/input';
import Switch from '@/components/common/switch';
import { IConfigs } from '@xynotes/store';
import { configsStoreState, setConfig } from '@xynotes/store/configs';
import { defineComponent } from 'vue';
import Card from '../common/card';
import './index.scss';
import { syncApp } from '@xynotes/store/app';

const RemoteConfigPage = defineComponent({
  name: 'RemoteConfigPage',
  setup() {
    /**
     * 数据修改
     * @param obj
     */
    const onInputChangeToSaveConfig = (e: Event, origin: string, key: keyof IConfigs) => {
      if ((e.target as HTMLInputElement).value === origin) {
        return;
      }
      return setConfig(key, (e.target as HTMLInputElement).value);
    };

    /**
     * 数据切换
     * @param value
     */
    const onSwitchOnlineConfig = async (value: boolean) => {
      if (
        (value && configsStoreState.value.REMOTE_AUTHORIZATION && configsStoreState.value.REMOTE_BASE_URL) ||
        !value
      ) {
        await setConfig('REMOTE_ONLINE_SYNC', value);
        // 同步数据
        syncApp();
      }
    };
    return () => (
      <div class="remote-config">
        <div class="remote-config-title">服务端配置</div>
        <Card class="remote-config-container">
          <div class="remote-config-container-li">
            <div class="remote-config-container-li-label">同步服务端数据</div>
            <div class="remote-config-container-li-value">
              <Switch value={configsStoreState.value.REMOTE_ONLINE_SYNC} onChange={onSwitchOnlineConfig}></Switch>
            </div>
          </div>
          <div class="remote-config-container-li">
            <div class="remote-config-container-li-label">服务端API地址</div>
            <div class="remote-config-container-li-value">
              <Input
                v-model:value={configsStoreState.value.REMOTE_BASE_URL}
                onBlur={(e, origin) => onInputChangeToSaveConfig(e, origin, 'REMOTE_BASE_URL')}
                placeholder="API地址"
              ></Input>
            </div>
          </div>
          <div class="remote-config-container-li">
            <div class="remote-config-container-li-label">服务端Authorization</div>
            <div class="remote-config-container-li-value">
              <Input
                v-model:value={configsStoreState.value.REMOTE_AUTHORIZATION}
                onBlur={(e, origin) => onInputChangeToSaveConfig(e, origin, 'REMOTE_AUTHORIZATION')}
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
