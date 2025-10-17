import Document from '@tiptap/extension-document';
import HistoryExtension from '@tiptap/extension-history';
import Text from '@tiptap/extension-text';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import UniqueID from '@tiptap/extension-unique-id';
import { Focus, Placeholder } from '@tiptap/extensions';
import { Markdown } from 'tiptap-markdown';
import BlockquoteExtension from './blockquote';
import BoldExtension from './bold';
import { BulletListExtension, ListItemExtension } from './bullet-list';
import { CharacterCountExtension } from './character-count';
import CodeExtension from './code';
import CodeBlockExtension from './code-block';
import DaysExtension from './days';
import HeadingExtension from './heading';
import HighlightExtension from './highlight';
import ImageExtension from './image';
import ItalicExtension from './italic';
import LinkExtension from './link';
import ParagraphExtension from './paragraph';
import PasteExtension from './paste-event';
import StrikeExtension from './strike';
import { TableExtension } from './table';
import { TaskItemExtension, TaskListExtension } from './task-list';
/**
 * 通用编辑器扩展
 */
export const CommonExtension = () => [
  Text,
  TextStyle,
  Color,
  HistoryExtension,
  Document,
  LinkExtension,
  TableExtension,
  Markdown.configure({
    breaks: true,
    transformPastedText: false
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
  // 默认值
  Placeholder.configure({
    placeholder: '开始创作你的笔记吧...'
  }),
  // 聚焦
  Focus.configure({
    className: 'has-focus',
    mode: 'deepest'
  }),
  // 自定义组件
  DaysExtension,
  // 唯一ID
  UniqueID.configure({
    types: ['taskList', 'taskItem']
  })
];

/**
 * 可编辑
 */
export const EditorExtension = () => {
  const extension = [];
  return extension;
};
