import ApiEvent from '@/api';
import { Note } from '@/model/note';
import { INote } from '@/typings/note';
import { ArrayMap } from '@xynotes/utils';
import { computed, readonly, ref } from 'vue';
import { configsStoreState } from './configs';
import { NoteListSortType } from '@/typings/configs';

const state = ref({
  // 当前选中笔记，当前编辑笔记
  activeNoteId: '' as string,
  // 笔记列表
  notesList: new ArrayMap<Note>('nid'),
  // 回收列表
  recycleList: new ArrayMap<Note>('nid')
});

// 当前笔记
export const activeNote = computed(() => {
  if (state.value.activeNoteId) {
    const note = state.value.notesList.find((note) => note.nid === state.value.activeNoteId);
    return note;
  }
  return undefined;
});

// 笔记个数
export const noteListCount = computed(() => {
  return state.value.notesList?.length || 0;
});

// 排好序的数组
export const notesListBySort = computed(() => {
  const noteListSortType = configsStoreState.value.NOTE_LIST_SORT.value || NoteListSortType.updated;
  return state.value.notesList.sort((a, b) => {
    return b[noteListSortType] - a[noteListSortType];
  });
});

/**
 * 设置当前笔记
 * @param nid
 */
export const setActiveNoteId = (nid: string) => {
  state.value.activeNoteId = nid;
};

/**
 * 设置笔记列表 线上优先
 *
 * @param list
 */
export const setNoteList = (list: INote[]) => {
  // 先排序
  list = list.sort((a, b) => b.updatedAt - a.updatedAt);
  list.forEach((note) => {
    if (state.value.notesList.has(note.nid)) {
      // 如果在线的在后面，同步时间
      if (note.onlineSyncAt) {
        const originNote = state.value.notesList.get(note.nid);
        originNote?.update({ onlineSyncAt: note.onlineSyncAt });
      }
    } else {
      state.value.notesList.push(new Note(note));
    }
  });
};

/**
 * 更新笔记
 */
export const updateNote = (note: INote) => {
  const originNote = state.value.notesList.find((n) => note.nid === n.nid);
  if (originNote) {
    originNote.update(note);
  } else {
    const newNote = new Note(note);
    state.value.notesList.unshift(newNote);
  }
};

/**
 * 增加笔记
 */
export const addNote = (detail?: INote) => {
  const note = new Note(detail);
  state.value.notesList.unshift(note);
  return note;
};

/**
 * 保存到数据库
 * @param note
 * @returns
 */
export const saveNote = async (note: INote, onlineSyncAt: boolean) => {
  console.log('[apiSaveOrUpdateNote] param', note.nid, note.updatedAt);
  const result = await ApiEvent.api.apiSaveOrUpdateNote(note, !!onlineSyncAt);
  console.log('[apiSaveOrUpdateNote] result', note.nid, result.updatedAt);
  if (result) {
    updateNote(result);
  }
  // noteEventBus.broadcast('note:update', { note: result, action: 'update' });
  return result;
};

/**
 * 删除笔记
 * @param note
 * @returns
 */
export const deleteNote = async (note: INote): Promise<any> => {
  return ApiEvent.api.apiDeleteNote(note).then(() => {
    const nid = note.nid;
    if (state.value.activeNoteId !== nid) {
      state.value.activeNoteId = '';
    }
    // 删除列表
    const index = state.value.notesList.findIndex((item) => item.nid === nid);
    const find = state.value.notesList.splice(index, 1);
    // 插入回收
    find && state.value.recycleList.push(find[0]);
    // 广播
    // noteEventBus.broadcast('note:update', { note, action: 'delete' });
  });
};

/**
 * 同步笔记
 * @param note
 * @returns
 */
export const syncNote = async (note: INote) => {
  console.log('[note] sync', note.nid);
  return ApiEvent.api.apiSyncNote(note).then((note) => {
    note && updateNote(note);
    window.$ui.toast('同步成功');
    return note;
  });
};

/**
 * 拉取笔记
 * @param nid
 * @returns
 */
export const queryNote = async (nid: string) => {
  return ApiEvent.api.apiFetchNoteDetailData(nid).then((result) => {
    result && updateNote(result);
    return result;
  });
};

/**
 * 恢复数据
 * @param note
 */
export const recovery = (note: INote) => {
  state.value.recycleList.delete(note.nid);
  state.value.notesList.push(new Note(note));
};

export const notesStoreState = readonly(state);
