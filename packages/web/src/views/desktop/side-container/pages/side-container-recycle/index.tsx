import NoteItem from '@/components/note-item';
import { useNotesStore } from '@/store/notes.store';
import { defineComponent } from 'vue';
import './index.scss';
import { IContextMenuProps } from '@/typings/contextmenu';
import Scroller from '@/components/common/scroller';

const DesktopSideContainerRecycleContent = defineComponent({
  name: 'DesktopSideContainerRecycleContent',
  setup() {
    const store = useNotesStore();

    /**
     * 右键
     * @param cmdKey
     * @param index
     */
    const handleContextmenu = (options: IContextMenuProps) => {
      const note = options.key && store.recycleList.find((n) => n.nid === options.key);
      console.log('[contextmenu] 恢复笔记', options, note);
      if (note) {
        switch (options.menu.value) {
          case 'recovery':
            window.$ui.confirm({
              type: 'warn',
              width: 300,
              content: '确定恢复这个笔记吗？',
              onSubmit: () => {
                store.recovery(note);
                window.$ui.toast('恢复成功');
              }
            });
            break;
        }
      }
    };

    return () => (
      <div class="desktop-side-container-recycle" data-tauri-drag-region>
        <div class="desktop-side-container-recycle-header" data-tauri-drag-region>
          <h3 data-tauri-drag-region>回收站</h3>
        </div>
        <Scroller class="desktop-side-container-recycle-scroll" v-show={store.recycleList.length > 0}>
          <div
            class="desktop-side-container-recycle-list"
            v-contextmenu={{
              menuList: [{ label: '恢复', value: 'recovery' }],
              onSelect: handleContextmenu
            }}
          >
            {store.recycleList.map((note, index) => {
              return (
                <div class="desktop-side-container-recycle-list-item" data-contextmenukey={note.nid}>
                  <NoteItem note={note} key={note.nid} sortIndex={index} />
                </div>
              );
            })}
          </div>
        </Scroller>
        {store.recycleList.length === 0 && (
          <div class="desktop-side-container-recycle-blank">暂无缓存数据（刷新清空）</div>
        )}
      </div>
    );
  }
});

export default DesktopSideContainerRecycleContent;
