import { App, DirectiveBinding } from 'vue';
import { tippy } from 'vue-tippy';
declare module 'vue' {
  interface HTMLAttributes {
    'v-contextmenu'?: IContextMenuOptions;
    'v-tippy'?: tippy;
  }
}
