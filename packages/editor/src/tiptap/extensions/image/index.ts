import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core';
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       * @param options The image attributes
       * @example
       * editor
       *   .commands
       *   .setImage({ src: 'https://tiptap.dev/logo.png', alt: 'tiptap', title: 'tiptap logo' })
       */
      insertImage: (options: { src: string; alt?: string; title?: string }) => ReturnType;
    };
  }
}

/**
 * Matches an image to a ![image](src "title") on input.
 */
export const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

const ImageExtension = Node.create({
  name: 'image',

  draggable: true,
  inline() {
    return true;
  },

  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      }
    };
  },

  group() {
    return 'inline';
  },
  addNodeView() {
    return ({ node, editor }) => {
      const dom = document.createElement('img-viewer') as HTMLImageElement;
      dom.classList.add('markdown-editor-image');
      for (const [key, value] of Object.entries(
        mergeAttributes(this.options.HTMLAttributes, node.attrs, { isEditable: editor.isEditable })
      )) {
        if (value !== undefined && value !== null) {
          dom.setAttribute(key, value);
        }
      }
      return {
        dom
      };
    };
  },
  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? 'img[src]' : 'img[src]:not([src^="data:"])'
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      insertImage:
        (options) =>
        ({ commands, tr, editor, dispatch }) => {
          commands.insertContent({
            type: this.name,
            attrs: { ...options, inline: true }
          });
          // 插入新的文本节点
          // const { selection } = tr;
          // const position = selection.$anchor.pos;
          // const text = editor.schema.text(' ');
          // commands.insertContentAt(position + 1, text);
          // 将选区移动到新段落的起始位置
          const newSelection = TextSelection.create(tr.doc, tr.selection.$from.end());
          tr.setSelection(newSelection);
          if (dispatch) tr.scrollIntoView();
          return true;
        }
    };
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match;

          return { src, alt, title };
        }
      })
    ];
  }
});

export default ImageExtension;
