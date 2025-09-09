import pino from 'pino';

// 创建全局日志记录器
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
});
