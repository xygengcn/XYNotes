/**
 * 获取设备信息
 * @returns
 */
export function getDeviceType(): 'mobile' | 'desktop' | 'tablet' {
  const ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/i.test(ua),
    isSymbian = /(?:SymbianOS)/i.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/i.test(ua),
    isFireFox = /(?:Firefox)/i.test(ua),
    isTablet =
      /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/i.test(ua)) || (isFireFox && /(?:Tablet)/i.test(ua)),
    isPhone = /(?:iPhone)/i.test(ua) && !isTablet;

  // 移动端
  if (isPhone || isAndroid || isSymbian) {
    return 'mobile';
  }

  // 平板
  if (isTablet) {
    return 'tablet';
  }

  return 'desktop';
}

/**
 * 设备型号
 */
export const deviceType = getDeviceType();



