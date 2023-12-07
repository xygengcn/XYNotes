import NoteItem from '@/components/note-item';
import { Note } from '@/services/note';
import { useConfigsStore } from '@/store/config.store';
import { useNotesStore } from '@/store/notes.store';
import { IContextMenuProps } from '@/typings/contextmenu';
import { NoteListSortType } from '@/typings/enum/note';
import { computed, defineComponent, ref } from 'vue';
import './index.scss';

const DesktopSideContainerListContent = defineComponent({
  name: 'DesktopSideContainerListContent',
  props: {
    keyword: String
  },
  setup(props) {
    const store = useNotesStore();
    const configStore = useConfigsStore();

    // 显示数量
    const listLimit = ref(20);

    /**
     * 滚动, 主动置顶
     * @param e
     */
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      if (target && target.scrollTop + target.clientHeight + 30 >= target.scrollHeight) {
        listLimit.value += 10;
        listLimit.value = Math.max(noteList.value.length, listLimit.value);
      }
    };

    /**
     * 排序类型
     */
    const noteListSortType = computed(() => {
      return configStore.noteListSort?.value || NoteListSortType.updated;
    });
    // 笔记列表
    const noteList = computed(() => {
      if (!props.keyword.trim()) {
        return store.notesList.sort((a, b) => {
          return b[noteListSortType.value] - a[noteListSortType.value];
        });
      }
      return store.notesList
        .filter((note) => {
          return note.text.includes(props.keyword) || note.title.includes(props.keyword);
        })
        .sort((a, b) => {
          return b[noteListSortType.value] - a[noteListSortType.value];
        });
    });

    /**
     * 右键
     * @param cmdKey
     * @param index
     */
    const handleContextmenu = (options: IContextMenuProps) => {
      const note = options.key && noteList.value.find((n) => n.nid === options.key);
      console.log('[contextmenu] 右键笔记', options, note);
      if (note && options.menu) {
        switch (options.menu.value) {
          case 'delete':
            window.$ui.confirm({
              type: 'warn',
              width: 300,
              content: '确定删除这个笔记吗？',
              onSubmit: () => {
                note.delete();
              }
            });
            break;
        }
      }
    };

    /**
     * 选中
     * @param note
     */
    const handleSelectItem = (note: Note) => {
      store.setActiveNoteId(note.nid);
    };

    return () => (
      <div class="desktop-side-container-list-content">
        <div
          class="desktop-side-container-list-content-list"
          onScroll={handleScroll}
          v-contextmenu={{ menuList: [{ label: '删除', value: 'delete' }], onSelect: handleContextmenu }}
        >
          {noteList.value.slice(0, listLimit.value).map((note, index) => {
            return (
              <div class="desktop-side-container-list-content-list-item" data-contextmenukey={note.nid}>
                <NoteItem
                  note={note}
                  key={note.nid}
                  sortIndex={index}
                  keyword={props.keyword}
                  onSelect={handleSelectItem}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

export default DesktopSideContainerListContent;
