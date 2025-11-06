import { Icon } from '@xynotes/components';
import { EditorPerview, useEditorPreview } from '@xynotes/editor';
import { computed, defineComponent, watch } from 'vue';
import './index.scss';
import DesktopMainContainerArchiveRight from './right-bar';
import { useRoute } from 'vue-router';
import { notesStoreState } from '@xynotes/store/note';

const DesktopMainContainerArchive = defineComponent({
  name: 'DesktopMainContainerArchive',
  setup() {
    const route = useRoute();
    const nid = computed(() => route.params?.nid as string);

    const { setContent } = useEditorPreview();

    // 笔记
    const note = computed(() => {
      return notesStoreState.value.archiveNoteList.get(nid.value);
    });

    watch(nid, () => {
      if (note) {
        setContent(note.value?.content || note.value?.text || '');
      }
    });

    return () => (
      <div class="desktop-main-container-archive">
        {note.value && (
          <div class="desktop-main-container-archive-content">
            <div class="desktop-main-container-archive-content-left">
              <EditorPerview value={note.value.content || note.value.text || ''} />
            </div>
            <DesktopMainContainerArchiveRight note={note.value} />
          </div>
        )}
        <div class="desktop-main-container-archive-blank" v-show={!note.value} data-tauri-drag-region>
          <Icon type="logo" size={200} data-tauri-drag-region></Icon>
        </div>
      </div>
    );
  }
});

export default DesktopMainContainerArchive;
