import database from '@/database';
import { isCheckOnlineSync } from '@/state/configs';
import { IUploadFile } from '@/typings/assets';
import { IConfigsColunm } from '@/typings/configs';
import { INote, NoteStatus } from '@xynotes/typings';
import ApiBridge from './api.bridge';
import apiEventLocal from './local';
import apiEventOnline from './online';

/**
 * 事件继承，所有数据处理都经过这里
 */

class ApiEvent implements ApiBridge {
  /**
   * 实例
   */
  static api = new ApiEvent();
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
        if (isCheckOnlineSync()) {
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
  async apiFetchNoteDetailData(nid: string): Promise<INote | null> {
    // 本地数据
    const localNote = await apiEventLocal.apiFetchNoteDetailData(nid).catch(() => null);

    // 线上数据
    let onlineNote: INote | null = null;

    if (isCheckOnlineSync()) {
      onlineNote = await apiEventOnline.apiFetchNoteDetailData(nid).catch(() => null);
    }

    // 没有本地数据
    if (!localNote) {
      return onlineNote;
    }

    // 没有线上数据
    if (!onlineNote) {
      return { ...localNote, onlineSyncAt: 0 };
    }

    // 本地数据比线上数据新
    if (onlineNote.onlineSyncAt && localNote.updatedAt > onlineNote.onlineSyncAt) {
      return { ...localNote, onlineSyncAt: onlineNote.onlineSyncAt };
    }

    return { ...localNote, ...onlineNote };
  }

  // 更新或新建笔记
  async apiSaveOrUpdateNote(note: INote, onlineSync: boolean): Promise<INote> {
    const content = structuredClone(note);
    return apiEventLocal.apiSaveOrUpdateNote(content).then((local) => {
      if (isCheckOnlineSync() && onlineSync) {
        return apiEventOnline
          .apiSaveOrUpdateNote(local)
          .then((result) => {
            return result || local;
          })
          .catch(() => {
            return local;
          });
      }
      return local;
    });
  }

  // 删除笔记
  async apiArchiveNote(note: INote): Promise<boolean> {
    return apiEventLocal.apiArchiveNote(note).then((result) => {
      // 添加到归档
      apiEventLocal.apiAddNoteArchive({ ...note, status: NoteStatus.archive }).catch(() => null);

      // 在线同步
      if (isCheckOnlineSync()) {
        return apiEventOnline.apiArchiveNote(note);
      }
      return result;
    });
  }

  // 同步笔记
  async apiSyncNote(note: INote): Promise<INote | null> {
    // 同步线上
    if (isCheckOnlineSync()) {
      return apiEventOnline.apiSyncNote(note).then((online) => {
        return apiEventLocal.apiSaveOrUpdateNote(note, true).then(() => {
          return online;
        });
      });
    } else {
      // 同步本地
      return apiEventLocal.apiFetchNoteDetailData(note.nid).then((local) => {
        if (local.updatedAt > note.updatedAt) {
          return local;
        }
        return null;
      });
    }
  }

  // 拉取归档
  async apiFetchArchiveList(): Promise<INote[]> {
    return database.module('notes_archive').then((model) => {
      return model.findAll();
    });
  }
  // 移除归档
  async apiRecoveryNote(note: INote): Promise<INote> {
    return apiEventLocal
      .apiDeleteNoteArchive(note)
      .then(() => this.apiSaveOrUpdateNote({ ...note, status: NoteStatus.normal }, true));
  }

  // 移除归档
  async apiDeleteNoteArchive(note: INote): Promise<boolean> {
    return apiEventLocal.apiDeleteNoteArchive(note);
  }

  // 移除所有归档
  async apiDeleteAllNoteArchive(): Promise<void> {
    return apiEventLocal.apiDeleteAllNoteArchive();
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

  // 上传文件
  async apiFetchResourceUpload(file: File): Promise<IUploadFile> {
    return apiEventOnline.apiFetchResourceUpload(file);
  }

  // 拉取文件
  async apiFetchResourceList(): Promise<{ data: IUploadFile[]; next: string }> {
    return apiEventOnline.apiFetchResourceList();
  }
}
export default ApiEvent;
