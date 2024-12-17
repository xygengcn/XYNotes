import Scroller from '@/components/common/scroller';
import NoteItem from '@/components/note-item';
import { debounce } from '@xynotes/utils';
import { Drawer, Icon } from '@xynotes/components';
import { Note } from '@xynotes/store';
import { syncApp } from '@xynotes/store/app';
import { addNote, noteListCount, notesListBySort, setActiveNoteId } from '@xynotes/store/note';
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { SwipeList } from 'vue3-swipe-actions';
import 'vue3-swipe-actions/dist/index.css';
import './index.scss';

const MobileHome = defineComponent({
  name: 'MobileHome',
  setup() {
    const router = useRouter();
    /**
     * 关键词
     */
    const keyword = ref('');

    /**
     * 是否显示抽屉
     */
    const visibleMoreDrawer = ref(false);
    /**
     * 搜索
     * @returns
     */
    const handleInput = debounce((e: PointerEvent) => {
      const target = e.target as HTMLInputElement;
      keyword.value = target.value.trimStart();
    });
    /**
     * 笔记列表
     */
    const noteList = computed(() => {
      if (!keyword.value.trim()) {
        return notesListBySort.value;
      }
      return notesListBySort.value.filter((note) => {
        return (
          note.intro?.includes(keyword.value) ||
          note.text?.includes(keyword.value) ||
          note.title?.includes(keyword.value)
        );
      });
    });
    /**
     * 点击
     */
    const handleClickItem = (note: Note) => {
      return router.push({
        name: 'mobile-detail',
        params: {
          nid: note.nid
        }
      });
    };

    /**
     * 新增
     */
    const handleClickAdd = () => {
      addNote();
    };

    /**
     * 删除
     */
    const handleDeleteNote = (note: Note) => {
      window.$ui.confirm({
        type: 'warn',
        width: 300,
        content: '确定删除这个笔记吗？',
        onSubmit: () => {
          note?.delete();
        }
      });
    };

    /**
     * 数据同步
     */
    const handleSyncList = () => {
      syncApp();
      visibleMoreDrawer.value = false;
    };

    /**
     * 远程配置
     */
    const handleSetSetting = () => {
      router.push('/m/setting');
    };

    onBeforeMount(() => {
      setActiveNoteId('');
    });
    return () => (
      <div class="mobile-home">
        <div class="mobile-home-header">
          <div class="mobile-home-header-search">
            <input type="text" onInput={handleInput} class="mobile-home-header-search__input" placeholder="搜索" />
          </div>
          <div
            class="mobile-home-header-more"
            onClick={() => {
              visibleMoreDrawer.value = true;
            }}
          >
            <Icon type="mobile-more" size="2em"></Icon>
          </div>
        </div>
        <div class="mobile-home-content">
          <Scroller class="mobile-home-content-list">
            <SwipeList
              ref="swipeList"
              class="mobile-home-content-list-scroll"
              items={noteList.value}
              item-key="id"
              v-slots={{
                default: (props) => {
                  return (
                    <NoteItem
                      class="mobile-home-content-list-scroll-item"
                      note={props.item}
                      sortIndex={props.index}
                      onSelect={handleClickItem}
                      keyword={keyword.value}
                    ></NoteItem>
                  );
                },
                right: (props) => {
                  return (
                    <div class="mobile-home-content-list-scroll-right">
                      <div
                        class="mobile-home-content-list-scroll-right-delete"
                        onClick={() => {
                          handleDeleteNote(props.item);
                        }}
                      >
                        <Icon type="item-delete"> </Icon>
                      </div>
                    </div>
                  );
                }
              }}
            />
          </Scroller>
        </div>
        <div class="mobile-home-footer">
          <div class="mobile-home-footer-content">
            <span>{noteListCount.value}个笔记</span>
            <span class="mobile-home-footer-content-add" onClick={handleClickAdd}>
              <Icon type="mobile-add" size="2em"></Icon>
            </span>
          </div>
        </div>

        <Drawer
          visible={visibleMoreDrawer.value}
          onClose={() => {
            visibleMoreDrawer.value = false;
          }}
        >
          <div class="mobile-home-more">
            <div class="mobile-home-more-header">操作</div>
            <div class="mobile-home-more-content">
              <div class="mobile-home-more-content-item">
                <span class="mobile-home-more-content-item-left">数据同步</span>
                <span class="mobile-home-more-content-item-right">
                  <Icon onClick={handleSyncList} type="item-sync" size="1.2em"></Icon>
                </span>
              </div>
              <div class="mobile-home-more-content-item">
                <span class="mobile-home-more-content-item-left">基础配置</span>
                <span class="mobile-home-more-content-item-right">
                  <Icon onClick={handleSetSetting} type="nav-setting" size="1.2em"></Icon>
                </span>
              </div>
            </div>
            <div class="mobile-home-more-footer">
              <a href="https://github.com/xygengcn/XYNotes" target="_blank">
                Version {__APP_VERSION__} 此项目开源于XY笔记
              </a>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
});

export default MobileHome;
