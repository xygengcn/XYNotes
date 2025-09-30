import { Api } from 'koa-api-plus';
import { join } from 'path';
import { logger } from './logger';
import { CorsMiddleware } from './middleware/cors-middleware';
import { KoaLogMiddleware } from './middleware/koa-middleware';
import { ensureDir } from './utils';

// 上传文件夹目录
const uploadDir = join(process.cwd(), '/data/assets');
ensureDir(uploadDir);

/**
 * 开启接口
 */

const api = new Api({
  port: Number(process.env.NOTE_API_PORT || 30000),
  baseUrl: join(__dirname, './controller'),
  responseOptions: {
    allowErrorStatusCode: true
  },
  koaBody: {
    multipart: true,
    formidable: {
      maxFileSize: 5 * 1024 * 1024, // 默认5M
      allowEmptyFiles: false,
      // 缓存目录
      uploadDir: uploadDir,
      filename(name, ext, part, form) {
        return `${Date.now()}_${part.originalFilename}`.replace(/\s+/g, '_');
      }
    },

    onError(error, ctx) {
      logger.error(error, '[koaBody]');
      ctx.status = 200;
      ctx.body = {
        code: (error as any)?.code || 500,
        data: null,
        userMsg: '上传失败',
        error: error?.message || null,
        updateTime: Date.now()
      };
    }
  }
});

// CORS 中间件
api.use(CorsMiddleware());

// 日志中间件
api.use(
  KoaLogMiddleware((str: string) => {
    logger.debug(str);
  })
);

// 日志
api.on('http', (...args) => {
  logger.debug(args, 'http');
});

// 日志
api.on('log', (...args) => {
  logger.debug(args, 'log');
});

// 错误日志
api.on('error', (error) => {
  logger.error(error);
});

// 开启
api.start();
