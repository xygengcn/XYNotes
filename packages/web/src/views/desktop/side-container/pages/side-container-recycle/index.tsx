import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
import { useNotesStore } from '@/store/notes.store';
import NoteItem from '@/components/note-item';
import vContextMenu from '@/directive/contextmenu';
interface IDesktopSideContainerListContentProps {
  keyword?: string;
}

@Component({
  name: 'DesktopSideContainerRecycleContent',
  directives: {
    contextmenu: vContextMenu,
  },
})
export default class DesktopSideContainerRecycleContent extends VueComponent<IDesktopSideContainerListContentProps> {
  public render(): VNode {
    const store = useNotesStore();
    return (
      <div class="desktop-side-container-recycle">
        <div class="desktop-side-container-recycle-header">
          <h3>回收站</h3>
        </div>
        <div
          class="desktop-side-container-recycle-list"
          vContextmenu={{
            menu: [{ label: '恢复', value: 'recovery' }],
            onSelect: (value, index) => {
              this.handleContextmenu(value, index);
            },
          }}
        >
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

  /**
   * 右键
   * @param cmdKey
   * @param index
   */
  private handleContextmenu(cmdKey: string, index: string) {
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
            onSubmit: (context) => {
              const store = useNotesStore();
              store.recovery(note);
              window.$ui.toast('恢复成功');
              context.close();
            },
          });
          break;
      }
    }
  }
}
