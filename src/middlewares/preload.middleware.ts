import { IMiddlewareFunction } from '@/typings/middleware';
import { useConfigsStore } from '@/store/config.store';
import { useNotesStore } from '@/store/notes.store';
import apiEvent from '@/api';

// 启动后同步操作

export default function perloadDefaultMiddleware(): IMiddlewareFunction<'load'> {
  return async (next) => {
    const configs = useConfigsStore();
    const note = useNotesStore();
    // // 同步配置
    await apiEvent.apiFetchConfigsData().then((config) => {
      configs.syncConfigs(config);
      // 同步笔记信息
      return apiEvent.apiFetchNoteListData().then((list) => {
        if (list?.length) {
          return note.setNoteList(list);
        }
        note.saveDefaultData();
      });
    });
    return next();
  };
}
