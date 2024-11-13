import { App } from 'vue';
import MarkdownEditor from './editor/index';
import { defineMarkdownEditor } from './editor/hook';

export type { Editor, EditorContent } from '@tiptap/vue-3';
export { MarkdownEditor, defineMarkdownEditor };

export default {
  install(app: App) {
    app.component('MarkdownEditor', MarkdownEditor);
  }
};

declare module 'vue' {
  export interface GlobalComponents {
    MarkdownEditor: typeof MarkdownEditor;
  }
}
