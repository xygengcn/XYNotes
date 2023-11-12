import Vue, { CreateElement, VNode } from "vue";
export class VueComponent<T> extends Vue {
  public __props!: T & { [prop: string]: any };
  data?(): Object;
  beforeCreate?(): void;
  created?(): void;
  beforeMount?(): void;
  mounted?(): void;
  beforeDestroy?(): void;
  destroyed?(): void;
  beforeUpdate?(): void;
  updated?(): void;
  activated?(): void;
  deactivated?(): void;
  render?(createElement: CreateElement): VNode | VNode[];
  errorCaptured?(err: Error, vm: Vue, info: string): boolean | undefined;
  serverPrefetch?(): Promise<unknown>;
}
