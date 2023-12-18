import Icon from '@/components/common/icon';
import NoteEditor from '@/components/note-editor';
import { useNotesStore } from '@/store/notes.store';
import { computed, defineComponent } from 'vue';
import './index.scss';
import DesktopMainContainerDefaultRight from './right-bar';
import NoteEditorCounter from '@/components/note-editor/counter';
import NoteEditorTitle from '@/components/note-editor/title';

const DesktopMainContainerDefault = defineComponent({
  name: 'DesktopMainContainerDefault',
  setup() {
    const store = useNotesStore();
    /**
     * 当前选中笔记
     */
    const activeNote = computed(() => {
      return store.activeNote;
    });
    return () => (
      <div class="desktop-main-container-default">
        {activeNote.value && (
          <div class="desktop-main-container-default-content">
            <div class="desktop-main-container-default-content-left">
              <NoteEditor nid={activeNote.value.nid}>
                {{
                  header: ({ note }) => [<NoteEditorCounter note={note} />, <NoteEditorTitle note={note} />]
                }}
              </NoteEditor>
            </div>
            <DesktopMainContainerDefaultRight note={activeNote.value} />
          </div>
        )}
        <div class="desktop-main-container-default__default" v-show={!activeNote.value} data-tauri-drag-region>
          <Icon type="logo" size={200} data-tauri-drag-region></Icon>
        </div>
      </div>
    );
  }
});

export default DesktopMainContainerDefault;
