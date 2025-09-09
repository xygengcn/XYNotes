import { Api } from 'koa-api-plus';
import { join } from 'path';
import { logger } from './logger';
import { KoaLogMiddleware } from './middleware/koa-middleware';

/**
 * 开启接口
 */

const api = new Api({
  port: Number(process.env.NOTE_API_PORT || 30001),
  baseUrl: join(__dirname, './controller'),
  responseOptions: {
    allowErrorStatusCode: true
  }
});

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
