import { getCurrentInstance, onBeforeUnmount, onMounted, reactive } from 'vue';

/**
 * 滚动hook
 * @param el
 * @returns
 */
export const useScroller = (refKey: string) => {
  const instance = getCurrentInstance();
  const state = reactive({ top: 0, bottom: 0 });
  const onScroll = (e: Event) => {
    // 距离顶部多少
    state.top = (e.target as HTMLElement).scrollTop;
    // 距离底部多少
    state.bottom =
      (e.target as HTMLElement).scrollHeight -
      (e.target as HTMLElement).clientHeight -
      (e.target as HTMLElement).scrollTop;
  };

  // 滚动问题
  onMounted(() => {
    const el = instance.refs[refKey];
    // 判断el是vue组件
    if (el instanceof HTMLElement) {
      el.addEventListener('scroll', onScroll);
    }
  });
  onBeforeUnmount(() => {
    const el = instance.refs[refKey];
    // 判断el是vue组件
    if (el instanceof HTMLElement) {
      el.removeEventListener('scroll', onScroll);
    }
  });

  return {
    state
  };
};
