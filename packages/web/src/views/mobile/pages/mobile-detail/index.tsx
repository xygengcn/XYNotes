import Drawer from '@/components/common/drawer';
import Icon from '@/components/common/icon';
import Loading from '@/components/common/loading';
import NoteEditor from '@/components/note-editor';
import NoteEditorCounter from '@/components/note-editor/counter';
import NoteEditorTitle from '@/components/note-editor/title';
import showShareNoteDialog from '@/components/note-share';
import { useThemeColor } from '@/services/theme';
import { useNotesStore } from '@/store/notes.store';
import { computed, defineComponent, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import './index.scss';

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
    const store = useNotesStore();
    const route = useRoute();
    const router = useRouter();

    /**
     * 是否显示抽屉
     */
    const visibleMoreDrawer = ref(false);

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
          height: '60%'
        });
    };

    /**
     * 同步数据
     */
    const handleClickSync = () => {
      note.value?.sync();
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
        {route.params?.nid ? (
          [
            <div class="mobile-detail-header">
              <NoteEditorCounter note={note.value} />
              <Icon
                type="mobile-more"
                size={24}
                onClick={() => {
                  visibleMoreDrawer.value = true;
                }}
              ></Icon>
            </div>,
            <div class="mobile-detail-content">
              <NoteEditor nid={route.params?.nid as string}>
                {{
                  header: (props) => <NoteEditorTitle note={props.note} />
                }}
              </NoteEditor>
            </div>
          ]
        ) : (
          <div class="mobile-detail-content">
            <Loading></Loading>
          </div>
        )}
        {/* 抽屉 */}
        <Drawer
          visible={visibleMoreDrawer.value}
          onClose={() => {
            visibleMoreDrawer.value = false;
          }}
        >
          <div class="mobile-detail-drawer">
            <div class="mobile-detail-drawer-item">
              <span class="mobile-detail-drawer-item-icon">
                <Icon type="item-delete" size={24} onClick={handleClickDelete}></Icon>
              </span>
              <span class="mobile-detail-drawer-item-text">删除</span>
            </div>
            <div class="mobile-detail-drawer-item">
              <span class="mobile-detail-drawer-item-icon">
                <Icon type="item-share" size={24} onClick={handleClickShare}></Icon>
              </span>
              <span class="mobile-detail-drawer-item-text">分享</span>
            </div>
            <div class="mobile-detail-drawer-item">
              <span class="mobile-detail-drawer-item-icon">
                <Icon type="item-sync" size={24} onClick={handleClickSync}></Icon>
              </span>
              <span class="mobile-detail-drawer-item-text">同步</span>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
});

export default MobileDetail;
