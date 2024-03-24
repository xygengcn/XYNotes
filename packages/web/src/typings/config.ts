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
  globalText: string;
  global: {
    // 在线同步地址
    REMOTE_BASE_URL: string;
  };
}

// 配置数据库
export interface IConfigsColunm {
  key: keyof IConfigs | symbol;
  value: any;
}
