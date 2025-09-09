import type { ApiFunctionMiddleware, Context, Next } from 'koa-api-plus';

/**
 * 日志中间件
 * @param callback
 * @returns
 */
export function KoaLogMiddleware(callback: (str: string) => void): ApiFunctionMiddleware {
  return async (ctx: Context, next: Next) => {
    const startTime = Date.now();
    await next();
    const time: number = Date.now() - startTime;
    callback(`${ctx.method} - ${ctx.path} - ${ctx.status} - ${time}ms`);
  };
}
