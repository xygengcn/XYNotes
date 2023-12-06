import Icon from '@/components/common/icon';
import NoteEditor from '@/components/note-editor';
import { useNotesStore } from '@/store/notes.store';
import { computed, defineComponent } from 'vue';
import './index.scss';
import DesktopMainContainerDefaultRight from './right-bar';

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
              <NoteEditor nid={activeNote.value.nid} />
            </div>
            <DesktopMainContainerDefaultRight note={activeNote.value} />
          </div>
        )}
        <div class="desktop-main-container-default__default" v-show={!activeNote.value}>
          <Icon type="logo" size={200} draggable></Icon>
        </div>
      </div>
    );
  }
});

export default DesktopMainContainerDefault;
