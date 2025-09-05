import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * 自动导入控制器模块
 * @param controllersPath 控制器目录路径
 * @returns 控制器类数组
 */
export async function loadControllers(controllersPath: string): Promise<any[]> {
  const controllers: any[] = [];
  
  // 检查控制器目录是否存在
  if (!existsSync(controllersPath)) {
    console.warn(`Controllers directory does not exist: ${controllersPath}`);
    return controllers;
  }
  
  const files = readdirSync(controllersPath);
  
  for (const file of files) {
    // 处理.ts文件（开发环境）或.js文件（生产环境），但排除基类控制器
    if ((file.endsWith('.ts') || file.endsWith('.js')) && file !== 'base-controller.ts' && file !== 'base-controller.js') {
      try {
        const modulePath = join(controllersPath, file);
        const module = await import(modulePath);
        
        // 遍历模块中的所有导出
        for (const exportName in module) {
          const exported = module[exportName];
          // 检查是否为类并且具有getRoutes方法和isController静态方法
          if (
            typeof exported === 'function' && 
            exported.prototype && 
            typeof exported.prototype.constructor.getRoutes === 'function' &&
            typeof exported.isController === 'function' &&
            exported.isController()
          ) {
            controllers.push(exported);
            break;
          }
        }
      } catch (error) {
        console.error(`Failed to load controller from ${file}:`, error);
      }
    }
  }
  
  return controllers;
}

/**
 * 获取所有控制器的路由信息
 * @param controllers 控制器类数组
 * @returns 路由信息数组
 */
export function getControllerRoutes(controllers: any[]): Array<{method: string, path: string, controller: string}> {
  const routes: Array<{method: string, path: string, controller: string}> = [];
  
  controllers.forEach(ControllerClass => {
    try {
      const controllerName = ControllerClass.name;
      const controllerRoutes = ControllerClass.getRoutes();
      
      controllerRoutes.forEach((route: any) => {
        routes.push({
          method: route.method.toUpperCase(),
          path: route.path,
          controller: controllerName
        });
      });
    } catch (error) {
      console.error(`Failed to get routes from ${ControllerClass.name}:`, error);
    }
  });
  
  return routes;
}