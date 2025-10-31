import ApiEvent from '@store/api';
import { archiveNote, removeNote, saveNote, syncNote } from '@store/state/note';
import { INote, INoteAttachment, NoteStatus, NoteType } from '@xynotes/typings';
import { debounce, downloadFile, omit, uuid } from '@xynotes/utils';
import { toRaw } from 'vue';

export class Note implements INote {
  // 笔记类型
  public type: NoteType = NoteType.text;
  // 笔记id
  public nid: string = '';

  // 笔记标题
  public title: string = '';

  // 笔记内容
  public text: string = '';

  // 笔记内容
  public content: JSON = null;

  // 笔记创建时间
  public createdAt: number = Date.now();

  // 笔记最新更新时间
  public updatedAt: number = Date.now();

  // 简要信息
  public intro: string = '';

  // 笔记状态
  public status: NoteStatus = 0;

  // 笔记来源
  public origin: string = '';

  // 笔记作者
  public author: string = '';

  // 排序
  public order: number = 0;

  // 笔记附件
  public attachment: Array<INoteAttachment> = [];

  // 同步时间
  public onlineSyncAt: number = 0;

  // 标签
  public tags: Array<string> = [];

  // 保存节流
  private __saveNoteDebouce: number | undefined = undefined;
  private __saveNoteDebouceFn: (...args: any[]) => number;

  constructor(note?: INote) {
    if (note) {
      this.assign(note);
    } else {
      this.assign({
        nid: uuid(),
        title: '示例',
        text: '',
        intro: '',
        content: null,
        tags: [],
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      });
    }

    // 节流保存函数
    this.__saveNoteDebouceFn = debounce((note: Note) => {
      note.save(true);
    }, 3000);
  }

  /**
   * 更新
   */
  public assign(note: Partial<INote>): void {
    Object.assign(this, note, { tags: note.tags || this.tags || [] });
  }

  /**
   * 设置值
   * @param note
   */
  public set(note: Partial<Exclude<INote, 'updatedAt'>>): void {
    if (note.status === NoteStatus.draft || this.status === NoteStatus.draft) {
      this.assign(note);
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

      // 笔记内容
      content: toRaw(this.content),

      // 笔记创建时间
      createdAt: this.createdAt,

      // 笔记最新更新时间
      updatedAt: this.updatedAt,

      // 简要信息
      intro: this.intro,

      // 笔记状态
      status: this.status,

      // 笔记作者
      author: this.author,

      // 笔记附件
      attachment: [],

      // 标签
      tags: this.tags ? toRaw(this.tags) : []
    };
  }
  /**
   * 保存
   * @param force 强制立即保存
   * @returns
   */
  public async save(force: boolean = false) {
    console.log('[save]', this.nid, 'status:', this.status, 'force:', force);
    // 不强制保存
    if (!force) {
      this.__saveNoteDebouce = this.__saveNoteDebouceFn(this);
      return Promise.resolve();
    }
    // 草稿状态才保存
    if (this.status === NoteStatus.draft) {
      // 保存中
      this.status = NoteStatus.saving;
      const noteDetail = this.toRaw();
      return saveNote({ ...noteDetail, status: 1 }, !!this.onlineSyncAt)
        .then((note) => {
          if (note) {
            console.log('[save] success', note);
            this.assign(note);
          }
          return note;
        })
        .catch((e) => {
          // 返回草稿状态
          this.status = NoteStatus.draft;
          console.error('[save] error', e);
        });
    }
    return Promise.resolve();
  }

  /**
   *  更新笔记
   * @param note
   * @returns
   */
  public async update(note: Partial<INote>) {
    this.assign(note);
    return ApiEvent.api.apiFetchNoteDetailData(this.nid).then((result) => {
      if (result) {
        this.assign(omit(result, Object.keys(note) as Array<keyof INote>));
      }
      return this.save(true);
    });
  }

  /**
   * 删除笔记
   */
  public archive(): Promise<any> {
    // 清除定时器
    if (this.__saveNoteDebouce) {
      window.clearTimeout(this.__saveNoteDebouce);
    }
    const note = this.toRaw();
    return archiveNote(note);
  }

  /**
   * 移除笔记
   */
  public remove() {
    if (this.status === NoteStatus.archive) {
      removeNote(this.toRaw());
    }
  }

  /**
   * json文件
   */
  public toJson() {
    const str = JSON.stringify(this.toRaw());
    return downloadFile(str || '', `${this.title || 'XYNote'}.json`);
  }

  /**
   * markdown文件
   * @returns
   */
  public toMarkdown() {
    return downloadFile(this.text || '', `${this.title || 'XYNote'}.md`);
  }

  /**
   * 同步数据，不修改更新时间
   * @returns
   */
  public sync() {
    console.log('[note] sync', this.nid);
    return syncNote(this.toRaw()).then((note) => {
      this.assign(note);
      window.$ui.toast('同步成功');
    });
  }
}
