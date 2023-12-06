import NoteItem from '@/components/note-item';
import { useNotesStore } from '@/store/notes.store';
import { defineComponent } from 'vue';
import './index.scss';

const DesktopSideContainerRecycleContent = defineComponent({
  setup() {
    const store = useNotesStore();

    /**
     * 右键
     * @param cmdKey
     * @param index
     */
    const handleContextmenu = (cmdKey: string, index: string) => {
      const store = useNotesStore();
      const note = index && store.recycleList.find((n) => n.nid === index);
      console.log('[contextmenu] 右键笔记', cmdKey, index, note);
      if (note) {
        switch (cmdKey) {
          case 'recovery':
            window.$ui.confirm({
              type: 'warn',
              width: 300,
              content: '确定恢复这个笔记吗？',
              onSubmit: () => {
                const store = useNotesStore();
                store.recovery(note);
                window.$ui.toast('恢复成功');
              }
            });
            break;
        }
      }
    };

    return () => (
      <div class="desktop-side-container-recycle">
        <div class="desktop-side-container-recycle-header">
          <h3>回收站</h3>
        </div>
        <div class="desktop-side-container-recycle-list">
          {store.recycleList.map((note, index) => {
            return (
              <div class="desktop-side-container-recycle-list-item" data-index={note.nid}>
                <NoteItem note={note} key={note.nid} sortIndex={index} />
              </div>
            );
          })}
        </div>
        {store.recycleList.length === 0 && (
          <div class="desktop-side-container-recycle-blank">暂无缓存数据（刷新清空）</div>
        )}
      </div>
    );
  }
});

export default DesktopSideContainerRecycleContent;
