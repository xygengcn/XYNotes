import html2canvas from 'html2canvas';
import { copyBlob } from './clipboard';
import { download } from './file';
import is from './is';

/**
 * 生成图片下载
 * @param dom
 * @param filename
 * @returns
 */
export async function screenshot(dom: HTMLDivElement, filename = 'XYNote'): Promise<void> {
  if (dom) {
    return html2canvas(dom, {
      allowTaint: true, // 跨域
      useCORS: true, // 跨域
      scale: 2
    }).then(async (canvas) => {
      const image = canvas.toDataURL('image/png'); // 导出图片
      // 兼容客户端
      if (is.app()) {
        const path = await window.$appWindow.showDirDialog({
          title: filename,
          /**
           * TODO 因为中文名字会导致下载失败
           *
           * @link https://github.com/tauri-apps/plugins-workspace/issues/1478
           */
          defaultPath: filename + '.png'
        });
        if (path) {
          const byte = await fetch(image).then((res) => res.arrayBuffer());
          return window.$appWindow.writeFile(path, new Uint8Array(byte));
        }
        throw new Error('未选择路径');
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
        return copyBlob(blob);
      });
    });
  }
  return Promise.reject('节点不存在');
}
