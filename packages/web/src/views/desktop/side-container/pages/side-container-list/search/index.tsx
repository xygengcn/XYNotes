import { notesStoreState, searchNoteList } from '@xynotes/store/note';
import { debounce } from '@xynotes/utils';
import { defineComponent } from 'vue';
import './index.scss';

const DesktopSideContainerListSearch = defineComponent({
  name: 'DesktopSideContainerListSearch',
  setup() {
    /**
     * 搜索
     * @param e
     * @returns
     */
    const inputDebounce = debounce((e: PointerEvent) => {
      const target = e.target as HTMLInputElement;
      searchNoteList(target.value.trimStart());
    }, 600);
    const handleInput = (e: Event) => {
      inputDebounce(e);
    };

    return () => (
      <div class="desktop-side-container-list-search" data-tauri-drag-region>
        <input
          type="text"
          placeholder="搜索笔记"
          value={notesStoreState.value.searchKeyword}
          onInput={handleInput}
          none-drag-region
          id="desktopSideContainerListSearch"
        />
      </div>
    );
  }
});

export default DesktopSideContainerListSearch;
