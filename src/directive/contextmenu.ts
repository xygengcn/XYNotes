import { ContextMenu } from '@/components/common/contextmenu';
import { ContextMenuOptions } from '@/typings/contextmenu';
import Vue, { DirectiveOptions } from 'vue';

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
    left,
  };
}

const vContextMenu: DirectiveOptions = {
  bind(el, binding, vnode) {
    const { menu, onSelect } = (binding.value || {}) as ContextMenuOptions;
    if (!menu.length) {
      return;
    }
    // 创建实例
    const instance: ContextMenu = new (Vue.extend(ContextMenu))({
      el: document.createElement('div'),
      propsData: { menu },
    }) as ContextMenu;

    // 插入实例
    document.body.appendChild(instance.$el);

    // 监听右键
    el.oncontextmenu = (e) => {
      e.stopPropagation();
      e.preventDefault();

      // 右键目标
      let target = e.target as HTMLElement;

      // 索引
      let index = '';

      while (target && el.contains(target) && !index) {
        if (target.dataset?.index) {
          index = target.dataset.index;
          break;
        }
        target = target.parentElement;
      }

      index = index || el.dataset?.index;

      // 没有索引
      if (index) {
        const menuRect = instance.$el.getBoundingClientRect();
        const { left, top } = rect(menuRect, e);
        instance.show({ left, top, menu, index });
      }
    };

    // 回调
    if (onSelect && typeof onSelect === 'function') {
      instance.$on('select', (value: string, options) => {
        onSelect(value, options);
      });
    }

    // 绑定实例
    el.__contextMenuInstance__ = instance;
  },
  unbind(el, binding, vnode) {
    // 移除实例
    if (el.__contextMenuInstance__) {
      el.__contextMenuInstance__.$destroy();
      el.__contextMenuInstance__.$off();
      document.body.removeChild(el.__contextMenuInstance__.$el);
      delete el.__contextMenuInstance__;
      const options = (binding.value || {}) as ContextMenuOptions;
      options.onSelect = null;
    }
    // 移除监听
    if (el.oncontextmenu) {
      el.removeEventListener('contextmenu', el.oncontextmenu);
      el.oncontextmenu = null;
    }
  },
};

export default vContextMenu;
