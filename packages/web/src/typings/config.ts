import { NoteListSortType } from './enum/note';

// 笔记列表排序配置
export interface INoteListSort {
  value: NoteListSortType;
  label: string;
}

// 配置信息
export interface IConfigs extends Record<string, unknown> {
  sideContainerWidth: number;
  noteListSort: INoteListSort;
  configJson: IGlobalConfig;
  configValue: string;
}

// 配置数据库
export interface IConfigsColunm {
  key: keyof IConfigs | symbol;
  value: any;
}

/**
 * 全局配置
 */
export interface IGlobalConfig {
  // 在线同步地址
  REMOTE_BASE_URL: string;
  // 是否同步在线
  REMOTE_ONLINE_SYNC: boolean;
  // 在线认证Authorization
  REMOTE_AUTHORIZATION: string;
}
