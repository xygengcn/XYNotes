import NoteEditor from '@/components/note-editor';
import { defineComponent } from 'vue';
import './index.scss';
import { useRoute } from 'vue-router';
import MinMax from '@/components/common/min-max';
import is from '@/utils/is';

const DetailPage = defineComponent({
  setup() {
    const route = useRoute();
    return () => (
      <div class="detail-page">
        <div class="detail-page-header" data-tauri-drag-region v-show={is.app()}>
          <MinMax type="window"></MinMax>
        </div>
        <div class="detail-page-content">
          <NoteEditor nid={route.query?.nid as string} remoteId={route.query?.remoteId as string}></NoteEditor>
        </div>
      </div>
    );
  }
});

export default DetailPage;
