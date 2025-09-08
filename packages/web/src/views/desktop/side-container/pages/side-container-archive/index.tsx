import NoteItem from '@/components/note-item';
import { type IContextMenuProps, Scroller } from '@xynotes/components';
import { fetchNoteArchiveList, notesStoreState, recovery } from '@xynotes/store/note';
import { defineComponent, onBeforeMount } from 'vue';
import './index.scss';

const DesktopSideContainerArchiveContent = defineComponent({
  name: 'DesktopSideContainerArchiveContent',
  setup() {
    /**
     * 右键
     * @param cmdKey
     * @param index
     */
    const handleContextmenu = (options: IContextMenuProps) => {
      const note = options.key && notesStoreState.value.archiveNoteList.find((n) => n.nid === options.key);
      console.log('[contextmenu] 恢复笔记', options, note);
      if (note) {
        switch (options.menu.value) {
          case 'recovery':
            window.$ui.confirm({
              type: 'warn',
              width: 300,
              content: '确定恢复这个笔记吗？',
              onSubmit: () => {
                recovery(note.toRaw());
                window.$ui.toast('恢复成功');
              }
            });
            break;
        }
      }
    };

    onBeforeMount(() => {
      fetchNoteArchiveList();
    });

    return () => (
      <div class="desktop-side-container-archive" data-tauri-drag-region>
        <div class="desktop-side-container-archive-header" data-tauri-drag-region>
          <h3 data-tauri-drag-region>归档</h3>
        </div>
        <Scroller
          class="desktop-side-container-archive-scroll"
          v-show={notesStoreState.value.archiveNoteList.length > 0}
        >
          <div
            class="desktop-side-container-archive-list"
            v-contextmenu={{
              menuList: [{ label: '恢复', value: 'recovery' }],
              onSelect: handleContextmenu
            }}
          >
            {notesStoreState.value.archiveNoteList.map((note, index) => {
              return (
                <div class="desktop-side-container-archive-list-item" data-contextmenukey={note.nid}>
                  <NoteItem note={note} key={note.nid} sortIndex={index} />
                </div>
              );
            })}
          </div>
        </Scroller>
        {notesStoreState.value.archiveNoteList.length === 0 && (
          <div class="desktop-side-container-archive-blank">暂无缓存数据</div>
        )}
      </div>
    );
  }
});

export default DesktopSideContainerArchiveContent;
