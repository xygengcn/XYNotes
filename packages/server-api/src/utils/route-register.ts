import { RouteMetadata, wrapControllerMethod } from '../decorators/route-decorator';
import { logInfo } from '../utils/logger';

export function registerRoutes(app: any, controllers: any[]) {
  logInfo('Registering routes...');
  
  controllers.forEach(ControllerClass => {
    const controller = new ControllerClass();
    const routes: RouteMetadata[] = ControllerClass.getRoutes();
    
    routes.forEach(route => {
      // 获取原始处理方法
      const originalHandler = controller[route.handler].bind(controller);
      
      // 使用装饰器中的包装器包装处理方法
      const wrappedHandler = wrapControllerMethod(originalHandler, `Successfully executed ${route.method} ${route.path}`);
      
      // 注册路由
      app[route.method](route.path, wrappedHandler);
      logInfo(`Registered route: ${route.method.toUpperCase()} ${route.path}`);
    });
  });
  
  logInfo('Route registration completed.');
}