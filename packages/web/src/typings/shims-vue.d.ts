import { type tippy } from 'vue-tippy';
import { type IContextMenuOptions } from '@xynotes/components';
declare module 'vue' {
  interface HTMLAttributes {
    'v-contextmenu'?: IContextMenuOptions;
    'v-tippy'?: tippy;
  }
}

export {};
