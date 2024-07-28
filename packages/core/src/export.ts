import { App } from 'vue';
import MarkdownEditor from './components/editor';

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
