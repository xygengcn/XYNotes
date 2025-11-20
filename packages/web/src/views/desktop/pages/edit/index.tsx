import MinMax from '@/components/min-max';
import NoteEditor from '@/components/note-editor';
import { notesStoreAction } from '@xynotes/store/note';
import { is } from '@xynotes/utils';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import './index.scss';

const DetailPage = defineComponent({
  name: 'DetailPage',
  setup() {
    const route = useRoute();
    const router = useRouter();
    if (route.params?.nid) {
      notesStoreAction.setActiveNoteId(route.params?.nid as string);
    } else {
      router.push('/');
    }
    return () => (
      <div class="detail-page">
        <div class="detail-page-header" data-tauri-drag-region v-show={is.app()}>
          <MinMax type="window"></MinMax>
        </div>
        <div class="detail-page-content">
          <NoteEditor nid={route.params?.nid as string}></NoteEditor>
        </div>
      </div>
    );
  }
});

export default DetailPage;
