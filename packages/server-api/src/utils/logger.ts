import pino from 'pino';

// 创建全局日志记录器
const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
});

// 创建不同级别的日志函数
export const logInfo = (msg: string, obj?: any) => {
  if (obj) {
    logger.info(obj, msg);
  } else {
    logger.info(msg);
  }
};

export const logError = (msg: string, err?: any) => {
  if (err) {
    logger.error(err, msg);
  } else {
    logger.error(msg);
  }
};

export const logWarn = (msg: string, obj?: any) => {
  if (obj) {
    logger.warn(obj, msg);
  } else {
    logger.warn(msg);
  }
};

export const logDebug = (msg: string, obj?: any) => {
  if (obj) {
    logger.debug(obj, msg);
  } else {
    logger.debug(msg);
  }
};

export const logTrace = (msg: string, obj?: any) => {
  if (obj) {
    logger.trace(obj, msg);
  } else {
    logger.trace(msg);
  }
};

export default logger;