import { Drawer, Icon } from '@xynotes/components';
import { Note } from '@xynotes/store';
import { NoteStatus } from '@xynotes/typings';
import { createApp, defineAsyncComponent, ref } from 'vue';
import './index.scss';

export function useNoteTags(note: Note) {
  /**
   * 是否显示抽屉
   */
  const visible = ref(false);

  const show = () => {
    visible.value = true;
  };

  const hide = () => {
    visible.value = false;
  };

  /**
   * 保存
   */
  const handleClickSubmit = () => {
    note.set({ tags: note.tags, status: NoteStatus.draft });
    note.save(true);
    hide();
  };

  const view = () => {
    const Component = defineAsyncComponent(() => import('./content'));
    return (
      <Drawer class="note-tags-drawer" visible={visible.value} onClose={hide}>
        <div class="note-tags-drawer-wrapper">
          <div class="note-tags-drawer-wrapper-header">
            <span class="active" onClick={hide}>
              取消
            </span>
            <span class="title">
              <Icon type="tags" size={24}></Icon>
            </span>
            <span class="active" onClick={handleClickSubmit}>
              确定
            </span>
          </div>
          <Component note={note}></Component>
        </div>
      </Drawer>
    );
  };

  return {
    hide,
    show,
    view
  };
}

export default function showNoteTagsDialog(note: Note) {
  console.log('[showNoteTagsDialog]', note);
  const instance = document.querySelector('#NoteTags');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'NoteTags';
  document.body.appendChild(el);
  const app = createApp(
    defineAsyncComponent(() => import('./dialog')),
    {
      note,
      onClose() {
        app.unmount();
        el && document.body.removeChild(el);
      }
    }
  );
  app.mount(el);
}
