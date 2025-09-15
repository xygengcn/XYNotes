import NoteItem from '@/components/note-item';
import { useMobileSystemSetting } from '@/views/mobile/plugins/system-setting';
import { Icon, Scroller } from '@xynotes/components';
import { Note } from '@xynotes/store';
import { isCheckOnlineSync } from '@xynotes/store/configs';
import {
  addNote,
  noteListCount,
  notesListBySort,
  notesStoreState,
  setActiveNoteId,
  syncNote
} from '@xynotes/store/note';
import { debounce } from '@xynotes/utils';
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { SwipeList } from 'vue3-swipe-actions';
import 'vue3-swipe-actions/dist/index.css';
import './index.scss';

const MobileHome = defineComponent({
  name: 'MobileHome',
  setup() {
    const router = useRouter();
    /**
     * 关键词
     */
    const keyword = ref('');

    /**
     * 列表数据ref
     */
    const swipeListRef = ref<InstanceType<typeof SwipeList> | null>(null);

    /**
     * 抽屉
     */
    const { showMobileSystemSettingView, MobileSystemSettingView } = useMobileSystemSetting();

    /**
     * 搜索
     * @returns
     */
    const handleInput = debounce((e: PointerEvent) => {
      const target = e.target as HTMLInputElement;
      keyword.value = target.value.trimStart();
    });
    /**
     * 笔记列表
     */
    const noteList = computed(() => {
      if (!keyword.value.trim()) {
        return notesListBySort.value;
      }
      return notesListBySort.value.filter((note) => {
        return (
          note.intro?.includes(keyword.value) ||
          note.text?.includes(keyword.value) ||
          note.title?.includes(keyword.value)
        );
      });
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

    onBeforeMount(() => {
      setActiveNoteId('');
    });
    return () => (
      <div class="mobile-home">
        <div class="mobile-home-header">
          <div class="mobile-home-header-search">
            <input type="text" onInput={handleInput} class="mobile-home-header-search__input" placeholder="搜索" />
          </div>
          <div
            class="mobile-home-header-more"
            onClick={() => {
              showMobileSystemSettingView();
            }}
          >
            <Icon type="mobile-more" size="2em"></Icon>
          </div>
        </div>
        <div class="mobile-home-content">
          <Scroller class="mobile-home-content-list" v-show={noteList.value.length > 0}>
            <SwipeList
              ref={swipeListRef}
              class="mobile-home-content-list-scroll"
              items={noteList.value}
              item-key="id"
              v-slots={{
                default: (props) => {
                  return (
                    <NoteItem
                      class="mobile-home-content-list-scroll-item"
                      note={props.item}
                      sortIndex={props.index}
                      onSelect={handleSelectItem}
                      keyword={keyword.value}
                      active={notesStoreState.value.activeNoteId === props.item?.nid}
                    ></NoteItem>
                  );
                },
                right: (props) => {
                  return (
                    <div class="mobile-home-content-list-scroll-right">
                      <div
                        class="mobile-home-content-list-scroll-right-sync"
                        v-show={isCheckOnlineSync()}
                        onClick={() => {
                          syncNote(props.item);
                        }}
                      >
                        <Icon type="sync"> </Icon>
                      </div>
                      <div
                        class="mobile-home-content-list-scroll-right-delete"
                        onClick={() => {
                          handleDeleteNote(props.item);
                        }}
                      >
                        <Icon type="item-delete"> </Icon>
                      </div>
                    </div>
                  );
                }
              }}
            />
          </Scroller>
          <div class="mobile-home-content-blank" v-show={noteList.value.length === 0 && !keyword.value.trim()}>
            <Icon type="list-empty" size={100}></Icon>
            <div class="mobile-home-content-blank-text">
              点击下方<Icon type="create" size="1em"></Icon>创建你的第一个笔记吧!
            </div>
          </div>
        </div>
        <div class="mobile-home-footer">
          <div class="mobile-home-footer-content">
            <span>{noteListCount.value}个笔记</span>
            <span class="mobile-home-footer-content-add" onClick={handleClickAdd}>
              <Icon type="create" size="20px"></Icon>
            </span>
          </div>
        </div>
        <MobileSystemSettingView></MobileSystemSettingView>
      </div>
    );
  }
});

export default MobileHome;
