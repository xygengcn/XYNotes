import { IMiddlewareFunction } from '@/typings/middleware';
import { useConfigsStore } from '@/store/config.store';
import { useNotesStore } from '@/store/notes.store';

// 启动后同步操作

export default function perloadMiddleware(): IMiddlewareFunction {
  return async (ctx, next) => {
    const configs = useConfigsStore();
    const note = useNotesStore();
    // // 同步配置
    configs.syncConfigs().then(() => {
      // 同步笔记信息
      return note.syncDatabaseToStore();
    });
    await next();
  };
}
