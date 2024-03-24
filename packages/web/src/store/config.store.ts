import middlewareHook from '@/middlewares';
import { IConfigsColunm, INoteListSort } from '@/typings/config';
import { NoteListSortType } from '@/typings/enum/note';
import { debounce } from '@/utils/debounce-throttle';
import { defineStore } from 'pinia';
import { toRaw } from 'vue';

// 最大值
export const SIDE_CONTAINER_MAX_WIDTH = 500;

// 最小值
export const SIDE_CONTAINER_MIN_WIDTH = 250;

// 防抖保存左侧长度
const debounceSaveSideContainerMaxWidth = debounce((width) => {
  console.info('[config] 保存左侧长度配置', width);
  middlewareHook.registerMiddleware('saveConfig', { sideContainerWidth: width });
});

// 防抖保存左侧长度
const debounceSaveGlobalConfigs = debounce((global, globalText) => {
  console.info('[config] 全局配置保存', global);
  return middlewareHook.registerMiddleware('saveConfig', { global, globalText });
}, 1000);

export const useConfigsStore = defineStore('configs', {
  state: () => ({
    // 宽度
    sideContainerWidth: 300,
    // 排序
    noteListSort: {
      value: NoteListSortType.updated,
      label: '更新时间'
    } as INoteListSort,
    // 全局配置文字
    globalText: '',
    // 全局配置
    global: {} as {
      // 在线同步地址
      REMOTE_BASE_URL: string;
    }
  }),
  actions: {
    /**
     * 左侧长度
     * @param width
     */
    setSideContainerWidth(width: number) {
      this.sideContainerWidth = Math.max(SIDE_CONTAINER_MIN_WIDTH, Math.min(width, SIDE_CONTAINER_MAX_WIDTH));
      // 防抖
      debounceSaveSideContainerMaxWidth(this.sideContainerWidth);
    },
    // 保存排序
    setNoteListSort(sort: INoteListSort) {
      console.info('[config] 保存排序配置', sort, this.noteListSort);
      this.noteListSort = sort || {
        value: NoteListSortType.updated,
        label: '更新时间'
      };
      return middlewareHook.registerMiddleware('saveConfig', { noteListSort: toRaw(this.noteListSort) });
    },
    /**
     * 配置保存
     * @param global
     * @param globalText
     * @returns
     */
    saveGlobalConfig(global: any, globalText: string) {
      this.global = global;
      this.globalText = globalText;
      debounceSaveGlobalConfigs(global, globalText);
    },
    /**
     * 配置初始化
     */
    syncConfigs(configs: IConfigsColunm[]) {
      configs.forEach(({ key, value }) => {
        Object.assign(this, { [key]: value });
      });
    }
  }
});
