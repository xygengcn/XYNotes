import Vue, { VNode } from 'vue';
import { Confirm, Toast } from '@xynotes/components';
declare global {
  interface Window {
    debounceMap: Map;
    $ui: {
      toast: Toast;
      confirm: typeof Confirm;
    };
  }
}
