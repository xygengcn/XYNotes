import { debounce } from '@/utils/debounce-throttle';
import { defineComponent } from 'vue';
import './index.scss';

const DesktopSideContainerListSearch = defineComponent({
  props: {
    value: String
  },
  setup(props, context) {
    /**
     * 搜索
     * @param e
     * @returns
     */
    const handleInput = () => {
      return debounce((e: PointerEvent) => {
        const target = e.target as HTMLInputElement;
        context.emit('input', target.value);
      });
    };
    return () => (
      <div class="desktop-side-container-list-search" data-nodrag>
        <input
          type="text"
          placeholder="搜索笔记"
          value={props.value}
          onInput={handleInput}
          id="desktopSideContainerListSearch"
        />
      </div>
    );
  }
});

export default DesktopSideContainerListSearch;
