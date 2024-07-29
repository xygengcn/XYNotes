import { onBeforeMount, onBeforeUnmount } from 'vue';

/**
 * 设置主题
 * @param color
 * @returns
 */
const setThemeColor = (color = '#f5f5f5') => {
  const dom = document.querySelector('meta[name="theme-color"]');
  return dom.setAttribute('content', color);
};
/**
 * 获取
 * @returns
 */
const getThemeColor = () => {
  const dom = document.querySelector('meta[name="theme-color"]');
  return dom.getAttribute('content');
};

/**
 * 切换主题
 * @param color
 */
export function useThemeColor(color: string) {
  let themeColor: string;
  onBeforeMount(() => {
    themeColor = getThemeColor();
    color && setThemeColor(color);
  });
  onBeforeUnmount(() => {
    themeColor && setThemeColor(themeColor);
  });
}
