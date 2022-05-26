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
