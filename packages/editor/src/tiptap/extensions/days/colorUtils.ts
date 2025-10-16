/**
 * 随机颜色列表 - 柔和且适合白色文字的颜色
 */
const SOFT_COLORS = [
  '#FF9AA2', // 柔和粉红色
  '#FFB7B2', // 柔和桃红色
  '#FFDAC1', // 柔和橙色
  '#E2F0CB', // 柔和绿色
  '#B5EAD7', // 柔和薄荷绿
  '#C7CEEA', // 柔和薰衣草紫
  '#a2dddd', // 柔和天蓝色
  '#F4C2C2', // 柔和玫瑰红
  '#FFD1DC', // 柔和樱花粉
  '#D4F0F0' // 柔和天蓝色
];

/**
 * 从预定义的颜色中随机选择一个
 * @returns 随机颜色编码
 */
export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * SOFT_COLORS.length);
  return SOFT_COLORS[randomIndex];
}
