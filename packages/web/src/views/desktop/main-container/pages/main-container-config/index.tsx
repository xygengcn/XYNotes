import { defineComponent } from 'vue';
import './index.scss';
import EditorConfig from '@/components/common/editor-config';
import { useConfigsStore } from '@/store/config.store';

const DesktopMainContainerConfig = defineComponent({
  name: 'DesktopMainContainerConfig',
  setup() {
    const config = useConfigsStore();
    /**
     * 数据切换
     * @param obj
     */
    const onChange = (obj: any, value) => {
      config.saveGlobalConfig(obj, value);
    };
    return () => (
      <div class="desktop-main-container-config">
        <div class="desktop-main-container-config-title">
          <h2>全局配置编辑</h2>
        </div>
        <div class="desktop-main-container-config-content">
          <EditorConfig value={config.globalText} onChange={onChange}></EditorConfig>
        </div>
      </div>
    );
  }
});

export default DesktopMainContainerConfig;
