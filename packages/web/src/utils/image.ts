import html2canvas from 'html2canvas';
import { copy } from '.';
import { download } from './file';
import { writeBinaryFile } from '@tauri-apps/api/fs';
import { save } from '@tauri-apps/api/dialog';
import is from './is';

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
      scale: 2
    }).then(async (canvas) => {
      const image = canvas.toDataURL('image/png'); // 导出图片
      // 兼容客户端
      if (is.app()) {
        const path = await save({
          title: filename,
          defaultPath: filename + '.png'
        });
        return writeBinaryFile(path, await fetch(image).then((res) => res.arrayBuffer()));
      }
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
      scale: 2
    }).then((canvas) => {
      canvas.toBlob(async (blob) => {
        return copy(blob);
      });
    });
  }
  return Promise.reject('节点不存在');
}
