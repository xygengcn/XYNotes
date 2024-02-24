import { IMiddlewareEvent } from '@/typings/middleware';
import { IConfigs } from './config';
import { INote } from './note';
/**
 * 中间件事件
 */
export interface IMiddlewareEvent {
  // 初始化
  load: () => void;

  // 保存笔记
  saveNote: (note: INote) => void;

  // 删除笔记
  deleteNote: (note: INote) => void;

  // 读取笔记
  loadNote: (id: string) => INote;

  // 保存配置
  saveConfig: (configs: Partial<IConfigs>) => void;

  // 数据恢复
  recovery: () => void;
}

/**
 * 中间件函数
 */
export type IMiddlewareFunction<
  T extends keyof IMiddlewareEvent = keyof IMiddlewareEvent,
  K extends Parameters<IMiddlewareEvent[T]> = Parameters<IMiddlewareEvent[T]>
> = ((next: () => Promise<void>, ...args: K) => Promise<any>) | ((next: () => Promise<void>, ...args: K) => any);
