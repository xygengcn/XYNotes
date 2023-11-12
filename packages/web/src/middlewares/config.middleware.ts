import apiEvent from '@/api';
import { IConfigsColunm } from '@/typings/config';
import { IMiddlewareFunction } from '@/typings/middleware';

/**
 * 配置保存中间件
 */
export function configSaveDefautlMiddleware(): IMiddlewareFunction<'saveConfig'> {
  return async (next, configs) => {
    const configsColums: IConfigsColunm[] = Object.entries(configs).map(([key, value]) => {
      return {
        key,
        value,
      };
    });
    await apiEvent.apiSaveOrUpdateConfigs(configsColums);
    return next();
  };
}
