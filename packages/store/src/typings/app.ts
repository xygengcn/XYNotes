/**
 * 加载状态
 */
export enum AppLoadStatus {
  // 配置加载中
  configsLoading = 0,
  // 数据完成
  synced = 1,
  // 完成
  finish = 2
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
