import { useNotesStore } from '@/store/notes.store';
import { IMiddlewareFunction } from '@/typings/middleware';
import apiEvent from '@/api';
import noteEventBus from '@/event-bus';

// 保存笔记中间件
export function saveNoteDefaultMiddleware(): IMiddlewareFunction<'saveNote'> {
  return async (next, note) => {
    await apiEvent.apiSaveOrUpdateNote(note);
    console.log('[apiSaveOrUpdateNote]', note);
    noteEventBus.emit('update', { note, action: 'update' });
    return next();
  };
}

// 删除笔记中间件
export function deleteNoteDefaultMiddleware(): IMiddlewareFunction<'deleteNote'> {
  return async (next, note) => {
    await apiEvent.apiDeleteNote(note).then(() => {
      const store = useNotesStore();
      store.deleteNote(note.nid);
      noteEventBus.emit('update', { note, action: 'delete' });
    });
    return next();
  };
}
