import NoteItem from '@/components/note-item';
import { Icon, type IContextMenuProps, Scroller } from '@xynotes/components';
import type { Note } from '@xynotes/store';
import { fetchNoteArchiveList, notesStoreState, recovery, removeAllArchiveNote, removeNote } from '@xynotes/store/note';
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import './index.scss';

const DesktopSideContainerArchive = defineComponent({
  name: 'DesktopSideContainerArchive',
  setup() {
    // 路由
    const router = useRouter();
    const route = useRoute();
    const nid = computed(() => route.params?.nid as string);
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
          case 'delete':
            window.$ui.confirm({
              type: 'warn',
              width: 300,
              content: '确定永久移除这个笔记吗？',
              onSubmit: () => {
                removeNote(note.toRaw());
                window.$ui.toast('移除成功');
              }
            });
            break;
          case 'deleteAll':
            window.$ui.confirm({
              type: 'warn',
              width: 300,
              content: '确定永久移除归档的全部笔记吗？',
              onSubmit: () => {
                removeAllArchiveNote();
                window.$ui.toast('移除成功');
              }
            });
            break;
        }
      }
    };

    onBeforeMount(() => {
      fetchNoteArchiveList();
    });

    /**
     * 选中
     * @param note
     */
    const handleSelectItem = async (note: Note) => {
      router.push(`/archive/preview/${note.nid}`);
    };

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
              menuList: [
                { label: '恢复', value: 'recovery' },
                { label: '移除', value: 'delete' },
                { label: '全部移除', value: 'deleteAll' }
              ],
              onSelect: handleContextmenu
            }}
          >
            {notesStoreState.value.archiveNoteList.map((note, index) => {
              return (
                <div class="desktop-side-container-archive-list-item" data-contextmenukey={note.nid}>
                  <NoteItem
                    note={note}
                    key={note.nid}
                    sortIndex={index}
                    onSelect={handleSelectItem}
                    active={nid.value === note.nid}
                  />
                </div>
              );
            })}
          </div>
        </Scroller>
        {notesStoreState.value.archiveNoteList.length === 0 && (
          <div class="desktop-side-container-archive-blank">
            <Icon type="list-empty" size={100}></Icon>
            <span>暂无归档笔记</span>
          </div>
        )}
      </div>
    );
  }
});

export default DesktopSideContainerArchive;
