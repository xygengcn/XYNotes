export class Cookie {
  /**
   * 获取cookie
   * @param name
   * @returns
   */
  static getCookie(name: string) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return '';
  }
}
