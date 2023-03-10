import middlewareHook from '@/middlewares';
import { IConfigsColunm, INoteListSort } from '@/typings/config';
import { NoteListSortType } from '@/typings/enum/note';
import { debounce } from '@/utils/debounce-throttle';
import { defineStore } from 'pinia';

// 最大值
export const SideContainerMaxWidth = 500;

// 最小值
export const SideContainerMinWidth = 250;

// 防抖保存左侧长度
const debounceSaveSideContainerMaxWidth = debounce((width) => {
  console.info('[config] 保存左侧长度配置', width);
  middlewareHook.registerMiddleware('saveConfig', { sideContainerWidth: width });
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
      console.info('[config] 保存排序配置', { noteListSort: this.noteListSort });
      return middlewareHook.registerMiddleware('saveConfig', { noteListSort: this.noteListSort });
    },
    /**
     * 配置初始化
     */
    syncConfigs(configs: IConfigsColunm[]) {
      configs.forEach(({ key, value }) => {
        Object.assign(this, { [key]: value });
      });
    },
  },
});
