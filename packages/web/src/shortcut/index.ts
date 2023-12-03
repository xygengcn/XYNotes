/**
 * 快捷键管理
 */

import { useNotesStore } from '@/store/notes.store';

document.addEventListener('keydown', (e) => {
  // 新建笔记
  if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
    const store = useNotesStore();
    const note = store.addNote();
    store.setActiveNoteId(note.nid);
    e.stopPropagation();
    e.preventDefault();
    return;
  }

  // 寻找
  if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
    e.stopPropagation();
    e.preventDefault();
    return;
  }

  // 屏蔽保存快捷键
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    const store = useNotesStore();
    e.preventDefault();
    e.stopPropagation();
    store.activeNote?.save();
    return;
  }
});
