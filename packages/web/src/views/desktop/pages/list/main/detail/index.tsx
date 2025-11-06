import NoteEditor from '@/components/note-editor';
import NoteEditorCounter from '@/components/note-editor/counter';
import NoteEditorTitle from '@/components/note-editor/title';
import { Icon } from '@xynotes/components';
import { activeNote, setActiveNoteId } from '@xynotes/store/note';
import { defineComponent, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import './index.scss';
import DesktopMainContainerDetailRight from './right-bar';

const DesktopMainContainerDetail = defineComponent({
  name: 'DesktopMainContainerDetail',
  setup() {
    /**
     * store
     */
    const route = useRoute();
    const router = useRouter();

    onBeforeMount(() => {
      if (route.params?.nid) {
        setActiveNoteId(route.params?.nid as string);
      } else {
        router.push('/');
      }
    });

    return () => (
      <div class="desktop-main-container-detail">
        {activeNote.value && (
          <div class="desktop-main-container-detail-content">
            <div class="desktop-main-container-detail-content-left">
              <NoteEditor nid={activeNote.value.nid}>
                {{
                  header: ({ note, onEnter }) => [
                    <NoteEditorCounter note={note} />,
                    <NoteEditorTitle note={note} onEnter={onEnter} />
                  ]
                }}
              </NoteEditor>
            </div>
            <DesktopMainContainerDetailRight note={activeNote.value} />
          </div>
        )}
        <div class="desktop-main-container-detail-blank" v-show={!activeNote.value} data-tauri-drag-region>
          <Icon type="logo" size={200} data-tauri-drag-region></Icon>
        </div>
      </div>
    );
  }
});

export default DesktopMainContainerDetail;
