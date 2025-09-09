import pino from 'pino';
import fs from 'fs';
import path from 'path';

// 确保日志目录存在
const logDir = path.join(process.cwd(), 'data', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 创建全局日志记录器 - 同时输出到控制台和文件
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
          ignore: 'pid,hostname'
        }
      },
      {
        target: 'pino/file',
        options: {
          destination: path.join(logDir, 'server.log'),
          mkdir: true
        }
      }
    ]
  }
});
