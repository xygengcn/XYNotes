import { uuid } from 'js-lark';
import { INote } from '@/typings/note';
import apiEvent from '@/api';

export class Note implements INote {
  // 笔记id
  public nid!: string;

  // 笔记标题
  public title!: string;

  // 笔记内容
  public text: string = '';

  // 笔记创建时间
  public createdAt!: number;

  // 笔记最新更新时间
  public updatedAt!: number;

  // 简要信息
  public intro: string = '';

  // 笔记状态
  public status: number;
  // 笔记来源
  public origin: string;
  // 笔记作者
  public author: string;

  constructor(note?: INote) {
    if (note) {
      Object.assign(this, note);
    } else {
      Object.assign(this, {
        nid: uuid(),
        title: '示例',
        text: '这里也有一些内容在这里呢！',
        intro: '这里也有一些内容在这里呢！',
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      });
    }
  }
  /**
   * 保存
   * @param note
   * @returns
   */
  public save(note: Partial<Exclude<INote, 'updatedAt'>>): Promise<void> {
    // 截取前80作简要信息
    Object.assign(this, {
      ...note,
      intro: note.text?.trim().slice(0, 50),
      updatedAt: new Date().getTime(),
    });
    const noteDetail = JSON.parse(JSON.stringify(this));
    return apiEvent.apiSaveOrUpdateNotes([noteDetail]);
  }

  /**
   * 删除笔记
   */
  public delete(): Promise<any> {
    const noteDetail = JSON.parse(JSON.stringify(this));
    return apiEvent.apiDeleteNote(noteDetail);
  }
}
