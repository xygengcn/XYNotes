import { ListItem, BulletList } from '@tiptap/extension-list';

const ListItemExtension = ListItem.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'markdown-editor-list-item'
      }
    };
  }
});

const BulletListExtension = BulletList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'markdown-editor-list'
      }
    };
  }
});

export { ListItemExtension, BulletListExtension };
