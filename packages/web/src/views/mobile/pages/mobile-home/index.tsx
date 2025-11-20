import { Icon } from '@xynotes/components';
import { isCheckOnlineSync } from '@xynotes/store/app';
import { notesStoreAction, notesStoreState } from '@xynotes/store/note';
import { debounce } from '@xynotes/utils';
import { defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import 'vue3-swipe-actions/dist/index.css';
import { MobileHomeFooter } from './footer';
import './index.scss';
import { MobileHomeNoteList } from './note-list';
import MobileHomeTaskBar from './task-bar';

const MobileHome = defineComponent({
  name: 'MobileHome',
  setup() {
    const router = useRouter();

    /**
     * 搜索
     * @returns
     */
    const handleInput = debounce((e: PointerEvent) => {
      const target = e.target as HTMLInputElement;
      notesStoreAction.searchNoteList(target.value.trimStart());
    });

    /**
     * 新增
     */
    const handleClickAdd = () => {
      const note = notesStoreAction.addNote();
      return router.push({
        name: 'mobile-detail',
        params: {
          nid: note.nid
        }
      });
    };

    onBeforeMount(() => {
      notesStoreAction.setActiveNoteId('');
    });
    return () => (
      <div class="mobile-home">
        <div class="mobile-home-header">
          <div class="mobile-home-header-search">
            <input
              type="text"
              onInput={handleInput}
              class="mobile-home-header-search__input"
              placeholder="搜索"
              value={notesStoreState.value.searchKeyword}
            />
            <Icon
              type="delete"
              v-show={notesStoreState.value.searchKeyword.length > 0}
              onClick={() => {
                notesStoreAction.searchNoteList('');
              }}
            ></Icon>
          </div>
          <div
            class="mobile-home-header-add"
            onClick={handleClickAdd}
            v-show={notesStoreState.value.searchKeyword.length === 0}
          >
            <Icon type="create" size="24px"></Icon>
          </div>
        </div>
        <div class="mobile-home-content">
          <MobileHomeTaskBar v-show={isCheckOnlineSync.value}></MobileHomeTaskBar>
          <MobileHomeNoteList></MobileHomeNoteList>
        </div>
        <MobileHomeFooter />
      </div>
    );
  }
});

export default MobileHome;
