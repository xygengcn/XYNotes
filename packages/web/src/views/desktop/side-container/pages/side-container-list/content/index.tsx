import Scroller from '@/components/common/scroller';
import NoteItem from '@/components/note-item';
import { Note } from '@/services/note';
import { useConfigsStore } from '@/store/config.store';
import { useNotesStore } from '@/store/notes.store';
import { IContextMenuProps } from '@/typings/contextmenu';
import { NoteListSortType } from '@/typings/enum/note';
import { computed, defineComponent } from 'vue';
import './index.scss';
import { is } from '@xynotes/utils';
import { exsitAppWindow, setWindowFocus } from '@xynotes/app-api';

const DesktopSideContainerListContent = defineComponent({
  name: 'DesktopSideContainerListContent',
  props: {
    keyword: String
  },
  setup(props) {
    const store = useNotesStore();
    const configStore = useConfigsStore();

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
          case 'sync':
            note.sync();
            break;
          case 'delete':
            window.$ui.confirm({
              type: 'warn',
              width: 300,
              content: `确定删除《${note.title}》这个笔记吗？`,
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
    const handleSelectItem = async (note: Note) => {
      if (is.app()) {
        const has = await exsitAppWindow(note.nid);
        if (has) {
          setWindowFocus(note.nid);
          store.setActiveNoteId(undefined);
          return;
        }
      }
      store.setActiveNoteId(note.nid);
    };

    return () => (
      <Scroller class="desktop-side-container-list-content">
        <div
          class="desktop-side-container-list-content-list"
          v-contextmenu={{
            menuList: [
              { label: '同步', value: 'sync' },
              { label: '删除', value: 'delete' }
            ],
            onSelect: handleContextmenu
          }}
        >
          {noteList.value.map((note, index) => {
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
      </Scroller>
    );
  }
});

export default DesktopSideContainerListContent;
