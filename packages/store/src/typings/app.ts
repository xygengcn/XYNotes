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