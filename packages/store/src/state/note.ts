import ApiEvent from '@/api';
import { Note } from '@/model/note';
import { NoteListSortType } from '@/typings/configs';
import { deleteNoteEvent, onNoteUpdate, updateNoteEvent } from '@xynotes/transport/web';
import { INote } from '@xynotes/typings';
import { ArrayMap } from '@xynotes/utils';
import { computed, readonly, ref } from 'vue';
import { configsStoreState } from './configs';

const state = ref({
  // 当前选中笔记，当前编辑笔记
  activeNoteId: '' as string,
  // 笔记列表
  noteList: new ArrayMap<Note>('nid'),
  // 归档列表
  archiveNoteList: new ArrayMap<Note>('nid'),

  // 搜索关键词
  searchKeyword: '' as string
});

// 当前笔记
export const activeNote = computed(() => {
  if (state.value.activeNoteId) {
    const note = state.value.noteList.find((note) => note.nid === state.value.activeNoteId);
    return note;
  }
  return undefined;
});

// 笔记个数
export const noteListCount = computed(() => {
  return state.value.noteList?.length || 0;
});

// 排好序的数组
export const notesListBySort = computed(() => {
  const noteListSortType = configsStoreState.value.NOTE_LIST_SORT.value || NoteListSortType.updated;
  // 分割关键词
  const keywords = state.value.searchKeyword
    .trim()
    .split(' ')
    .filter((i) => i?.trim().toLocaleLowerCase());

  if (keywords.length === 0) {
    return state.value.noteList.sort((a, b) => {
      return b[noteListSortType] - a[noteListSortType];
    });
  }
  return state.value.noteList
    .filter((note) => {
      return keywords.some((keyword) => {
        if (keyword.startsWith('#')) {
          if (note.tags) {
            return note.tags.includes(keyword.substring(1));
          }
          return false;
        }
        return (
          note.intro?.toLocaleLowerCase().includes(keyword) ||
          note.text?.toLocaleLowerCase().includes(keyword) ||
          note.title?.toLocaleLowerCase().includes(keyword)
        );
      });
    })
    .sort((a, b) => {
      return b[noteListSortType] - a[noteListSortType];
    });
});

/**
 * 搜索笔记列表
 * @param keyword 关键字
 */
export const searchNoteList = (keyword: string) => {
  state.value.searchKeyword = keyword;
  return;
};

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
    if (state.value.noteList.has(note.nid)) {
      // 如果在线的在后面，同步时间
      if (note.onlineSyncAt) {
        const originNote = state.value.noteList.get(note.nid);
        originNote?.assign({ onlineSyncAt: note.onlineSyncAt });
      }
    } else {
      state.value.noteList.push(new Note(note));
    }
  });
};

/**
 * 更新笔记
 */
export const updateNote = (note: INote) => {
  console.log('[store] update:action', note.nid);
  const originNote = state.value.noteList.find((n) => note.nid === n.nid);
  if (originNote) {
    originNote.assign(note);
  } else {
    const newNote = new Note(note);
    state.value.noteList.unshift(newNote);
  }
};

/**
 * 增加笔记
 */
export const addNote = (detail?: INote) => {
  const note = new Note(detail);
  state.value.noteList.unshift(note);
  return note;
};

/**
 * 保存到数据库
 * @param note
 * @returns
 */
export const saveNote = async (note: Partial<INote>, onlineSyncAt: boolean) => {
  const result = await ApiEvent.api.apiSaveOrUpdateNote(note as INote, !!onlineSyncAt);
  if (result) {
    /**
     * 通知事件
     */
    updateNoteEvent(result);
  }
  return result;
};

/**
 * 归档笔记
 * @param note
 * @returns
 */
export const archiveNote = async (note: INote): Promise<void> => {
  return ApiEvent.api.apiArchiveNote(note).then(() => {
    const nid = note.nid;
    if (state.value.activeNoteId !== nid) {
      state.value.activeNoteId = '';
    }
    // 删除列表
    const index = state.value.noteList.findIndex((item) => item.nid === nid);
    const find = state.value.noteList.splice(index, 1);
    // 插入回收
    find && state.value.archiveNoteList.push(find[0]);
    // 广播
    deleteNoteEvent(note);
  });
};

/**
 * 同步笔记
 * @param note
 * @returns
 */
export const syncNote = async (note: INote) => {
  console.log('[note] sync:action', note.nid);
  return ApiEvent.api.apiSyncNote(note).then((result) => {
    window.$ui.toast('同步成功');
    result && updateNote(result);
    return result || note;
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
  state.value.archiveNoteList.delete(note.nid);
  state.value.noteList.push(new Note(note));
  console.log('恢复笔记', state.value.archiveNoteList);
  // 同步到数据库
  ApiEvent.api.apiRecoveryNote(note);
};

/**
 * 删除笔记
 * @param note
 * @returns
 */
export const removeNote = async (note: INote) => {
  state.value.archiveNoteList.delete(note.nid);
  return await ApiEvent.api.apiRemoteNoteArchive(note);
};

/**
 * 拉取归档笔记
 * @returns
 */
export const fetchNoteArchiveList = () => {
  return ApiEvent.api.apiFetchArchiveList().then((result) => {
    result.forEach((note) => {
      state.value.archiveNoteList.push(new Note(note));
    });
  });
};

export const notesStoreState = readonly(state);

/**
 * 监听笔记事件
 */
onNoteUpdate((note) => {
  console.log('[store] update:event', note.nid);
  updateNote(note);
});
