import NoteEditor from '@/components/note-editor';
import { defineComponent } from 'vue';
import './index.scss';
import { useRoute } from 'vue-router';

const DetailPage = defineComponent({
  setup() {
    const route = useRoute();
    return () => (
      <div class="detail">
        <NoteEditor nid={route.query?.nid as string}></NoteEditor>
      </div>
    );
  }
});

export default DetailPage;
