import { INote } from '../typings/note';
import ArrayMap from '@xynotes/utils/dist/array-map';
import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notesList: new ArrayMap<INote>('nid')
  }),
  getters: {
    // 笔记个数
    count(state): number {
      return state.notesList?.length || 0;
    }
  },
  actions: {
    /**
     * 设置笔记列表 线上优先
     *
     * @param list
     */
    setNoteList(list: INote[]): void {
      // 先排序
      list = list.sort((a, b) => b.updatedAt - a.updatedAt);
      list.forEach((note) => {
        if (this.notesList.has(note.nid)) {
          // 如果在线的在后面，同步时间
          if (note.onlineSyncAt) {
            const originNote = this.notesList.get(note.nid);
            originNote.onlineSyncAt = note.onlineSyncAt;
          }
        } else {
          this.notesList.push(note);
        }
      });
    },
    /**
     * 更新笔记
     * @param n
     */
    updateNote(n: Partial<INote> & Pick<INote, 'nid'>): void {
      const note = this.notesList.get(n.nid);
      note && Object.assign(note, n);
    }
  }
});
