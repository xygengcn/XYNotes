import { useNotesStore } from '@/store/notes.store';
import { INote } from '@/typings/note';
import { uuid } from 'js-lark';
import Database from 'ts-database';

/**
 * 同步数据
 */
export function syncDataByV2() {
  window.$ui.confirm({
    content: '确定要迁移旧版本数据吗？',
    onSubmit: () => {
      // 数据库
      const databaseV2 = new Database({
        name: 'XYNOTES',
        version: 1,
        modules: [{ name: 'notes', primary: 'nid', columns: [] }]
      });

      databaseV2.module('notes').then((module) => {
        module.findAll<any>().then((result) => {
          const notes: INote[] = result.map((note) => {
            return {
              nid: uuid(),
              // 笔记标题
              title: note.title,
              // 笔记内容
              text: note.text,
              // 笔记创建时间
              createdAt: note.created,
              // 笔记最新更新时间
              updatedAt: note.updated,
              // 简要信息
              intro: note?.text?.trim()?.slice(0, 50) || '',
              // 笔记状态
              order: 0,
              status: 1,
              attachment: [],
              author: '',
              type: 'text',
              origin: ''
            };
          });
          const store = useNotesStore();
          store.saveNoteListToDatabse(notes).then(() => {
            window.$ui.toast('数据迁移成功');
            setTimeout(() => {
              window.location.href = '/';
            }, 300);
          });
        });
      });
    }
  });
}
