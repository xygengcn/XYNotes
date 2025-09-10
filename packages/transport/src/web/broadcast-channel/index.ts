import { uuid } from '@xynotes/utils';

/**
 * 广播消息
 */
export interface BroadcastMessage<
  Action extends Record<string, (...args: any[]) => any>,
  K extends keyof Action = keyof Action
> {
  type: string;
  action: K;
  origin: string;
  args: Parameters<Action[K]>;
}
/**
 * 事件总线
 */

export class Broadcast<Events extends Record<string, (...args: any[]) => any>> {
  /**
   * 推送
   */
  private broadcastChannel = new BroadcastChannel('xynotes-channel');

  /**
   * 客户端ID
   */
  public clientId: string = uuid();

  /**
   * 监听事件
   * @param handler
   */

  onMessage(handler: (e: MessageEvent<BroadcastMessage<Events>>) => void) {
    this.broadcastChannel.addEventListener('message', handler);
  }

  /**
   * 触发事件
   * @param name 事件名
   * @param handler 事件处理函数
   */
  broadcast(name: string, ...args: any[]) {
    // 发送到其他窗口
    this.broadcastChannel.postMessage({ action: name, args, origin: this.clientId } as BroadcastMessage<Events>);
  }
}
