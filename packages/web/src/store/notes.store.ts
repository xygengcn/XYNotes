import apiEvent from '@/api';
import noteEventBus from '@/services/event-bus';
import { Note } from '@/services/note';
import { INote } from '@/typings/note';
import ArrayMap from '@/utils/array-map';
import { defineStore } from 'pinia';
import defaultJson from './default.json';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    // 当前选中笔记，当前编辑笔记
    activeNoteId: '' as string,
    notesList: new ArrayMap<Note>('nid'),
    recycleList: new ArrayMap<Note>('nid')
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
            originNote.update({ onlineSyncAt: note.onlineSyncAt });
          }
        } else {
          this.notesList.push(new Note(note));
        }
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
    async saveNoteListToDatabse(note: INote, onlineSyncAt: boolean) {
      console.log('[apiSaveOrUpdateNote] param', note.nid, note.updatedAt);
      const result = await apiEvent.apiSaveOrUpdateNote(note, !!onlineSyncAt);
      console.log('[apiSaveOrUpdateNote] result', note.nid, result.updatedAt);
      if (result) {
        this.updateNote(result);
      }
      noteEventBus.broadcast('note:update', { note: result, action: 'update' });
      return result;
    },

    /**
     * 恢复数据
     * @param note
     */
    recovery(note: Note) {
      this.recycleList.delete(note.nid);
      this.notesList.push(note);
    },
    // 初始化默认数据
    saveDefaultData() {
      this.notesList.push(new Note(defaultJson as INote));
      this.saveNoteListToDatabse(defaultJson as INote, false);
    }
  }
});
