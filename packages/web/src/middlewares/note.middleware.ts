import { useNotesStore } from '@/store/notes.store';
import { IMiddlewareFunction } from '@/typings/middleware';
import apiEvent from '@/api';

// 保存笔记中间件
export function saveNoteDefaultMiddleware(): IMiddlewareFunction<'saveNote'> {
  return async (next, notes) => {
    await apiEvent.apiSaveOrUpdateNotes(notes);
    return next();
  };
}

// 保存笔记中间件
export function deleteNoteDefaultMiddleware(): IMiddlewareFunction<'deleteNote'> {
  return async (next, note) => {
    await apiEvent.apiDeleteNote(note).then(() => {
      const store = useNotesStore();
      store.deleteNote(note.nid);
    });
    return next();
  };
}
