import database from '@/database';
import { IConfigsColunm } from '@/typings/config';
import { INote } from '@/typings/note';
import ApiBridge from './api.bridge';

/**
 * 事件继承，所有数据处理都经过这里
 */

class ApiEvent implements ApiBridge {
  // 拉取笔记数据
  async apiFetchNoteListData(): Promise<INote[]> {
    return database.module('notes').then((model) => {
      return model
        .findAll<INote>({
          attributes: [
            'updatedAt',
            'author',
            'createdAt',
            'intro',
            'nid',
            'order',
            'origin',
            'status',
            'title',
            'type',
            'updatedAt',
          ],
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
  async apiSaveOrUpdateNotes(note: INote[]): Promise<any> {
    return database.module('notes').then((model) => {
      return model.bulkCreate(note);
    });
  }
  // 删除笔记
  async apiDeleteNote(note: INote): Promise<any> {
    return database.module('notes').then((model) => {
      return model.destory(note.nid);
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
const apiEvent = new ApiEvent();
export default apiEvent;
