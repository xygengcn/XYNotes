import { App } from 'vue';

type CallBack = (event: PointerEvent) => void;

export interface Input extends HTMLElement {
  _longPressTimer: number | null;
  _longPressDelay: number;
  _longPressIsStart: boolean;
  _longPressCallBack: CallBack;
  _longPressStart: CallBack;
  _longPressStop: CallBack;
  _longPressMove: CallBack;
  _longPressDestroy: () => void;
}

class VanillaLongPress {
  private readonly element: Input;

  constructor(element: HTMLElement, cb: CallBack, delay = 1300) {
    this.element = element as Input;
    this.element._longPressCallBack = cb;
    this.element._longPressStart = this.start;
    this.element._longPressStop = this.stop;
    this.element._longPressMove = this.move;
    this.element._longPressDelay = delay;
    this.element._longPressDestroy = this.destroy(this.element);
    this.element._longPressIsStart = false;
    this.element._longPressTimer = null;

    this.element.addEventListener('pointerdown', this.element._longPressStart);
    this.element.addEventListener('pointerup', this.element._longPressStop);
    this.element.addEventListener('pointermove', this.element._longPressMove);
  }

  private start(event: PointerEvent): void {
    const element = this as unknown as Input;

    if (element._longPressTimer === null && !element._longPressIsStart) {
      element._longPressIsStart = true;
      element._longPressTimer = window.setTimeout(() => {
        element._longPressCallBack(event);
        element._longPressStop(event);
      }, element._longPressDelay);
    }
  }

  private stop(): void {
    const element = this as unknown as Input;

    if (element._longPressTimer) {
      clearTimeout(element._longPressTimer);
    }
    element._longPressTimer = null;
    element._longPressIsStart = false;
  }

  private move(event: PointerEvent): void {
    const element = this as unknown as Input;

    if (element._longPressIsStart) {
      if (element._longPressTimer) {
        clearTimeout(element._longPressTimer);
      }
      element._longPressTimer = window.setTimeout(() => {
        element._longPressCallBack(event);
        element._longPressStop(event);
      }, element._longPressDelay);
    }
  }

  private destroy(element: HTMLElement): () => void {
    return () => {
      element.removeEventListener('pointerdown', this.start);
      element.removeEventListener('pinterup', this.stop);
      element.removeEventListener('pointermove', this.move);
    };
  }
}

function mounted(el: HTMLElement, binding: { value: () => void }) {
  new VanillaLongPress(el, binding.value, 500);
}
function beforeUnmount(el: Input) {
  el._longPressDestroy();
}

export default function VueLongPress(app: App) {
  app.directive('longPress', {
    mounted,
    beforeUnmount
  });
}
