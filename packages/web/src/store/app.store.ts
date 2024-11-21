import apiEvent from '@/api';
import { INote } from '@/typings/note';
import { defineStore } from 'pinia';
import { useConfigsStore } from './config.store';
import defaultJson from './default.json';
import { useNotesStore } from './notes.store';

/**
 * 加载状态
 */
export enum AppLoadStatus {
  // 配置加载中
  configsLoading = 'configsLoading',
  // 本地数据加载中
  localNotesLoading = 'localNotesLoading',
  // 网络数据加载中
  onlineNotesLoading = 'onlineNotesLoading',
  // 完成
  finish = 'finish'
}
/**
 * 暂存本地状态
 */
export const useAppStore = defineStore('app', {
  state: () => ({
    // 版本
    version: __APP_VERSION__,
    // 加载状态
    loadStatus: AppLoadStatus.configsLoading
  }),
  actions: {
    // 修改状态
    setLoadStatus(status: AppLoadStatus) {
      this.loadStatus = status;
    },

    /**
     * 同步数据
     */
    async sync() {
      const configs = useConfigsStore();
      const note = useNotesStore();
      this.setLoadStatus(AppLoadStatus.configsLoading);
      // 同步配置
      return apiEvent
        .apiFetchConfigsData()
        .then((config) => {
          console.log('[sync] config', config);
          configs.syncConfigs(config);
          // 同步笔记信息
          return apiEvent
            .apiFetchNoteListData({ updateTime: 0, order: configs.noteListSort.value, pageSize: 50 })
            .then((list) => {
              if (list.length === 0) {
                note.addNote(defaultJson as INote);
                note.saveNote(defaultJson as INote, false);
              } else {
                note.setNoteList(list);
              }
            });
        })
        .finally(() => {
          // 结束加载
          this.setLoadStatus(AppLoadStatus.finish);
        });
    }
  }
});
