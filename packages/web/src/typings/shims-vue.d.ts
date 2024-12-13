import { App, DirectiveBinding } from 'vue';
import { tippy } from 'vue-tippy';
import { IContextMenuOptions } from '@xynotes/components';
declare module 'vue' {
  interface HTMLAttributes {
    'v-contextmenu'?: IContextMenuOptions;
    'v-tippy'?: tippy;
  }
}
