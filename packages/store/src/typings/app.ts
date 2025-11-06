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
 * 运行模式
 */
export enum AppMode {
  // 桌面模式，用于pc端和平板端
  desktop = 'desktop',
  // 移动端
  mobile = 'mobile'
}
