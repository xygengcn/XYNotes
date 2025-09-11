import { Card, Input, Switch } from '@xynotes/components';
import { type IConfigs } from '@xynotes/store';
import { syncApp } from '@xynotes/store/app';
import { configsStoreState, setConfig } from '@xynotes/store/configs';
import { defineComponent } from 'vue';
import './index.scss';

const RemoteConfigSetting = defineComponent({
  name: 'RemoteConfigSetting',
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
      // 生产环境直接切换
      if (import.meta.env.VITE_APP_ENV !== 'development') {
        await setConfig('REMOTE_ONLINE_SYNC', value);
        // 同步数据
        syncApp();
        return;
      }

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
        <div class="remote-config-title">云同步配置</div>
        <Card class="remote-config-container">
          <div class="remote-config-container-li">
            <div class="remote-config-container-li-label">云同步</div>
            <div class="remote-config-container-li-value">
              <Switch value={configsStoreState.value.REMOTE_ONLINE_SYNC} onChange={onSwitchOnlineConfig}></Switch>
            </div>
          </div>
          <div class="remote-config-container-li">
            <div class="remote-config-container-li-label">云同步地址</div>
            <div class="remote-config-container-li-value">
              <Input
                v-model:value={configsStoreState.value.REMOTE_BASE_URL}
                onBlur={(e, origin) => onInputChangeToSaveConfig(e, origin, 'REMOTE_BASE_URL')}
                placeholder="服务端API地址"
              ></Input>
            </div>
          </div>
          <div class="remote-config-container-li">
            <div class="remote-config-container-li-label">云同步认证</div>
            <div class="remote-config-container-li-value">
              <Input
                v-model:value={configsStoreState.value.REMOTE_AUTHORIZATION}
                onBlur={(e, origin) => onInputChangeToSaveConfig(e, origin, 'REMOTE_AUTHORIZATION')}
                placeholder="Access Token"
                disabled={import.meta.env.VITE_APP_ENV !== 'development'}
              ></Input>
            </div>
          </div>
        </Card>
      </div>
    );
  }
});

export default RemoteConfigSetting;
