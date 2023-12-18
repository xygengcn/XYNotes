import contextMenu from '@/components/common/contextmenu';
import { IContextMenuOptions } from '@/typings/contextmenu';
import { App } from 'vue';

/**
 * 计算右键位置
 * @param dialog
 * @param pointEvent
 * @returns
 */
function rect(dialog: DOMRect, pointEvent: MouseEvent) {
  const dialogHeigth = dialog.height;
  const dialogWidth = dialog.width;
  // 窗口
  const bodyRect = document.body.getBoundingClientRect();
  let top: number = pointEvent.pageY;
  let left: number = pointEvent.pageX;

  // 向上
  if (top + dialogHeigth + 50 >= bodyRect.bottom) {
    top = Math.max(top - dialogHeigth, 52);
  }
  // 向左
  if (left + dialogWidth + 44 >= bodyRect.right) {
    left = left - dialogWidth;
  }
  // 其他情况
  return {
    top,
    left
  };
}
export default function VueContextMenu(app: App) {
  app.directive('contextmenu', {
    mounted(el, binding) {
      /**
       * 获取参数
       */
      const { menuList, onSelect } = (binding.value || {}) as IContextMenuOptions;
      if (!menuList?.length) {
        return;
      }
      // 监听右键
      el.oncontextmenu = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // 右键目标
        let target = e.target as HTMLElement;

        // 索引
        let contextMenuKey = '';

        while (target && el.contains(target) && !contextMenuKey) {
          if (target.dataset?.contextmenukey) {
            contextMenuKey = target.dataset.contextmenukey;
            break;
          }
          target = target.parentElement;
        }

        contextMenuKey = contextMenuKey || el.dataset?.contextmenukey;

        // 没有索引
        if (contextMenuKey) {
          const el = contextMenu(menuList, (options) => {
            onSelect?.({ ...options, key: contextMenuKey });
          });
          const menuRect = el.getBoundingClientRect();
          const { left, top } = rect(menuRect, e);
          el.style.left = left + 'px';
          el.style.top = top + 'px';
        }
      };
    },
    beforeUnmount(el, binding, vnode) {
      const options = (binding.value || {}) as IContextMenuOptions;
      options.onSelect = null;
      // 移除监听
      if (el.oncontextmenu) {
        el.removeEventListener('contextmenu', el.oncontextmenu);
        el.oncontextmenu = null;
      }
    }
  });
}
