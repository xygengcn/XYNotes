import { useNotesStore } from '@/store/notes.store';
import { IMiddlewareFunction } from '@/typings/middleware';
import apiEvent from '@/api';
import noteEventBus from '@/event-bus';

// 保存笔记中间件
export function saveNoteDefaultMiddleware(): IMiddlewareFunction<'saveNote'> {
  return async (next, note) => {
    console.log('[apiSaveOrUpdateNote] param', note.nid, note.updatedAt);
    const result = await apiEvent.apiSaveOrUpdateNote(note);
    console.log('[apiSaveOrUpdateNote] result', note.nid, result.updatedAt);
    if (result) {
      Object.assign(note, result);
    }
    noteEventBus.broadcast('update', { note: result, action: 'update' });
    return next();
  };
}

// 删除笔记中间件
export function deleteNoteDefaultMiddleware(): IMiddlewareFunction<'deleteNote'> {
  return async (next, note) => {
    await apiEvent.apiDeleteNote(note).then(() => {
      const store = useNotesStore();
      store.deleteNote(note.nid);
      noteEventBus.broadcast('update', { note, action: 'delete' });
    });
    return next();
  };
}
