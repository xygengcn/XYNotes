import Document from '@tiptap/extension-document';
import link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Text from '@tiptap/extension-text';
import { Markdown } from 'tiptap-markdown';
import BlockquoteExtension from './blockquote';
import BoldExtension from './bold';
import { BulletListExtension, ListItemExtension } from './bullet-list';
import CodeExtension from './code';
import CodeBlockExtension from './code-block';
import HeadingExtension from './heading';
import HighlightExtension from './highlight';
import ImageExtension from './image';
import ItalicExtension from './italic';
import ParagraphExtension from './paragraph';
import StrikeExtension from './strike';
import { TaskItemExtension, TaskListExtension } from './task-list';
import { CharacterCountExtension } from './character-count';

/**
 * 编辑器扩展
 */
export default [
  Text,
  Document,
  link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'markdown-editor-link',
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }),
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
  CharacterCountExtension
];
