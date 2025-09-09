import type { ApiFunctionMiddleware, Context, Next } from 'koa-api-plus';
import KoaStatic from 'koa-static';
import { join } from 'path';

/**
 * 静态资源中间件
 * 将/resource/assets路由映射到本地/data/assets目录
 * @returns 
 */
export function StaticAssetsMiddleware(): ApiFunctionMiddleware {
  // 静态资源目录
  const staticDir = join(process.cwd(), '/data/assets');
  
  // 创建koa-static中间件实例
  const staticMiddleware = KoaStatic(staticDir);
  
  return async (ctx: Context, next: Next) => {
    // 只处理/resource/assets开头的请求
    if (ctx.path.startsWith('/resource/assets')) {
      // 重写路径，去掉/resource/assets前缀
      const originalPath = ctx.path;
      ctx.path = ctx.path.replace('/resource/assets', '') || '/';
      
      // 使用koa-static处理静态资源
      await staticMiddleware(ctx, async () => {
        // 如果静态资源中间件没有处理该请求，则恢复原始路径并继续
        ctx.path = originalPath;
        await next();
      });
      
      // 确保路径恢复（无论是否处理）
      ctx.path = originalPath;
    } else {
      // 非/resource/assets请求，直接继续
      await next();
    }
  };
}