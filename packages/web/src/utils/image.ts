import html2canvas from 'html2canvas';
import { copy } from '.';
import { download } from './file';

/**
 * 生成图片下载
 * @param dom
 * @param filename
 * @returns
 */
export function screenshot(dom: HTMLDivElement, filename = 'XYNote'): Promise<any> {
  if (dom) {
    return html2canvas(dom, {
      allowTaint: true, // 跨域
      useCORS: true, // 跨域
      scale: 2,
    }).then((canvas) => {
      const image = canvas.toDataURL('image/png'); // 导出图片
      download(image, filename + '.png');
    });
  }
  return Promise.reject('节点不存在');
}

/**
 * 截图复制
 * @param dom
 * @param filename
 * @returns
 */
export function screenshotCopy(dom: HTMLDivElement): Promise<any> {
  if (dom) {
    return html2canvas(dom, {
      allowTaint: true, // 跨域
      useCORS: true, // 跨域
      scale: 2,
    }).then((canvas) => {
      canvas.toBlob(async (blob) => {
        return copy(blob);
      });
    });
  }
  return Promise.reject('节点不存在');
}
