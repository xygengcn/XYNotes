/**
 * 列表排序
 */
export enum NoteListSortType {
  created = 'createdAt',
  updated = 'updatedAt'
}

// 笔记列表排序配置
export interface INoteListSort {
  value: NoteListSortType;
  label: string;
}

/**
 * 配置
 */
export type IConfigs = {
  // 桌面侧栏宽度
  SIDE_CONTAINER_MAX_WIDTH: number;
  // 桌面端笔记列表排序
  NOTE_LIST_SORT: INoteListSort;
  // 在线同步地址
  REMOTE_BASE_URL: string;
  // 资源地址
  REMOTE_RESOURCES_BASE_URL: string;
  // 是否同步在线
  REMOTE_ONLINE_SYNC: boolean;
  // 在线认证Authorization
  REMOTE_AUTHORIZATION: string;
  // 显示主界面快捷键
  SHORTCUT_KEY_SHOW: string;
};

// 配置数据库
export interface IConfigsColunm<K extends keyof IConfigs = keyof IConfigs> {
  key: K;
  value: IConfigs[K];
}
