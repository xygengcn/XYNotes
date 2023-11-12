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
}

// 配置数据库
export interface IConfigsColunm {
  key: keyof IConfigs | symbol;
  value: any;
}
