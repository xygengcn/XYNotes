import Icon from '@/components/common/icon';
import NoteEditor from '@/components/note-editor';
import { Note } from '@/services/note';
import { VueComponent } from '@/shims-vue';
import { useNotesStore } from '@/store/notes.store';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
import DesktopMainContainerDefaultRight from './right-bar';

interface IDesktopMainContainerProps {}

@Component
export default class DesktopMainContainerDefault extends VueComponent<IDesktopMainContainerProps> {
  /**
   * 当前选中笔记
   */
  private get activeNote(): Note | undefined {
    const store = useNotesStore();
    return store.activeNote;
  }

  public render(): VNode {
    return (
      <div class="desktop-main-container-default">
        {this.activeNote ? (
          <div class="desktop-main-container-default-content">
            <div class="desktop-main-container-default-content-left">
              <NoteEditor nid={this.activeNote.nid} />
            </div>
            <DesktopMainContainerDefaultRight note={this.activeNote} />
          </div>
        ) : (
          <div class="desktop-main-container-default__default">
            <Icon type="logo" size={200} draggable></Icon>
          </div>
        )}
      </div>
    );
  }
}
