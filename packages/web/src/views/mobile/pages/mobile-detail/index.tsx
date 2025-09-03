import NoteEditor from '@/components/note-editor';
import NoteEditorCounter from '@/components/note-editor/counter';
import NoteEditorTitle from '@/components/note-editor/title';
import showShareNoteDialog from '@/components/note-share';
import { useThemeColor } from '@/services/theme';
import { Drawer, Icon, Loading } from '@xynotes/components';
import { activeNote, setActiveNoteId } from '@xynotes/store/note';
import { defineComponent, onBeforeMount, onBeforeUnmount, ref } from 'vue';
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
    const route = useRoute();
    const router = useRouter();

    /**
     * 是否显示抽屉
     */
    const visibleMoreDrawer = ref(false);

    /**
     * 分享
     */
    const handleClickShare = () => {
      activeNote.value &&
        showShareNoteDialog(activeNote.value, {
          width: '90%',
          height: '60%'
        });
    };

    /**
     * 同步数据
     */
    const handleClickSync = () => {
      activeNote.value?.sync();
    };

    /**
     * 下载markdown
     */
    const handleClickDownload = () => {
      activeNote.value?.toMarkdown();
    };

    /**
     * 删除
     */
    const handleClickDelete = () => {
      activeNote.value &&
        window.$ui.confirm({
          type: 'warn',
          width: 300,
          content: '确定删除这个笔记吗？',
          onSubmit: () => {
            activeNote.value.delete();
            router.back();
          }
        });
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
              <NoteEditorCounter note={activeNote.value} />
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
            <div class="mobile-detail-drawer-item">
              <span class="mobile-detail-drawer-item-icon">
                <Icon type="item-markdown" size={24} onClick={handleClickDownload}></Icon>
              </span>
              <span class="mobile-detail-drawer-item-text">下载</span>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
});

export default MobileDetail;
