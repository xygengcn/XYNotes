import { INote } from '@/typings/note';

type Handler<T extends (...args: any) => any = (...args: any[]) => any> = (...val: Parameters<T>) => void;

/**
 * 事件总线
 */

export class EventBus<Events extends Record<string, any>> {
  private map: Map<string, Set<Handler>> = new Map();

  /**
   * 推送
   */
  private broadcastChannel = new BroadcastChannel('xynote-channel');

  constructor() {
    this.broadcastChannel.addEventListener('message', (e) => {
      if (e.data?.action) {
        this.emit(e.data.action, ...e.data.message);
      }
    });
  }

  /**
   * 订阅事件
   * @param name 事件名
   * @param handler 事件处理函数
   */
  on<EventName extends keyof Events>(name: EventName, handler: Handler<Events[EventName]>) {
    let set: Set<Handler<Events[EventName]>> | undefined = this.map.get(name as string);
    if (!set) {
      set = new Set();
      this.map.set(name as string, set);
    }
    set.add(handler);
  }

  /**
   * 触发事件
   * @param name 事件名
   * @param handler 事件处理函数
   */
  emit<EventName extends keyof Events>(name: EventName, ...value: Parameters<Events[EventName]>) {
    const set: Set<Handler<Events[EventName]>> | undefined = this.map.get(name as string);
    if (!set) return;
    set.forEach((fn) => fn.call(fn, ...value));
  }

  /**
   * 触发事件
   * @param name 事件名
   * @param handler 事件处理函数
   */
  broadcast<EventName extends keyof Events>(name: EventName, ...value: Parameters<Events[EventName]>) {
    // 发送到其他窗口
    this.broadcastChannel.postMessage({ action: name, message: value, origin: window.location.href });
  }
  /**
   *  清除所有事件
   */
  off(): void;
  /**
   * 清除同名事件
   * @param name 事件名
   */
  off<EventName extends keyof Events>(name: EventName): void;
  /**
   * 清除指定事件
   * @param name 事件名
   * @param handler 处理函数
   */
  off<EventName extends keyof Events>(name: EventName, handler: Handler<Events[EventName]>): void;

  off<EventName extends keyof Events>(name?: EventName, handler?: Handler<Events[EventName]>): void {
    // 什么都不传，则清除所有事件
    if (!name) {
      this.map.clear();
      return;
    }

    // 只传名字，则清除同名事件
    if (!handler) {
      this.map.delete(name as string);
      return;
    }

    // name 和 handler 都传了，则清除指定handler
    const handlers: Set<Handler<Events[EventName]>> | undefined = this.map.get(name as string);
    if (!handlers) {
      return;
    }
    handlers.delete(handler);
  }
}

interface INoteEventBus {
  // 笔记更新
  update: (options: { note: INote; action: 'update' | 'delete' }) => void;
}

/**
 * 注册一个总线
 */
const noteEventBus = new EventBus<INoteEventBus>();

export default noteEventBus;
