/**
 * 快捷键管理
 */

import { registerShortcut, showMainWindow, unregisterAllShortcut } from '@xynotes/app-api';
import { configsStoreState } from '@xynotes/store/configs';
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

/**
 * 快捷键管理
 */
export const shortcutMap = [
  {
    key: 'SHORTCUT_KEY_SHOW',
    handler: () => {
      showMainWindow();
    }
  }
];

/**
 * 自动注册快捷
 */
export async function autoRegisterAppShortcut() {
  await unregisterAllShortcut();
  for (const shortcut of shortcutMap) {
    const key = configsStoreState.value[shortcut.key];
    if (shortcut.key && key) {
      await registerShortcut(key, shortcut.handler)
        .then(() => {
          console.info('[shortcut] 注册成功', shortcut.key, key);
        })
        .catch((e) => {
          console.error('[shortcut] 注册失败', shortcut.key, key, e);
        });
    }
  }
}
