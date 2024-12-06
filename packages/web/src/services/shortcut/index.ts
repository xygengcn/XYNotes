/**
 * 快捷键管理
 */

import { activeNote, addNote, setActiveNoteId } from '@xynotes/store/note';
import { is } from '@xynotes/utils';

document.addEventListener('keydown', (e) => {
  // 新建笔记
  if ((e.metaKey || e.ctrlKey) && e.key === 'n' && is.mainWindow()) {
    const note = addNote();
    setActiveNoteId(note.nid);
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
    e.preventDefault();
    e.stopPropagation();
    activeNote.value?.save(true);
    return;
  }
});
