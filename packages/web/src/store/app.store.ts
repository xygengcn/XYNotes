import { defineStore } from 'pinia';

/**
 * 加载状态
 */
export enum AppLoadStatus {
  // 配置加载中
  configsLoading = 'configsLoading',
  // 本地数据加载中
  localNotesLoading = 'localNotesLoading',
  // 网络数据加载中
  remoteNotesLoading = 'remoteNotesLoading',
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
    }
  }
});
