import 'reflect-metadata';
import { logInfo, logError } from '../utils/logger';

// 定义路由元数据结构
export interface RouteMetadata {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  handler: string;
}

// 路由元数据存储键
export const ROUTES_KEY = Symbol('routes');

// 创建路由装饰器工厂
function createRouteDecorator(method: RouteMetadata['method']) {
  return function (path: string): MethodDecorator {
    return function (target, propertyKey, descriptor: PropertyDescriptor) {
      // 获取目标类原型上的路由元数据
      const routes = Reflect.getMetadata(ROUTES_KEY, target.constructor) || [];
      
      // 添加新的路由元数据
      routes.push({
        path,
        method,
        handler: propertyKey as string
      });
      
      // 更新路由元数据
      Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor);
    };
  };
}

// 创建各种HTTP方法的装饰器
export const Get = createRouteDecorator('get');
export const Post = createRouteDecorator('post');
export const Put = createRouteDecorator('put');
export const Delete = createRouteDecorator('delete');
export const Patch = createRouteDecorator('patch');

// 创建控制器方法包装器，用于自动处理响应和错误
export function wrapControllerMethod(originalMethod: Function, successMessage: string = 'Success') {
  return async function(this: any, request: any, reply: any) {
    try {
      const result = await originalMethod.call(this, request, reply);
      logInfo(successMessage);
      
      // 返回统一的成功响应格式
      return {
        code: 200,
        data: result,
        message: 'Success',
        userMsg: 'Success'
      };
    } catch (error: any) {
      logError('Request failed', error);
      
      // 返回统一的错误响应格式
      return {
        code: 500,
        data: null,
        message: error.message || 'Internal Server Error',
        userMsg: error.message || '服务器内部错误'
      };
    }
  };
}