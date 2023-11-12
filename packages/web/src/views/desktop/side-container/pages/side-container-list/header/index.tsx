import Icon from '@/components/common/icon';
import Popover from '@/components/common/popover';
import { VueComponent } from '@/shims-vue';
import { useConfigsStore } from '@/store/config.store';
import { useNotesStore } from '@/store/notes.store';
import { INoteListSort } from '@/typings/config';
import { NoteListSortType } from '@/typings/enum/note';
import { VNode } from 'vue';
import { Component } from 'vue-property-decorator';
import './index.scss';
interface IDesktopSideContainerListHeaderProps {}

@Component({ name: 'DesktopSideContainerListHeader' })
export default class DesktopSideContainerListHeader extends VueComponent<IDesktopSideContainerListHeaderProps> {
  /**
   * 配置
   */
  private get noteListSort() {
    const configStore = useConfigsStore();
    return (
      configStore.noteListSort || {
        value: NoteListSortType.updated,
        label: '更新时间',
      }
    );
  }
  // 切换排序
  private handleChangeSortType(sort: INoteListSort) {
    const configStore = useConfigsStore();
    configStore.setNoteListSort(sort);
  }

  public render(): VNode {
    const store = useNotesStore();
    return (
      <div class="desktop-side-container-list-header">
        <div class="desktop-side-container-list-header-top">笔记</div>
        <div class="desktop-side-container-list-header-bottom">
          <div class="desktop-side-container-list-header-bottom-left">{store.noteListCount}条笔记</div>
          <div class="desktop-side-container-list-header-bottom-right">
            <Popover>
              <span class="desktop-side-container-list-header-bottom-right-label">
                {this.noteListSort.label}
                <Icon type="arrow-down" size={12} />
              </span>
              <ul slot="popover" class="desktop-side-container-list-header-bottom-right-selects">
                <li
                  onclick={() =>
                    this.handleChangeSortType({
                      value: NoteListSortType.updated,
                      label: '更新时间',
                    })
                  }
                >
                  <span class="text">更新时间</span>
                  {this.noteListSort.value === NoteListSortType.updated && <Icon type="checked" />}
                </li>
                <li
                  onclick={() =>
                    this.handleChangeSortType({
                      value: NoteListSortType.created,
                      label: '创建时间',
                    })
                  }
                >
                  <span class="text">创建时间</span>
                  {this.noteListSort.value === NoteListSortType.created && <Icon type="checked" />}
                </li>
              </ul>
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}
