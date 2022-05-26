import Vue, { VNode } from 'vue';

declare global {
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
