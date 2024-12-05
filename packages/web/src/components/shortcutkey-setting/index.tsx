import { useConfigsStore } from '@/store/config.store';
import { registerShortcut, showMainWindow, unregisterAllShortcut } from '@xynotes/app-api';
import { defineComponent } from 'vue';
import Card from '../common/card';
import ShortcutInput from '../common/input-shortcut';
import './index.scss';

const ShortcutkeysSetting = defineComponent({
  name: 'ShortcutkeysSetting',
  setup() {
    const config = useConfigsStore();
    /**
     * 数据修改
     * @param obj
     */
    const onInputChangeToSaveConfig = async (value: string) => {
      console.info('[shortcut] register', value);
      await unregisterAllShortcut();
      if (value) {
        registerShortcut(value, () => {
          showMainWindow();
        })
          .then(() => {
            config.saveGlobalConfig();
          })
          .catch((e) => {
            console.error('[shortcut] setting', e);
          });
      }
    };

    return () => (
      <div class="shortcutkeys-setting">
        <div class="shortcutkeys-setting-title">快捷键设置</div>
        <Card class="shortcutkeys-setting-container">
          <div class="shortcutkeys-setting-container-li">
            <div class="shortcutkeys-setting-container-li-label">显示主界面</div>
            <div class="shortcutkeys-setting-container-li-value">
              <ShortcutInput
                placeholder="按下键盘"
                v-model:value={config.configJson.SHORTCUT_KEY_SHOW}
                onInput={onInputChangeToSaveConfig}
              ></ShortcutInput>
            </div>
          </div>
        </Card>
      </div>
    );
  }
});

export default ShortcutkeysSetting;
