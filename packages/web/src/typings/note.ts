/**
 * 笔记所有字段
 */
export enum INoteStatus {
  draft = 0, // 草稿状态
  saving = 0.5, // 正在保存
  normal = 1, // 保存状态
  sync = 2 // 同步状态
}

/**
 * 笔记类型
 */
export enum INoteType {
  text = 'text'
}

export interface INoteAttachment {}
export interface INote {
  // 笔记id
  nid: string;

  // 笔记标题
  title: string;

  // 笔记类型
  type: INoteType | string;

  // 排序
  order: number;

  // 笔记内容
  text: string;

  // 笔记创建时间
  createdAt: number;

  // 笔记最新更新时间
  updatedAt: number;

  // 简要信息
  intro: string;

  // 笔记状态
  status: INoteStatus;

  // 笔记来源
  origin: string;

  // 笔记作者
  author: string;

  // 笔记附件
  attachment: Array<INoteAttachment>;

  // 在线id
  remoteId: string;
}
