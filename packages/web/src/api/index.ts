import database from '@/services/database';
import { IConfigsColunm } from '@/typings/config';
import { INote } from '@/typings/note';
import ApiBridge from './api.bridge';
import apiEventLocal from './local';
import apiEventOnline from './online';

/**
 * 事件继承，所有数据处理都经过这里
 */

class ApiEvent implements ApiBridge {
  /**
   * 拉取笔记数据
   * @param remoteBaseUrl 远程地址
   * @param cb
   * @returns
   */
  async apiFetchNoteListData(content: {
    updateTime: number;
    pageSize: number;
    order: 'updatedAt' | 'createdAt';
  }): Promise<INote[]> {
    return apiEventLocal
      .apiFetchNoteListData()
      .then((localResult) => {
        if (window.$config?.REMOTE_ONLINE_SYNC === true) {
          return apiEventOnline.apiFetchNoteListData(content).then((onlineResult) => {
            return localResult.concat(onlineResult);
          });
        }
        return localResult;
      })
      .catch(() => {
        return [];
      });
  }

  // 拉取笔记细节
  async apiFetchNoteDetailData(nid: string): Promise<INote> {
    return apiEventLocal.apiFetchNoteDetailData(nid).then((note) => {
      if (window.$config?.REMOTE_ONLINE_SYNC === true) {
        return apiEventOnline
          .apiFetchNoteDetailData(nid)
          .then((result) => {
            return result || (note ? { ...note, onlineSyncAt: 0 } : note);
          })
          .catch(() => {
            return note ? { ...note, onlineSyncAt: 0 } : note;
          });
      }
      return note ? { ...note, onlineSyncAt: 0 } : note;
    });
  }

  // 更新或新建笔记
  async apiSaveOrUpdateNote(note: INote, onlineSync: boolean): Promise<INote> {
    const content = structuredClone(note);
    return apiEventLocal.apiSaveOrUpdateNote(content).then((note) => {
      if (window.$config?.REMOTE_ONLINE_SYNC === true && onlineSync) {
        return apiEventOnline
          .apiSaveOrUpdateNote(note)
          .then((result) => {
            return result || note;
          })
          .catch(() => {
            return note;
          });
      }
      return note;
    });
  }

  // 删除笔记
  async apiDeleteNote(note: INote): Promise<boolean> {
    return apiEventLocal.apiDeleteNote(note).then((result) => {
      if (window.$config?.REMOTE_ONLINE_SYNC === true) {
        return apiEventOnline.apiDeleteNote(note);
      }
      return result;
    });
  }

  // 同步笔记
  async apiSyncNote(note: INote): Promise<INote> {
    if (window.$config?.REMOTE_ONLINE_SYNC === true) {
      return apiEventOnline.apiSyncNote(note).then((online) => {
        return apiEventLocal.apiSaveOrUpdateNote(note, true).then(() => {
          return online;
        });
      });
    }
    return note;
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
