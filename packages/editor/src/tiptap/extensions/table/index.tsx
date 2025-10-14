import { TableKit, TableView } from '@tiptap/extension-table';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import './index.scss';

class TableViewPlus extends TableView {
  constructor(node: ProseMirrorNode, cellMinWidth: number) {
    super(node, cellMinWidth);
    this.dom.classList.add('markdown-editor-table');
  }
}

export const TableExtension = TableKit.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      table: {
        resizable: true,
        allowTableNodeSelection: true,
        lastColumnResizable: true,
        View: TableViewPlus
      }
    };
  }
});
