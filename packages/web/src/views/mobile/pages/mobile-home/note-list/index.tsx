import NoteItem from '@/components/note-item';
import { showNoteTagsDrawer } from '@/services/note-tags';
import { Icon, Scroller } from '@xynotes/components';
import { Note } from '@xynotes/store';
import { onAppSynced } from '@xynotes/store/app';
import { notesListBySort, notesStoreState, sycnNoteList } from '@xynotes/store/note';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { SwipeList } from 'vue3-swipe-actions';
import './index.scss';

export const MobileHomeNoteList = defineComponent({
  name: 'MobileHomeNoteList',
  setup() {
    /**
     * 列表数据ref
     */
    const swipeListRef = ref<InstanceType<typeof SwipeList> | null>(null);

    const router = useRouter();

    /**
     * 归档
     */
    const handleArchiveNote = (note: Note) => {
      window.$ui.confirm({
        type: 'warn',
        width: 300,
        content: '确定归档这个笔记吗？',
        onSubmit: () => {
          swipeListRef.value?.closeActions();
          note?.archive();
        }
      });
    };

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

    onAppSynced(() => {
      sycnNoteList();
    });
    return () => (
      <div class="mobile-home-note-list">
        <Scroller class="mobile-home-note-list-content" v-show={notesListBySort.value.length > 0}>
          <SwipeList
            ref={swipeListRef}
            class="mobile-home-note-list-content-scroll"
            items={notesListBySort.value}
            item-key="id"
            v-slots={{
              default: (props) => {
                return (
                  <NoteItem
                    class="mobile-home-note-list-content-scroll-item"
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
                  <div class="mobile-home-note-list-content-scroll-right">
                    <div
                      class="mobile-home-note-list-content-scroll-right-tags"
                      onClick={() => {
                        showNoteTagsDrawer(props.item);
                        swipeListRef.value?.closeActions();
                      }}
                    >
                      <Icon type="tags"> </Icon>
                    </div>
                    <div
                      class="mobile-home-note-list-content-scroll-right-delete"
                      onClick={() => {
                        handleArchiveNote(props.item);
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
          class="mobile-home-note-list-blank"
          v-show={notesListBySort.value.length === 0 && !notesStoreState.value.searchKeyword.trim()}
        >
          <Icon type="list-empty" size={100}></Icon>
          <div class="mobile-home-note-list-blank-text">
            点击右上方<Icon type="create" size="1em"></Icon>创建你的第一个笔记吧!
          </div>
        </div>
      </div>
    );
  }
});
