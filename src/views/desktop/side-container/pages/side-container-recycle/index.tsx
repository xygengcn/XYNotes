import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
import { Note } from '@/services/note';
import { useNotesStore } from '@/store/notes.store';
import NoteItem from '@/components/note-item';
import contextmenu from '@/components/common/contextmenu';
interface IDesktopSideContainerListContentProps {
  keyword?: string;
}

@Component
export default class DesktopSideContainerRecycleContent extends VueComponent<IDesktopSideContainerListContentProps> {
  public render(): VNode {
    const store = useNotesStore();
    return (
      <div class="desktop-side-container-recycle">
        <div class="desktop-side-container-recycle-header">
          <h3>回收站</h3>
        </div>
        <div class="desktop-side-container-recycle-list">
          {store.recycleList.map((note, index) => {
            return (
              <div
                class="desktop-side-container-recycle-list-item"
                data-index={index}
                oncontextmenu={(e) => {
                  this.handleContextmenu(e, note);
                }}
              >
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

  private handleContextmenu(event: PointerEvent, note: Note) {
    if (note) {
      contextmenu(event, [{ lable: '恢复', key: 'recovery' }], (key) => {
        switch (key) {
          case 'recovery':
            window.$ui.confirm({
              type: 'warn',
              width: 250,
              content: '确定恢复这个笔记吗？',
              onSubmit: (context) => {
                const store = useNotesStore();
                store.recovery(note);
                window.$ui.toast('恢复成功');
                context.close();
              },
            });
            break;
        }
      });
    }
  }
}
