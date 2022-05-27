import { uuid } from 'js-lark';
import { INote, INoteStatus } from '@/typings/note';
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
  public status: INoteStatus;
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
        status: 1,
      });
    }
  }

  /**
   * 设置值
   * @param note
   */
  public set(note: Partial<Exclude<INote, 'updatedAt'>>): void {
    // 截取前50作简要信息
    Object.assign(this, {
      ...note,
      status: 0,
      intro: note?.text?.trim()?.slice(0, 50) || this.intro,
      updatedAt: new Date().getTime(),
    });
  }
  /**
   * 保存
   * @param note
   * @returns
   */
  public async save(): Promise<void> {
    // 草稿状态才保存
    if (this.status === INoteStatus.draft) {
      // 保存中
      this.status = INoteStatus.saving;
      const noteDetail = JSON.parse(JSON.stringify(this));
      return apiEvent
        .apiSaveOrUpdateNotes([{ ...noteDetail, status: 1 }])
        .then((result) => {
          this.status = 1;
          return result;
        })
        .catch(() => {
          // 返回草稿状态
          this.status = INoteStatus.draft;
        });
    }
  }

  /**
   * 删除笔记
   */
  public delete(): Promise<any> {
    const noteDetail = JSON.parse(JSON.stringify(this));
    return apiEvent.apiDeleteNote(noteDetail);
  }
}
