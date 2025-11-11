import { configsStoreState } from '@xynotes/store/configs';
import { computed, defineComponent } from 'vue';
import './index.scss';

// 最大值
export const SIDE_CONTAINER_MAX_WIDTH = 500;

// 最小值
export const SIDE_CONTAINER_MIN_WIDTH = 250;

const DesktopSideContainer = defineComponent({
  name: 'DesktopSideContainer',
  setup(_, context) {
    /**
     * 列表栏长度
     */
    const sideContainerWidth = computed(() => {
      return configsStoreState.value.SIDE_CONTAINER_MAX_WIDTH;
    });

    return () => (
      <div
        class="desktop-side-container"
        style={{
          width: sideContainerWidth.value + 'px',
          minWidth: SIDE_CONTAINER_MIN_WIDTH + 'px',
          maxWidth: SIDE_CONTAINER_MAX_WIDTH + 'px'
        }}
      >
        {context.slots?.default()}
      </div>
    );
  }
});

export default DesktopSideContainer;
