/**
 * 中间件
 */

import { IMiddlewareEvent, IMiddlewareFunction } from '@/typings/middleware';
import { compose } from '@/utils';

class Middleware {
  /**
   * 中间件集合
   */
  private middlewareMap: Map<
    keyof IMiddlewareEvent,
    { hook: Function; middlewares: IMiddlewareFunction<keyof IMiddlewareEvent, any>[] }
  > = new Map();

  /**
   * 使用插件
   * @param event
   */
  public useMiddleware<T extends keyof IMiddlewareEvent>(event: T, middleware: IMiddlewareFunction<T>) {
    if (typeof middleware !== 'function') throw new TypeError('middleware must be a function!');
    const hookMiddleware = this.middlewareMap.get(event);
    const middlewares: IMiddlewareFunction<T>[] = hookMiddleware?.middlewares || [];
    middlewares.push(middleware);
    const hook = compose(middlewares);
    this.middlewareMap.set(event, { middlewares, hook });
  }

  /**
   *
   * 注册插件
   *
   * @param hook
   * @param args
   */
  public async registerMiddleware<T extends keyof IMiddlewareEvent>(
    event: T,
    ...args: Parameters<IMiddlewareEvent[T]>
  ): Promise<any> {
    console.info('[hook]', event, args);
    const middleware = this.middlewareMap.get(event);
    if (middleware?.hook) {
      return await middleware.hook.apply(undefined, args);
    }
    return Promise.resolve();
  }
}

const middlewareHook = new Middleware();

export default middlewareHook;
