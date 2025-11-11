import { NoteTable, TaskQuadrant } from '@prisma/client';

/**
 * 笔记所有字段
 */
export enum NoteStatus {
  deprecated = -1, // 废弃
  draft = 0, // 草稿状态
  saving = 0.5, // 正在保存
  normal = 1, // 保存状态
  sync = 2 // 同步状态
}

/**
 * 笔记类型
 */
export enum NoteType {
  text = 'text'
}

export type INote = NoteTable & {
  // 笔记id
  nid: string;

  // 笔记标题
  title: string;

  // 笔记类型
  type: NoteType | string;

  // 排序
  order: number;

  // 笔记内容
  text: string;

  // 笔记内容
  content: JSON | null;

  // 笔记创建时间
  createdAt: number;

  // 笔记最新更新时间
  updatedAt: number;

  // 简要信息
  intro: string;

  // 笔记状态
  status: NoteStatus;

  // 笔记作者
  author: string;

  // 笔记同步时间
  onlineSyncAt: number;
};

/**
 * 上传文件类型
 */
export interface IFile {
  lastModifiedDate: Date;
  filepath: string;
  newFilename: string;
  originalFilename: string;
  mimetype: string;
  hashAlgorithm: boolean;
  size: number;
}

/**
 * 任务项
 */
export interface ITaskItem extends TaskQuadrant {
  id: number;

  // 任务标题
  title: string;

  // 所属象限 (A-重要且紧急, B-重要不紧急, C-不重要但紧急, D-不重要不紧急)
  quadrant: string;

  // 任务状态 (0-未完成, 1-已完成)
  status: number;

  // 任务优先级 (数字越大优先级越高)
  priority: number;

  // 任务截止日期
  deadline: Date | null;

  // 任务创建时间
  createdAt: Date;

  // 任务更新时间
  updatedAt: Date;

  // 任务完成时间
  completedAt: Date | null;

  // 任务所属用户
  author: string;
}
