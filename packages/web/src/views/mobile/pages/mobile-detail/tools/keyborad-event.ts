import { useEditor, type MarkdownEditorInstance } from '@xynotes/editor';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

export const useMobileKeyboardAndScrollEvent = () => {
  // 控制工具栏显示状态
  const keyBoardHeight = ref(0);
  // 滚动位置
  const scrollY = ref(0);

  // 防抖定时器
  let scrollTimer: number | null = null;

  const { editorFocus } = useEditor() as MarkdownEditorInstance;

  // 底部距离
  const bottom = computed(() => {
    if (editorFocus.value) return keyBoardHeight.value - scrollY.value;
    return 0;
  });
  /**
   * 滚动事件
   */
  const scrollEvent = () => {
    if (scrollTimer) {
      window.cancelAnimationFrame(scrollTimer);
    }
    scrollTimer = window.requestAnimationFrame(() => {
      if (editorFocus.value && window.scrollY > 0) {
        scrollY.value = window.scrollY;
      }
      scrollTimer = null;
    });
  };
  // 监听键盘事件
  const handleKeyboardChange = () => {
    if (window.visualViewport) {
      keyBoardHeight.value = window.innerHeight - window.visualViewport.height;
    }
  };

  onMounted(() => {
    // 添加事件监听器
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleKeyboardChange);
    } else {
      window.addEventListener('resize', handleKeyboardChange);
    }
    window.addEventListener('scroll', scrollEvent, { passive: false });
  });

  onBeforeUnmount(() => {
    // 移除事件监听器
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', handleKeyboardChange);
    } else {
      window.removeEventListener('resize', handleKeyboardChange);
    }
    window.removeEventListener('scroll', scrollEvent);

    // 清除防抖定时器
    if (scrollTimer) {
      window.cancelAnimationFrame(scrollTimer);
    }
  });

  return {
    editorFocus,
    bottom,
    keyBoardHeight
  };
};

export const useMobileKeyboardEvent = () => {
  // 控制工具栏显示状态
  const keyBoardHeight = ref(0);

  // 监听键盘事件
  const handleKeyboardChange = () => {
    if (window.visualViewport) {
      keyBoardHeight.value = window.innerHeight - window.visualViewport.height;
    }
  };

  onMounted(() => {
    // 添加事件监听器
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleKeyboardChange);
    } else {
      window.addEventListener('resize', handleKeyboardChange);
    }
  });

  onBeforeUnmount(() => {
    // 移除事件监听器
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', handleKeyboardChange);
    } else {
      window.removeEventListener('resize', handleKeyboardChange);
    }
  });

  return {
    keyBoardHeight
  };
};
