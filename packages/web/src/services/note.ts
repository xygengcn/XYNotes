import middlewareHook from '@/middlewares';
import { uuid } from 'js-lark';
import { INote, INoteAttachment, INoteStatus, INoteType } from '@/typings/note';
import { debounce } from '@/utils/debounce-throttle';
import { downloadFile } from '@/utils/file';

export class Note implements INote {
  // 笔记类型
  public type: INoteType = INoteType.text;
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
  public status: INoteStatus = 0;
  // 笔记来源
  public origin: string = '';
  // 笔记作者
  public author: string = '';
  // 排序
  public order: number = 0;

  // 笔记附件
  public attachment: Array<INoteAttachment> = [];

  // 字数
  public counter: number = 0;

  // 在线Id
  public remoteId: string = '';

  // 保存节流
  private __saveNoteDebouceFn: (...args: any[]) => number;

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
        updatedAt: new Date().getTime()
      });
    }

    // 节流保存函数
    this.__saveNoteDebouceFn = debounce(() => {
      this.save();
    }, 3000);
  }

  /**
   * 设置值
   * @param note
   */
  public set(note: Partial<Exclude<INote, 'updatedAt'>>): void {
    if (note.status === INoteStatus.draft || this.status === INoteStatus.draft) {
      // 截取前50作简要信息
      Object.assign(this, {
        ...note,
        intro: note?.text?.trim()?.slice(0, 50) || this.intro,
        updatedAt: new Date().getTime()
      });
    }
  }

  public toRaw(): INote {
    return {
      // 笔记id
      nid: this.nid,

      // 笔记标题
      title: this.title,

      // 笔记类型
      type: this.type,

      // 排序
      order: this.order,

      // 笔记内容
      text: this.text,

      // 笔记创建时间
      createdAt: this.createdAt,

      // 笔记最新更新时间
      updatedAt: this.updatedAt,
      // 简要信息
      intro: this.intro,

      // 笔记状态
      status: this.status,

      // 笔记来源
      origin: this.origin,

      // 笔记作者
      author: this.author,

      // 笔记附件
      attachment: this.attachment,

      // 在线id
      remoteId: this.remoteId
    };
  }
  /**
   * 保存
   * @param force 强制立即保存
   * @returns
   */
  public async save(force: boolean = true) {
    console.log('[save]', this.nid, this.status, force);
    // 不强制保存
    if (!force) {
      this.__saveNoteDebouceFn();
      return;
    }
    // 草稿状态才保存
    if (this.status === INoteStatus.draft) {
      // 保存中
      this.status = INoteStatus.saving;
      const noteDetail = this.toRaw();
      return middlewareHook
        .registerMiddleware('saveNote',{ ...noteDetail, status: 1 })
        .then((result) => {
          this.status = INoteStatus.normal;
          return result;
        })
        .catch(() => {
          // 返回草稿状态
          this.status = INoteStatus.draft;
        });
    }
    return;
  }

  /**
   * 删除笔记
   */
  public delete(): Promise<any> {
    const noteDetail = this.toRaw();
    return middlewareHook.registerMiddleware('deleteNote', noteDetail);
  }

  /**
   * 更新
   */
  public update(note: INote) {
    Object.assign(this, note);
  }

  /**
   * json文件
   */
  public toJson() {
    const str = JSON.stringify(this.toRaw());
    return downloadFile(str || '', `${this.title || 'XYNote'}.json`);
  }
}
