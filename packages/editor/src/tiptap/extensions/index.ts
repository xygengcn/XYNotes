import Document from '@tiptap/extension-document';
import HistoryExtension from '@tiptap/extension-history';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Text from '@tiptap/extension-text';
import { Markdown } from 'tiptap-markdown';
import BlockquoteExtension from './blockquote';
import BoldExtension from './bold';
import { BulletListExtension, ListItemExtension } from './bullet-list';
import { CharacterCountExtension } from './character-count';
import CodeExtension from './code';
import CodeBlockExtension from './code-block';
import HeadingExtension from './heading';
import HighlightExtension from './highlight';
import ImageExtension from './image';
import ItalicExtension from './italic';
import LinkExtension from './link';
import ParagraphExtension from './paragraph';
import StrikeExtension from './strike';
import { TaskItemExtension, TaskListExtension } from './task-list';
import PasteExtension from './paste-event';
import { Placeholder } from '@tiptap/extensions';

/**
 * 通用编辑器扩展
 */
export const CommonExtension = () => [
  Text,
  HistoryExtension,
  Document,
  LinkExtension,
  TableRow,
  TableHeader,
  TableCell,
  Table.configure({
    HTMLAttributes: {
      class: 'markdown-editor-table'
    }
  }),
  Markdown.configure({
    breaks: true,
    transformPastedText: true
    // transformCopiedText: true // 会影响复制的内容
  }),

  // 标题
  HeadingExtension,
  // 段落
  ParagraphExtension,
  // 引用
  BlockquoteExtension,
  // 列表
  BulletListExtension,
  ListItemExtension,
  // 任务清单
  TaskListExtension,
  TaskItemExtension,
  // 图片
  ImageExtension,
  // 代码块
  CodeBlockExtension,
  // 代码片段
  CodeExtension,
  // 加粗
  BoldExtension,
  // 斜体
  ItalicExtension,
  // 删除线
  StrikeExtension,
  // 高亮
  HighlightExtension,
  // 字数
  CharacterCountExtension,
  // 粘贴事件
  PasteExtension,
  Placeholder.configure({
    placeholder: '开始创作你的笔记吧...'
  })
];

/**
 * 可编辑
 */
export const EditorExtension = () => {
  const extension = [];
  return extension;
};
