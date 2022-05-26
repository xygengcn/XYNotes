/**
 * 笔记所有字段
 */
export interface INote {
  // 笔记id
  nid: string;
  // 笔记标题
  title: string;
  // 笔记内容
  text: string;
  // 笔记创建时间
  createdAt: number;
  // 笔记最新更新时间
  updatedAt: number;
  // 简要信息
  intro: string;
  // 笔记状态
  status: number;
  // 笔记来源
  origin: string;
  // 笔记作者
  author: string;
}
