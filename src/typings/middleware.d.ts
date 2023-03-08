import { IMiddlewareEvent } from '@/typings/middleware';
/**
 * 中间件事件
 */
export interface IMiddlewareEvent {
  // 初始化
  load: () => void;

  // 保存笔记
  saveNote: IMiddlewareFunction;

  // 读取笔记
  loadNote: IMiddlewareFunction;
}

/**
 * 中间件函数
 */
export type IMiddlewareFunction<T extends Object | number | string = any, K = any> = (
  args: T,
  next: () => Promise<void>
) => Promise<K>;
