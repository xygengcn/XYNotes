import Icon from '@/components/common/icon';
import Popover from '@/components/common/popover';
import { useConfigsStore } from '@/store/config.store';
import { useNotesStore } from '@/store/notes.store';
import { INoteListSort } from '@/typings/config';
import { NoteListSortType } from '@/typings/enum/note';
import { computed, defineComponent } from 'vue';
import './index.scss';

const DesktopSideContainerListHeader = defineComponent({
  name: 'DesktopSideContainerListHeader',
  setup() {
    const store = useNotesStore();
    const configStore = useConfigsStore();

    // 切换排序
    const handleChangeSortType = (sort: INoteListSort) => {
      console.info('[sort]', sort);
      configStore.setNoteListSort(sort);
    };

    // 排序
    const noteListSort = computed(() => {
      return (
        configStore.noteListSort || {
          value: NoteListSortType.updated,
          label: '更新时间'
        }
      );
    });

    return () => (
      <div class="desktop-side-container-list-header" data-tauri-drag-region>
        <div class="desktop-side-container-list-header-top" data-tauri-drag-region>
          笔记
        </div>
        <div class="desktop-side-container-list-header-bottom" data-tauri-drag-region>
          <div class="desktop-side-container-list-header-bottom-left" data-tauri-drag-region>
            {store.noteListCount}条笔记
          </div>
          <div class="desktop-side-container-list-header-bottom-right">
            <Popover
              v-slots={{
                default: () => (
                  <span class="desktop-side-container-list-header-bottom-right-label">
                    {noteListSort.value.label}
                    <Icon type="arrow-down" size={12} />
                  </span>
                ),
                popover: () => (
                  <ul class="desktop-side-container-list-header-bottom-right-selects">
                    <li
                      onClick={() =>
                        handleChangeSortType({
                          value: NoteListSortType.updated,
                          label: '更新时间'
                        })
                      }
                    >
                      <span class="text">更新时间</span>
                      {noteListSort.value.value === NoteListSortType.updated && <Icon type="checked" />}
                    </li>
                    <li
                      onClick={() =>
                        handleChangeSortType({
                          value: NoteListSortType.created,
                          label: '创建时间'
                        })
                      }
                    >
                      <span class="text">创建时间</span>
                      {noteListSort.value.value === NoteListSortType.created && <Icon type="checked" />}
                    </li>
                  </ul>
                )
              }}
            ></Popover>
          </div>
        </div>
      </div>
    );
  }
});

export default DesktopSideContainerListHeader;
