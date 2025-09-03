import NoteEditor from '@/components/note-editor';
import NoteEditorCounter from '@/components/note-editor/counter';
import NoteEditorTitle from '@/components/note-editor/title';
import { Icon } from '@xynotes/components';
import { activeNote } from '@xynotes/store/note';
import { defineComponent } from 'vue';
import './index.scss';
import DesktopMainContainerDefaultRight from './right-bar';

const DesktopMainContainerDefault = defineComponent({
  name: 'DesktopMainContainerDefault',
  setup() {
    return () => (
      <div class="desktop-main-container-default">
        {activeNote.value && (
          <div class="desktop-main-container-default-content">
            <div class="desktop-main-container-default-content-left">
              <NoteEditor nid={activeNote.value.nid}>
                {{
                  header: ({ note, onEnter }) => [
                    <NoteEditorCounter note={note} />,
                    <NoteEditorTitle note={note} onEnter={onEnter} />
                  ]
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
