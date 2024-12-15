import Scroller from '@/components/common/scroller';
import NoteItem from '@/components/note-item';
import { IContextMenuProps } from '@xynotes/components';
import { createWindow, exsitAppWindow, setWindowFocus } from '@xynotes/app-api';
import { Note } from '@xynotes/store';
import { notesListBySort, setActiveNoteId } from '@xynotes/store/note';
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
      console.log('[contextmenu] 右键笔记', options, note);
      if (note && options.menu) {
        switch (options.menu.value) {
          case 'sync':
            note.sync();
            break;
          case 'split':
            createWindow({ nid: note.nid });
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
          v-contextmenu={{
            menuList: [
              { label: '同步', value: 'sync' },
              { label: '分屏', value: 'split', visible: is.app() },
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
