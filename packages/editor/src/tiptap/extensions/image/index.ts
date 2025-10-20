import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core';
import { TextSelection } from '@tiptap/pm/state';
import './index.scss';
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
  group: 'block',
  draggable: true,
  selectable: true,
  priority: 1000,
  atom: true,
  content: 'inline*',

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
        dom,
        content: null
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
        ({ commands, tr, dispatch }) => {
          commands.insertContent({
            type: this.name,
            attrs: { ...options, inline: true }
          });
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
