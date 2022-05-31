import Drawer from '@/components/common/drawer';
import Icon from '@/components/common/icon';
import NoteList from '@/components/note-list';
import { Note } from '@/services/note';
import { syncDataByV2 } from '@/services/note.action';
import { VueComponent } from '@/shims-vue';
import { useConfigsStore } from '@/store/config.store';
import { useNotesStore } from '@/store/notes.store';
import { NoteListSortType } from '@/typings/enum/note';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
interface IMobileHomeProps {}

@Component
export default class MobileHome extends VueComponent<IMobileHomeProps> {
  // 抽屉
  private visibleMoreDrawer: boolean = false;
  /**
   * 排序类型
   */
  private get noteListSortType() {
    const store = useConfigsStore();
    return store?.noteListSort?.value || NoteListSortType.updated;
  }
  /**
   * 关键词
   */
  private keyword = '';
  /**
   * 笔记列表
   */
  // 笔记列表
  private get noteList() {
    const store = useNotesStore();
    return store.notesList
      .filter((note) => {
        if (this.keyword.trim()) {
          return (
            note.intro?.includes(this.keyword) ||
            note.text?.includes(this.keyword) ||
            note.title?.includes(this.keyword)
          );
        }
        return true;
      })
      .sort((a, b) => {
        return b[this.noteListSortType] - a[this.noteListSortType];
      });
  }

  /**
   * 点击
   */
  private handleClickItem(note: Note) {
    return this.$router.push({
      name: 'mobile-detail',
      params: {
        nid: note.nid,
      },
    });
  }

  /**
   * 新增
   */
  private handleClickAdd(): void {
    const store = useNotesStore();
    store.addNote();
  }

  public render(): VNode {
    const store = useNotesStore();
    return (
      <div class="mobile-home">
        <div class="mobile-home-header">
          <div class="mobile-home-header-search">
            <input type="text" vModel={this.keyword} class="mobile-home-header-search__input" placeholder="搜索" />
          </div>
          <div
            class="mobile-home-header-more"
            onclick={() => {
              this.visibleMoreDrawer = true;
            }}
          >
            <Icon type="mobile-more" size="2em"></Icon>
          </div>
        </div>
        <div class="mobile-home-content">
          <NoteList
            keyword={this.keyword}
            noteList={this.noteList}
            class="mobile-home-content-list"
            onselect={this.handleClickItem}
          />
        </div>
        <div class="mobile-home-footer">
          <div class="mobile-home-footer-content">
            <span>{store.noteListCount}个笔记</span>
            <span class="mobile-home-footer-content-add" onclick={this.handleClickAdd}>
              <Icon type="mobile-add" size="2em"></Icon>
            </span>
          </div>
        </div>

        <Drawer
          visible={this.visibleMoreDrawer}
          onclose={() => {
            this.visibleMoreDrawer = false;
          }}
        >
          <div class="mobile-home-more">
            <div class="mobile-home-more-header">操作</div>
            <div class="mobile-home-more-content">
              <div class="mobile-home-more-content-item">
                <span class="mobile-home-more-content-item-left">数据迁移</span>
                <span class="mobile-home-more-content-item-right">
                  <Icon onclick={syncDataByV2} type="data-transfer" size="1.2em"></Icon>
                </span>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }

  public created() {
    const store = useNotesStore();
    store.setActiveNoteId('');
  }
}
