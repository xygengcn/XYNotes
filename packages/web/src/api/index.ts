import database from '@/database';
import { IConfigsColunm } from '@/typings/config';
import { INote } from '@/typings/note';
import ApiBridge from './api.bridge';
import apiEventOnline from './online';
import apiEventLocal from './local';

/**
 * 事件继承，所有数据处理都经过这里
 */

class ApiEvent implements ApiBridge {
  // 拉取笔记数据
  async apiFetchNoteListData(
    remoteBaseUrl: string,
    cb: (type: 'local' | 'remote', note: INote[]) => void
  ): Promise<INote[]> {
    return apiEventLocal
      .apiFetchNoteListData()
      .then((localResult) => {
        cb('local', localResult);
        if (remoteBaseUrl) {
          return apiEventOnline.apiFetchNoteListData().then((onlineResult) => {
            cb('remote', onlineResult);
            return onlineResult.concat(localResult);
          });
        }
        return localResult;
      })
      .catch(() => {
        return [];
      });
  }

  // 拉取笔记细节
  async apiFetchNoteDetailData(nid: string, remoteId: string): Promise<INote> {
    if (remoteId) {
      return apiEventOnline.apiFetchNoteDetailData(remoteId);
    }
    return apiEventLocal.apiFetchNoteDetailData(nid);
  }

  // 更新或新建笔记
  async apiSaveOrUpdateNote(note: INote): Promise<any> {
    if (note.remoteId) {
      return apiEventOnline.apiSaveOrUpdateNote(note);
    }
    return apiEventLocal.apiSaveOrUpdateNote(note);
  }

  // 删除笔记
  async apiDeleteNote(note: INote): Promise<void> {
    if (note.remoteId) {
      return apiEventOnline.apiDeleteNote(note);
    }
    return apiEventLocal.apiDeleteNote(note);
  }
  // 拉取配置
  async apiFetchConfigsData(): Promise<IConfigsColunm[]> {
    return database.module('configs').then((model) => {
      return model.findAll();
    });
  }
  // 更新配置
  async apiSaveOrUpdateConfigs(configs: IConfigsColunm[]): Promise<any> {
    return database.module('configs').then((model) => {
      return model.bulkCreate(configs);
    });
  }
}
const apiEvent = new ApiEvent();
export default apiEvent;
