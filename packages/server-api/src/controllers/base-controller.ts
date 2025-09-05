import 'reflect-metadata';
import { ROUTES_KEY, RouteMetadata } from '../decorators/route-decorator';
import { logInfo, logError, logDebug } from '../utils/logger';

export class BaseController {
  // 统一返回格式
  protected response(code: number, data?: any, message?: string) {
    return {
      code,
      data,
      message,
      userMsg: message
    };
  }

  // 获取路由元数据
  static getRoutes(): RouteMetadata[] {
    return Reflect.getMetadata(ROUTES_KEY, this) || [];
  }
  
  // 日志记录方法
  protected logInfo(message: string, data?: any) {
    logInfo(message, data);
  }
  
  protected logError(message: string, error?: any) {
    logError(message, error);
  }
  
  protected logDebug(message: string, data?: any) {
    logDebug(message, data);
  }
  
  // 静态方法用于标识这是一个控制器类
  static isController(): boolean {
    return true;
  }
  
}