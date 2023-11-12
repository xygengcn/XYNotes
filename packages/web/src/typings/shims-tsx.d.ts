import Vue, { VNode } from 'vue';
import Confirm from '@/components/common/confirm';
import { ContextMenuOptions } from './contextmenu';
declare global {
  interface Window {
    debounceMap: Map;
    $ui: {
      toast: Toast;
      confirm: typeof Confirm;
    };
  }

  interface HTMLElement {
    __vue__: Vue;
    __contextMenuInstance__: Vue;
  }
  namespace JSX {
    interface Element extends VNode {}

    interface ElementClass extends Vue {}

    interface ElementAttributesProperty {
      __props: any;
    }

    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'vue/types/jsx' {
  interface HTMLAttributes {
    // 右键
    vContextmenu?: ContextMenuOptions;
  }
}
