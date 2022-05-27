import apiEvent from '@/api';
import { Note } from '@/services/note';
import { INote } from '@/typings/note';
import { defineStore } from 'pinia';
import defaultJson from './default.json';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    // 当前选中笔记，当前编辑笔记
    activeNoteId: '' as string,
    notesList: [] as Note[],
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
    },
  },
  actions: {
    /**
     * 增加笔记
     */
    addNote(): void {
      const note = new Note();
      this.notesList.unshift(note);
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
      this.notesList = list.map((note) => {
        return new Note(note);
      });
    },
    /**
     * 删除笔记
     * @param note
     * @returns
     */
    async deleteNote(note: Note): Promise<any> {
      return note.delete().then((result) => {
        if (this.activeNoteId !== note.nid) {
          this.activeNoteId = '';
        }
        this.notesList = this.notesList.filter((item) => {
          return item.nid !== note.nid;
        });
        return result;
      });
    },
    saveNoteListToDatabse(notes: INote[]) {
      return apiEvent.apiSaveOrUpdateNotes(notes);
    },
    /**
     * 同步笔记列表
     * @returns
     */
    syncDatabaseToStore() {
      return apiEvent.apiFetchNoteListData().then((list) => {
        if (list?.length) {
          return this.setNoteList(list);
        }
        this.setNoteList(defaultJson);
        this.saveNoteListToDatabse(defaultJson);
      });
    },
  },
});
