import NoteItem from '@/components/note-item';
import { createWindow, exsitAppWindow, setWindowFocus } from '@xynotes/app-api';
import { Icon, type IContextMenuProps, Scroller } from '@xynotes/components';
import { Note } from '@xynotes/store';
import { notesListBySort, notesStoreState, setActiveNoteId } from '@xynotes/store/note';
import { is } from '@xynotes/utils';
import { computed, defineComponent } from 'vue';
import './index.scss';

const DesktopSideContainerListContent = defineComponent({
  name: 'DesktopSideContainerListContent',
  props: {
    keyword: String
  },
  setup(props) {
    // 笔记列表
    const noteList = computed(() => {
      if (!props.keyword.trim()) {
        return notesListBySort.value;
      }
      return notesListBySort.value.filter((note) => {
        return note.text.indexOf(props.keyword) > -1 || note.title.indexOf(props.keyword) > -1;
      });
    });

    /**
     * 右键
     * @param cmdKey
     * @param index
     */
    const handleContextmenu = (options: IContextMenuProps) => {
      const note = options.key && noteList.value.find((n) => n.nid === options.key);
      if (note && options.menu) {
        switch (options.menu.value) {
          case 'sync':
            note.sync();
            break;
          case 'split':
            createWindow({ nid: note.nid });
            break;
          case 'archive':
            window.$ui.confirm({
              type: 'warn',
              width: 300,
              content: `归档后的笔记不再支持编辑，确定归档《${note.title}》这个笔记吗？`,
              onSubmit: () => {
                note.archive();
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
          setActiveNoteId(undefined);
          return;
        }
      }
      setActiveNoteId(note.nid);
    };

    return () => (
      <Scroller class="desktop-side-container-list-content">
        <div
          class="desktop-side-container-list-content-list"
          v-show={noteList.value.length > 0}
          v-contextmenu={{
            menuList: [
              { label: '同步', value: 'sync' },
              { label: '分屏', value: 'split', visible: is.app() },
              { label: '归档', value: 'archive' }
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
                  active={notesStoreState.value.activeNoteId === note?.nid}
                />
              </div>
            );
          })}
        </div>
        {noteList.value.length === 0 && (
          <div class="desktop-side-container-list-content-blank">
            <Icon type="list-empty" size={100}></Icon>
            <span>快来创建你的第一个笔记吧!</span>
          </div>
        )}
      </Scroller>
    );
  }
});

export default DesktopSideContainerListContent;
