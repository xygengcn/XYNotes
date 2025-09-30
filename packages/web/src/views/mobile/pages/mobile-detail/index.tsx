import NoteEditor from '@/components/note-editor';
import NoteEditorCounter from '@/components/note-editor/counter';
import { useThemeColor } from '@/services/theme';
import { Icon, Loading } from '@xynotes/components';
import { useEditor, type MarkdownEditorInstance } from '@xynotes/editor';
import { activeNote, setActiveNoteId } from '@xynotes/store/note';
import { defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import './index.scss';
import { showMobileDetailSettingDrawer } from './setting';
import MobileDetailTitle from './title';
import { MobileDetailTools } from './tools';

const MobileDetail = defineComponent({
  name: 'MobileDetail',
  setup() {
    /**
     * 切换主题
     */
    useThemeColor('#fff');
    /**
     * store
     */
    const route = useRoute();
    const router = useRouter();

    /**
     * 编辑器
     */
    useEditor() as MarkdownEditorInstance;

    /**
     * 返回首页
     */
    const handleBack = async () => {
      await router.push('/');
      setActiveNoteId('');
    };

    onBeforeMount(() => {
      if (route.params?.nid) {
        setActiveNoteId(route.params?.nid as string);
      } else {
        router.back();
      }
    });

    onBeforeUnmount(() => {
      setActiveNoteId('');
    });

    return () => (
      <div class="mobile-detail">
        {route.params?.nid ? (
          [
            <div class="mobile-detail-header">
              <Icon type="back" size={18} onClick={handleBack}></Icon>
              <MobileDetailTitle note={activeNote.value}></MobileDetailTitle>
              <Icon
                type="mobile-more"
                size={24}
                onClick={() => {
                  showMobileDetailSettingDrawer();
                }}
              ></Icon>
            </div>,
            <div class="mobile-detail-content">
              <NoteEditor nid={route.params?.nid as string}>
                {{
                  header: (props) => <NoteEditorCounter note={props.note} />
                }}
              </NoteEditor>
            </div>
          ]
        ) : (
          <div class="mobile-detail-content">
            <Loading></Loading>
          </div>
        )}
        <MobileDetailTools note={activeNote.value}></MobileDetailTools>
      </div>
    );
  }
});

export default MobileDetail;
