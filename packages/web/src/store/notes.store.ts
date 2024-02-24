import middlewareHook from '@/middlewares';
import { Note } from '@/services/note';
import { INote } from '@/typings/note';
import { defineStore } from 'pinia';
import defaultJson from './default.json';
import ArrayMap from '@/utils/array-map';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    // 当前选中笔记，当前编辑笔记
    activeNoteId: '' as string,
    notesList: new ArrayMap<Note>('nid'),
    recycleList: [] as Note[]
  }),
  getters: {
    // 当前笔记
    activeNote(state): Note | undefined {
      if (state.activeNoteId) {
        const note = state.notesList.find((note) => note.nid === state.activeNoteId);
        return note;
      }
      return undefined;
    },
    // 笔记个数
    noteListCount(state): number {
      return state.notesList?.length || 0;
    }
  },
  actions: {
    /**
     * 更新笔记
     */
    updateNote(note: INote) {
      const originNote = this.notesList.find((n) => note.nid === n.nid);
      if (originNote) {
        originNote.update(note);
      } else {
        const newNote = new Note(note);
        this.notesList.unshift(newNote);
      }
    },
    /**
     * 增加笔记
     */
    addNote(): Note {
      const note = new Note();
      this.notesList.unshift(note);
      return note;
    },
    /**
     * 设置当前笔记
     * @param nid
     */
    setActiveNoteId(nid: string): void {
      this.activeNoteId = nid;
    },
    /**
     * 设置笔记列表
     * @param list
     */
    setNoteList(list: INote[]): void {
      list.forEach((note) => {
        this.notesList.push(new Note(note));
      });
    },
    /**
     * 删除笔记
     * @param note
     * @returns
     */
    async deleteNote(nid: string): Promise<any> {
      if (this.activeNoteId !== nid) {
        this.activeNoteId = '';
      }
      const index = this.notesList.findIndex((item) => item.nid === nid);

      const find = this.notesList.splice(index, 1);

      find && this.recycleList.push(find[0]);
    },

    /**
     * 保存到数据库
     * @param note
     * @returns
     */
    saveNoteListToDatabse(note: INote) {
      return middlewareHook.registerMiddleware('saveNote', note);
    },

    /**
     * 恢复数据
     * @param note
     */
    recovery(note: Note) {
      this.recycleList = this.recycleList.filter((item) => item.nid !== note.nid);
      this.notesList.push(note);
    },
    // 初始化默认数据
    saveDefaultData() {
      this.setNoteList([defaultJson]);
      this.saveNoteListToDatabse(defaultJson);
    }
  }
});
