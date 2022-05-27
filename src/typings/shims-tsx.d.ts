import Vue, { VNode } from 'vue';
import Confirm from '@/components/common/comfirm';
declare global {
  interface Window {
    debounceMap: Map;
    $ui: {
      toast: Toast;
      confirm: typeof Confirm;
    };
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
