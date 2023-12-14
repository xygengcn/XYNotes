import { useNotesStore } from '@/store/notes.store';
import { IMiddlewareFunction } from '@/typings/middleware';
import apiEvent from '@/api';
import noteEventBus from '@/event-bus';

// 保存笔记中间件
export function saveNoteDefaultMiddleware(): IMiddlewareFunction<'saveNote'> {
  return async (next, noteList) => {
    await apiEvent.apiSaveOrUpdateNotes(noteList);
    console.log('[apiSaveOrUpdateNotes]', noteList);
    noteEventBus.emit('update', { noteList, action: 'update' });
    return next();
  };
}

// 删除笔记中间件
export function deleteNoteDefaultMiddleware(): IMiddlewareFunction<'deleteNote'> {
  return async (next, note) => {
    await apiEvent.apiDeleteNote(note).then(() => {
      const store = useNotesStore();
      store.deleteNote(note.nid);
      noteEventBus.emit('update', { noteList: [note], action: 'delete' });
    });
    return next();
  };
}
