import { DefineComponent, onBeforeUnmount, onMounted, reactive, ShallowRef } from 'vue';

/**
 * 滚动hook
 * @param el
 * @returns
 */
export const useScroll = (el: ShallowRef<HTMLElement> | ShallowRef<DefineComponent<any>>) => {
  const scrollerState = reactive({ top: 0, bottom: 0 });
  const onScroll = (e: Event) => {
    // 距离顶部多少
    scrollerState.top = (e.target as HTMLElement).scrollTop;
    // 距离底部多少
    scrollerState.bottom =
      (e.target as HTMLElement).scrollHeight -
      (e.target as HTMLElement).clientHeight -
      (e.target as HTMLElement).scrollTop;
  };

  // 滚动问题
  onMounted(() => {
    // 判断el是vue组件
    if (el.value instanceof HTMLElement) {
      el.value.addEventListener('scroll', onScroll);
    } else {
      (el.value as DefineComponent).$el.addEventListener('scroll', onScroll);
    }
  });
  onBeforeUnmount(() => {
    // 判断el是vue组件
    if (el.value instanceof HTMLElement) {
      el.value.removeEventListener('scroll', onScroll);
    } else {
      (el.value as DefineComponent).$el.removeEventListener('scroll', onScroll);
    }
  });

  return {
    scrollerState
  };
};
