import database from '@/database';
import { IConfigsColunm } from '@/typings/config';
import { INote } from '@/typings/note';
import { object } from '@/utils/object';

/**
 * 本地数据保存
 */

class ApiEventLocal {
  // 拉取笔记数据
  async apiFetchNoteListData(): Promise<INote[]> {
    return database.module('notes').then((model) => {
      return model
        .findAll<INote>({
          attributes: ['updatedAt', 'author', 'createdAt', 'intro', 'nid', 'order', 'status', 'title', 'type']
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
      const noteTableAttr = object.omit(note, ['attachment']);
      // 不是同步
      if (!sync) {
        noteTableAttr.updatedAt = Date.now();
      }
      return model.bulkCreate([noteTableAttr]).then(() => {
        return {
          ...note,
          ...noteTableAttr
        };
      });
    });
  }
  // 删除笔记
  async apiDeleteNote(note: INote): Promise<boolean> {
    return database.module('notes').then((model) => {
      return model.destory(note.nid).then(() => true);
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
