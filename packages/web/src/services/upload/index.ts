import { ApiEvent } from '@xynotes/store';
import { isCheckOnlineSync } from '@xynotes/store/configs';
import type { IUploadFile } from 'node_modules/@xynotes/store/dist/typings/assets';

export class UploadService {
  /**
   * 选择文件
   * @param options
   * @returns
   */
  static select(options: { accept: string }) {
    return new Promise<FileList>((resolve) => {
      // 创建一个隐藏的文件输入元素
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = options.accept || 'image/*';
      fileInput.style.display = 'none';
      // 监听文件选择事件
      fileInput.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        resolve(files);

        document.body.removeChild(fileInput);
      };

      // 将文件输入元素添加到页面并触发点击事件
      document.body.appendChild(fileInput);
      fileInput.click();
    });
  }

  /**
   * 上传文件
   * @param files
   * @param setImage
   * @returns
   */
  static upload(files: FileList, setImage: (file: IUploadFile) => void) {
    if (!files.length) {
      return;
    }
    for (const file of files) {
      // 图片
      if (file.type.startsWith('image/')) {
        if (isCheckOnlineSync()) {
          ApiEvent.api.apiFetchResourceUpload(file).then((file) => {
            setImage(file);
          });
        } else {
          setImage({
            originUrl: URL.createObjectURL(file),
            size: file.size,
            name: file.name,
            mimeType: file.type
          });
        }
      }
    }
  }
}
