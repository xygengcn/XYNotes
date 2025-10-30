import database from '@/database';
import { IConfigsColunm } from '@/typings/configs';
import { INote } from '@xynotes/typings';
import { omit } from '@xynotes/utils';

/**
 * 本地数据保存
 */

class ApiEventLocal {
  // 拉取笔记数据
  async apiFetchNoteListData(): Promise<INote[]> {
    return database.module('notes').then((model) => {
      return model
        .findAll<INote>({
          attributes: ['updatedAt', 'author', 'createdAt', 'intro', 'nid', 'order', 'status', 'title', 'type', 'tags']
        })
        .then((list) => {
          return list;
        });
    });
  }

  // 拉取笔记细节
  async apiFetchNoteDetailData(nid: string): Promise<INote> {
    return database.module('notes').then((model) => {
      return model.findByPk<INote>(nid);
    });
  }

  // 更新或新建笔记
  async apiSaveOrUpdateNote(note: INote, sync: boolean = false): Promise<INote> {
    return database.module('notes').then((model) => {
      // 转换数据格式
      const noteTableAttr: INote = omit(note, ['attachment']);
      if (!sync) {
        noteTableAttr.updatedAt = Date.now();
      }
      return model.bulkCreate([noteTableAttr]).then(() => {
        return {
          ...noteTableAttr
        };
      });
    });
  }
  // 删除笔记
  async apiArchiveNote(note: INote): Promise<boolean> {
    return database.module('notes').then((model) => {
      return model.destory(note.nid).then(() => true);
    });
  }

  // 添加归档
  async apiAddNoteArchive(note: INote): Promise<boolean> {
    // 转换数据格式
    const noteTableAttr: INote = omit(note, ['attachment']);
    return database.module('notes_archive').then((model) => {
      return model.bulkCreate([noteTableAttr]).then(() => true);
    });
  }
  // 移除归档
  async apiDeleteNoteArchive(note: INote): Promise<boolean> {
    return database.module('notes_archive').then((model) => {
      return model.destory(note.nid).then(() => true);
    });
  }
  // 删除所有归档
  async apiDeleteAllNoteArchive(): Promise<void> {
    return database.module('notes_archive').then((model) => {
      return model.clear();
    });
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
const apiEventLocal = new ApiEventLocal();
export default apiEventLocal;
