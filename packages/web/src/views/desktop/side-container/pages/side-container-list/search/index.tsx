import { debounce } from '@/utils/debounce-throttle';
import { defineComponent } from 'vue';
import './index.scss';

const DesktopSideContainerListSearch = defineComponent({
  name: 'DesktopSideContainerListSearch',
  props: {
    keyword: String
  },
  emits: ['update:keyword'],
  setup(props, context) {
    /**
     * 搜索
     * @param e
     * @returns
     */
    const inputDebounce = debounce((e: PointerEvent) => {
      const target = e.target as HTMLInputElement;
      context.emit('update:keyword', target.value);
    }, 600);
    const handleInput = (e: Event) => {
      inputDebounce(e);
    };

    return () => (
      <div class="desktop-side-container-list-search" data-nodrag>
        <input
          type="text"
          placeholder="搜索笔记"
          value={props.keyword}
          onInput={handleInput}
          id="desktopSideContainerListSearch"
        />
      </div>
    );
  }
});

export default DesktopSideContainerListSearch;
