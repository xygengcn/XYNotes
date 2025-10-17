import NoteItem from '@/components/note-item';
import { showNoteTagsDrawer } from '@/services/note-tags';
import { showMobileHomeMoreDrawer } from '@/views/mobile/plugins/more';
import { Icon, Scroller } from '@xynotes/components';
import { Note } from '@xynotes/store';
import {
  addNote,
  noteListCount,
  notesListBySort,
  notesStoreState,
  searchNoteList,
  setActiveNoteId
} from '@xynotes/store/note';
import { debounce } from '@xynotes/utils';
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { SwipeList } from 'vue3-swipe-actions';
import 'vue3-swipe-actions/dist/index.css';
import './index.scss';

const MobileHome = defineComponent({
  name: 'MobileHome',
  setup() {
    const router = useRouter();

    /**
     * 列表数据ref
     */
    const swipeListRef = ref<InstanceType<typeof SwipeList> | null>(null);

    /**
     * 搜索
     * @returns
     */
    const handleInput = debounce((e: PointerEvent) => {
      const target = e.target as HTMLInputElement;
      searchNoteList(target.value.trimStart());
    });

    /**
     * 点击
     */
    const handleSelectItem = (note: Note) => {
      return router.push({
        name: 'mobile-detail',
        params: {
          nid: note.nid
        }
      });
    };

    /**
     * 新增
     */
    const handleClickAdd = () => {
      const note = addNote();
      handleSelectItem(note);
    };

    /**
     * 删除
     */
    const handleDeleteNote = (note: Note) => {
      window.$ui.confirm({
        type: 'warn',
        width: 300,
        content: '确定删除这个笔记吗？',
        onSubmit: () => {
          swipeListRef.value?.closeActions();
          note?.archive();
        }
      });
    };

    /**
     * 更多
     */
    const handleClickMore = () => {
      showMobileHomeMoreDrawer({
        onSetting: () => {
          router.push('/m/setting');
        }
      });
    };

    onBeforeMount(() => {
      setActiveNoteId('');
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
                searchNoteList('');
              }}
            ></Icon>
          </div>
          <div class="mobile-home-header-add" onClick={handleClickAdd}>
            <Icon type="create" size="24px"></Icon>
          </div>
        </div>
        <div class="mobile-home-content">
          <Scroller class="mobile-home-content-list" v-show={notesListBySort.value.length > 0}>
            <SwipeList
              ref={swipeListRef}
              class="mobile-home-content-list-scroll"
              items={notesListBySort.value}
              item-key="id"
              v-slots={{
                default: (props) => {
                  return (
                    <NoteItem
                      class="mobile-home-content-list-scroll-item"
                      note={props.item}
                      sortIndex={props.index}
                      onSelect={handleSelectItem}
                      keyword={notesStoreState.value.searchKeyword}
                      active={notesStoreState.value.activeNoteId === props.item?.nid}
                    ></NoteItem>
                  );
                },
                right: (props: { item: Note }) => {
                  return (
                    <div class="mobile-home-content-list-scroll-right">
                      <div
                        class="mobile-home-content-list-scroll-right-tags"
                        onClick={() => {
                          showNoteTagsDrawer(props.item);
                          swipeListRef.value?.closeActions();
                        }}
                      >
                        <Icon type="tags"> </Icon>
                      </div>
                      <div
                        class="mobile-home-content-list-scroll-right-delete"
                        onClick={() => {
                          handleDeleteNote(props.item);
                        }}
                      >
                        <Icon type="trash"> </Icon>
                      </div>
                    </div>
                  );
                }
              }}
            />
          </Scroller>
          <div
            class="mobile-home-content-blank"
            v-show={notesListBySort.value.length === 0 && !notesStoreState.value.searchKeyword.trim()}
          >
            <Icon type="list-empty" size={100}></Icon>
            <div class="mobile-home-content-blank-text">
              点击右上方<Icon type="create" size="1em"></Icon>创建你的第一个笔记吧!
            </div>
          </div>
        </div>
        <div class="mobile-home-footer">
          <div class="mobile-home-footer-content">
            <span>{noteListCount.value}个笔记</span>
            <span class="mobile-home-footer-content-more" onClick={handleClickMore}>
              <Icon type="mobile-more" size="2em"></Icon>
            </span>
          </div>
        </div>
      </div>
    );
  }
});

export default MobileHome;
