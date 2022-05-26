import { CSSStyleDisplay } from '@/typings/enum/global';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import './index.scss';
export interface EditorControllerOptions extends IOptions {
  toolbarConfig?: {
    hide?: boolean;
    pin?: boolean;
    disable?: boolean;
  };
  onChange?: (value: string) => void;
  onCreated?: (controller: EditorController) => void;
  onMounted?: (controller: EditorController) => void; // 等同after
  onUpdated?: (controller: EditorController, mutation: MutationRecord) => void; // 编辑器内部dom发生改变
}

export class EditorController extends Vditor {
  // 输入计时器
  private inputToChangeTimeOut: number | null = null;

  // 缓存写入值
  private cacheValue = '';

  // 编辑器观察者
  private editorObserver!: MutationObserver | null;

  // 是否加载完
  public isMounted = false;

  // 初始化
  constructor(el: string | HTMLDivElement, options: EditorControllerOptions) {
    super(el, {
      ...options,
      input: (value: string) => {
        options.input?.(value);
        this.onChange(value, options);
      },
      after: () => {
        options.after?.();
        options.onMounted?.(this);
        this.onMounted(options);
        this.onUpdated(el, options);
      },
    });
    options.onCreated?.(this);
  }

  /**
   * 大纲开关
   * @returns
   */
  public outlineToggle(show?: boolean): IVditor {
    if (typeof show === 'boolean') {
      if (show) {
        this.vditor.outline.toggle(this.vditor, true);
      } else {
        this.vditor.outline.toggle(this.vditor, false);
      }
    } else {
      if (this.vditor.outline.element.style.display === CSSStyleDisplay.none) {
        this.vditor.outline.toggle(this.vditor, true);
      } else {
        this.vditor.outline.toggle(this.vditor, false);
      }
    }
    return this.vditor;
  }

  /**
   * 设置
   *
   * 重写赋值,避免未加载完就开始赋值
   * @param markdown
   * @param clearStack
   */
  public setValue(markdown: string, clearStack?: boolean): void {
    if (!this.isMounted) {
      this.cacheValue = markdown;
    } else {
      super.setValue(markdown, clearStack);
    }
  }

  /**
   * 工具栏开关
   */
  public toolbalToggle(show?: boolean): IVditor {
    if (typeof show === 'boolean') {
      if (this.vditor.toolbar?.element) {
        if (show) {
          this.vditor.toolbar.element.style.display = CSSStyleDisplay.block;
        } else {
          this.vditor.toolbar.element.style.display = CSSStyleDisplay.none;
        }
      }
    } else if (this.vditor.toolbar?.element) {
      if (this.vditor.toolbar.element.style.display === CSSStyleDisplay.none) {
        this.vditor.toolbar.element.style.display = CSSStyleDisplay.block;
      } else {
        this.vditor.toolbar.element.style.display = CSSStyleDisplay.none;
      }
    }
    return this.vditor;
  }

  /**
   * 节点更新
   * @param options
   */
  private onUpdated(el: string | HTMLDivElement, options: EditorControllerOptions): void {
    if (options.onUpdated) {
      this.editorObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          options.onUpdated?.(this, mutation);
        });
      });
      const dom = typeof el === 'string' ? document.getElementById(el) : el;
      dom &&
        this.editorObserver.observe(dom, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        });
    }
  }

  /**
   * 初始化结束
   */
  private onMounted(options: EditorControllerOptions): void {
    this.isMounted = true;
    if (this.cacheValue) {
      this.setValue(this.cacheValue);
      this.cacheValue = '';
    }
    if (options.toolbarConfig?.disable) {
      this.toolbalToggle(false);
    }
  }

  /**
   * 600ms触发
   * @param value
   * @param options
   */
  private onChange(value: string, options: EditorControllerOptions): void {
    if (this.inputToChangeTimeOut) {
      clearTimeout(this.inputToChangeTimeOut);
    }
    this.inputToChangeTimeOut = window.setTimeout(() => {
      options.onChange?.(value);
    }, 600);
  }

  // 销毁
  public destroy(): void {
    super.destroy();
    this.inputToChangeTimeOut && clearTimeout(this.inputToChangeTimeOut);
    this.inputToChangeTimeOut = null;
    this.editorObserver?.disconnect();
    this.editorObserver = null;
  }
}
