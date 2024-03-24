import { IMiddlewareFunction } from '@/typings/middleware';
import { useConfigsStore } from '@/store/config.store';
import { useNotesStore } from '@/store/notes.store';
import apiEvent from '@/api';
import { AppLoadStatus, useAppStore } from '@/store/app.store';
import { INote } from '@/typings/note';

// 启动后同步操作

export default function perloadDefaultMiddleware(): IMiddlewareFunction<'load'> {
  return async (next) => {
    const configs = useConfigsStore();
    const note = useNotesStore();
    const app = useAppStore();

    // 回调
    const cb = (type: 'local' | 'remote', notes: INote[]) => {
      if (type === 'local') {
        app.setLoadStatus(AppLoadStatus.remoteNotesLoading);
      }
      note.setNoteList(notes);
    };
    app.setLoadStatus(AppLoadStatus.configsLoading);
    // 同步配置
    await apiEvent.apiFetchConfigsData().then((config) => {
      configs.syncConfigs(config);
      // 同步笔记信息
      return apiEvent.apiFetchNoteListData(configs.global.REMOTE_BASE_URL, cb).then((list) => {
        if (list.length === 0) {
          // 默认值
          note.saveDefaultData();
        }
      });
    });
    // 结束加载
    app.setLoadStatus(AppLoadStatus.finish);
    return next();
  };
}
