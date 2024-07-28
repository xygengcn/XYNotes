import { App } from 'vue';
import MarkdownEditor from './components/editor';

export type { Editor, EditorContent } from '@tiptap/vue-3';
export { MarkdownEditor };

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
