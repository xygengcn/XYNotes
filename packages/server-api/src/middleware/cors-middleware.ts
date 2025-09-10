import type { ApiFunctionMiddleware, Context, Next } from 'koa-api-plus';

/**
 * CORS 中间件
 * @param options CORS配置选项
 * @returns 
 */
export function CorsMiddleware(options?: {
  origin?: string | ((ctx: Context) => string);
  credentials?: boolean;
  allowMethods?: string[];
  allowHeaders?: string[];
  exposeHeaders?: string[];
}): ApiFunctionMiddleware {
  return async (ctx: Context, next: Next) => {
    const { 
      origin = '*', 
      credentials = true,
      allowMethods = ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
      allowHeaders = [],
      exposeHeaders = []
    } = options || {};

    // 设置 Access-Control-Allow-Origin
    if (typeof origin === 'string') {
      ctx.set('Access-Control-Allow-Origin', origin);
    } else if (typeof origin === 'function') {
      ctx.set('Access-Control-Allow-Origin', origin(ctx));
    } else {
      ctx.set('Access-Control-Allow-Origin', '*');
    }

    // 设置 Access-Control-Allow-Credentials
    if (credentials) {
      ctx.set('Access-Control-Allow-Credentials', 'true');
    }

    // 设置 Access-Control-Expose-Headers
    if (exposeHeaders.length > 0) {
      ctx.set('Access-Control-Expose-Headers', exposeHeaders.join(','));
    }

    // 处理预检请求
    if (ctx.method === 'OPTIONS') {
      // 设置 Access-Control-Allow-Methods
      ctx.set('Access-Control-Allow-Methods', allowMethods.join(','));
      
      // 设置 Access-Control-Allow-Headers
      let headers = allowHeaders;
      if (headers.length === 0) {
        const requestHeaders = ctx.get('Access-Control-Request-Headers');
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      
      if (headers.length > 0) {
        ctx.set('Access-Control-Allow-Headers', headers.join(','));
      }

      // 设置 Access-Control-Max-Age
      ctx.set('Access-Control-Max-Age', '86400');
      
      ctx.status = 204;
      return;
    }

    await next();
  };
}