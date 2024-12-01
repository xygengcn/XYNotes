import { stopPropagation } from '@xynotes/utils';

export function createCodeBlock(lang: string, code: string, isEditable: boolean, onChange: (e) => void) {
  // 创建根元素
  const codeBlock = document.createElement('pre');
  codeBlock.className = 'markdown-editor-codeblock';
  codeBlock.setAttribute('data-language', lang);

  // 创建头部容器
  const header = document.createElement('div');
  header.className = 'markdown-editor-codeblock-header';

  // 创建头部图标容器
  const headerIcon = document.createElement('div');
  headerIcon.className = 'markdown-editor-codeblock-header-icon';

  // 创建三个图标
  for (let i = 0; i < 3; i++) {
    const icon = document.createElement('i');
    headerIcon.appendChild(icon);
  }

  // 创建语言选择容器
  const headerLang = document.createElement('div');
  headerLang.className = 'markdown-editor-codeblock-header-lang';

  // 创建语言选择内容容器
  const headerLangContent = document.createElement('div');
  headerLangContent.className = 'markdown-editor-codeblock-header-lang-content';

  // 创建输入框
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'markdown-editor-codeblock-header-lang-content-input';
  input.value = lang;

  // 添加事件监听器
  if (isEditable) {
    input.oninput = stopPropagation;
    input.onkeydown = stopPropagation;
    input.onkeyup = stopPropagation;
    input.onmousedown = stopPropagation;
    input.onmouseup = stopPropagation;
    input.onchange = onChange;
  } else {
    input.disabled = true;
  }

  // 将输入框添加到语言选择内容容器
  headerLangContent.appendChild(input);

  // 将语言选择内容容器添加到语言选择容器
  headerLang.appendChild(headerLangContent);

  // 将头部图标容器和语言选择容器添加到头部容器
  header.appendChild(headerIcon);
  header.appendChild(headerLang);

  // 创建代码内容容器
  const codeContent = document.createElement('code');
  codeContent.className = 'markdown-editor-codeblock-content';
  codeContent.textContent = code;
  codeContent.setAttribute('spellcheck', 'false');

  // 将头部容器和代码内容容器添加到根元素
  codeBlock.appendChild(header);
  codeBlock.appendChild(codeContent);

  return {
    codeBlock,
    codeContent,
    input
  };
}
