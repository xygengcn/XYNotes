import Vue, { VNode } from 'vue';
import Confirm from '@/components/common/confirm';
import { IContextMenuOptions } from './contextmenu';
declare global {
  interface Window {
    debounceMap: Map;
    $ui: {
      toast: Toast;
      confirm: typeof Confirm;
    };
  }
}
