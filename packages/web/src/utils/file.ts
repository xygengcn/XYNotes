/**
 * 文件下载
 */
export function download(content: string, filename: string): void {
  const aTag = document.createElement('a');
  aTag.download = filename;
  aTag.href = content;
  document.body.appendChild(aTag);
  aTag.click();
  aTag.remove(); // 下载之后把创建的元素删除
}

/**
 * 下载markdown
 * @param content
 * @param filename
 * @returns
 */
export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  return download(URL.createObjectURL(blob), filename);
}

/**
 * 读取json
 */
export function jsonFileReader() {
  return new Promise((resolve, reject) => {
    const dom = document.createElement('input');
    dom.type = 'file';
    dom.accept = '.json';
    dom.click();
    dom.onchange = (event) => {
      if (dom.files.length) {
        const file = dom.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const data = JSON.parse(reader.result.toString());
          resolve(data);
        };
        reader.readAsText(file);
        reader.onerror = (e) => {
          reject(e);
        };
      }
    };
  });
}
