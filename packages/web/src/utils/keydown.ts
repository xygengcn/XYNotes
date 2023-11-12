/**
 * 处理快捷键
 * @param ev
 */
function KeyDown(ev: KeyboardEvent) {
  // 屏蔽保存快捷键
  if (ev.ctrlKey && ev.key === 's') {
    ev.preventDefault();
  }
  if (ev.metaKey && ev.key === 's') {
    ev.preventDefault();
  }
}
document.onkeydown = KeyDown;
