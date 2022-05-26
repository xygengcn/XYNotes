import { debounce } from '@/utils/debounce-throttle';
import apiEvent from '@/api';
import { IConfigs, IConfigsColunm, INoteListSort } from '@/typings/config';
import { NoteListSortType } from '@/typings/enum/note';
import { defineStore } from 'pinia';

// 最大值
export const SideContainerMaxWidth = 500;

// 最小值
export const SideContainerMinWidth = 250;

// 防抖保存左侧长度
const debounceSaveSideContainerMaxWidth = debounce((width) => {
  const store = useConfigsStore();
  store.saveConfigs({ sideContainerWidth: width });
});

export const useConfigsStore = defineStore('configs', {
  state: () => ({
    sideContainerWidth: 300,
    // 排序
    noteListSort: {
      value: NoteListSortType.updated,
      label: '更新时间',
    } as INoteListSort,
  }),
  actions: {
    /**
     * 左侧长度
     * @param width
     */
    setSideContainerWidth(width: number) {
      this.sideContainerWidth = Math.max(SideContainerMinWidth, Math.min(width, SideContainerMaxWidth));
      // 防抖
      debounceSaveSideContainerMaxWidth(this.sideContainerWidth);
    },
    // 保存排序
    setNoteListSort(sort: INoteListSort) {
      this.noteListSort = sort || {
        value: NoteListSortType.updated,
        label: '更新时间',
      };
      this.saveConfigs({ noteListSort: this.noteListSort });
    },
    /**
     * 配置保存
     * @param configs
     */
    saveConfigs(configs: Partial<IConfigs>): Promise<void> {
      const configsColums: IConfigsColunm[] = Object.entries(configs).map(([key, value]) => {
        return {
          key,
          value,
        };
      });
      return apiEvent.apiSaveOrUpdateConfigs(configsColums);
    },

    /**
     * 配置初始化
     */
    syncConfigs(): Promise<void> {
      return apiEvent.apiFetchConfigsData().then((configs: IConfigsColunm[]) => {
        configs.forEach(({ key, value }) => {
          Object.assign(this, { [key]: value });
        });
      });
    },
  },
});
