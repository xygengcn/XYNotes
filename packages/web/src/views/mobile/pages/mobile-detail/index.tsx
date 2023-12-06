import Icon from '@/components/common/icon';
import Loading from '@/components/common/loading';
import NoteEditor from '@/components/note-editor';
import showShareNoteDialog from '@/components/note-share';
import { useNotesStore } from '@/store/notes.store';
import { computed, defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import './index.scss';

const MobileDetail = defineComponent({
  setup() {
    const store = useNotesStore();

    const route = useRoute();
    const router = useRouter();

    /**
     * 当前文章
     */
    const note = computed(() => {
      return store.activeNote;
    });

    /**
     * 分享
     */
    const handleClickShare = () => {
      note.value &&
        showShareNoteDialog(note.value, {
          width: '90%',
          height: '60%',
          menu: ['image']
        });
    };

    /**
     * 删除
     */
    const handleClickDelete = () => {
      note.value &&
        window.$ui.confirm({
          type: 'warn',
          width: 300,
          content: '确定删除这个笔记吗？',
          onSubmit: () => {
            note.value.delete();
            router.back();
          }
        });
    };

    onBeforeMount(() => {
      if (route.params?.nid) {
        store.setActiveNoteId(route.params?.nid as string);
      } else {
        router.back();
      }
    });

    onBeforeUnmount(() => {
      store.setActiveNoteId('');
    });

    return () => (
      <div class="mobile-detail">
        {note.value ? (
          <div class="mobile-detail-content">
            <NoteEditor nid={note.value.nid}></NoteEditor>
          </div>
        ) : (
          <div class="mobile-detail-content">
            <Loading></Loading>
          </div>
        )}
        <div class="mobile-detail-footer">
          <div class="mobile-detail-footer-list">
            <div class="mobile-detail-footer-list-item">
              <Icon type="item-preview" size={20} nativeOnclick={handleClickShare}></Icon>
            </div>
            <div class="mobile-detail-footer-list-item">
              <Icon type="item-delete" size={20} nativeOnclick={handleClickDelete}></Icon>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default MobileDetail;
