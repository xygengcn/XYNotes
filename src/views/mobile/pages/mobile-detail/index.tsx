import Icon from '@/components/common/icon';
import Loading from '@/components/common/loading';
import NoteEditor from '@/components/note-editor';
import showScreenshotDialog from '@/components/screenshot';
import { Note } from '@/services/note';
import { VueComponent } from '@/shims-vue';
import { useNotesStore } from '@/store/notes.store';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
interface IMobileHomeProps {}

@Component
export default class MobileDetail extends VueComponent<IMobileHomeProps> {
  /**
   * 当前文章
   */
  private get note(): Note | undefined {
    const store = useNotesStore();
    return store.activeNote;
  }

  /**
   * 分享
   */
  private handleClickShare() {
    this.note &&
      showScreenshotDialog(this.note, {
        width: '90%',
        height: '60%',
        menu: ['md', 'image'],
      });
  }

  /**
   * 删除
   */
  private handleClickDelete() {
    const store = useNotesStore();
    this.note && store.deleteNote(this.note);
    this.$router.back();
  }
  public render(): VNode {
    return (
      <div class="mobile-detail">
        {this.note ? (
          <div class="mobile-detail-content">
            <NoteEditor note={this.note}></NoteEditor>
          </div>
        ) : (
          <div class="mobile-detail-content">
            <Loading></Loading>
          </div>
        )}
        <div class="mobile-detail-footer">
          <div class="mobile-detail-footer-list">
            <div class="mobile-detail-footer-list-item">
              <Icon type="nav-share" size={20} nativeOnclick={this.handleClickShare}></Icon>
            </div>
            <div class="mobile-detail-footer-list-item">
              <Icon type="nav-delete" size={20} nativeOnclick={this.handleClickDelete}></Icon>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 获取详情
  public created(): void {
    const store = useNotesStore();
    if (this.$route.params?.nid) {
      store.setActiveNoteId(this.$route.params?.nid);
    } else {
      this.$router.back();
    }

    this.$once('hook:', () => {
      store.setActiveNoteId('');
    });
  }
}