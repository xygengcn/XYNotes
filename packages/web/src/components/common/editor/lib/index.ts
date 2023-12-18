import { CSSStyleDisplay } from '@/typings/enum/global';
import Vditor from 'vditor-lite';
import 'vditor-lite/dist/index.css';
import './index.scss';

/**
 * cdn 地址
 */
export const VDITOR_CDN = 'https://cdn.bootcdn.net/ajax/libs/vditor/3.9.5';

export interface EditorControllerOptions extends IOptions {
  // 文本变化
  onChange?: (value: string) => void;

  // 开始创建
  onCreated?: (controller: EditorController) => void;

  // 等同after
  onMounted?: (controller: EditorController) => void;

  // 编辑器内部dom发生改变
  onUpdated?: (controller: EditorController, mutation: MutationRecord) => void;

  // 字数发生变化
  onCounter?: (length: number) => void;

  // 失去焦点
  onBlur?: (value: string) => void;
}

export class EditorController extends Vditor {
  // 缓存写入值
  private cacheValue = '';

  // 编辑器观察者
  private editorObserver!: MutationObserver | null;

  // 是否加载完
  public isMounted = false;

  // 初始化
  constructor(el: string | HTMLDivElement, options: EditorControllerOptions) {
    const dom = typeof el === 'string' ? document.getElementById(el) : el;

    super(dom, {
      ...options,
      cdn: VDITOR_CDN,
      // 字数
      counter: {
        enable: !!options.onCounter,
        after(count) {
          options.onCounter?.(count);
        }
      },
      input: (value: string) => {
        options.input?.(value);
        this.onChange(value, options);
      },
      after: () => {
        options.after?.();
        this.onUpdated(dom, options);
        if (!this.isMounted) {
          options.onMounted?.(this);
        }
        this.onMounted(options);
      },
      blur(value) {
        options.onBlur?.(value);
      }
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
  public setValue(markdown: string, clearStack: boolean = true): void {
    if (!this.isMounted) {
      this.cacheValue = markdown;
    } else {
      super.setValue(markdown, clearStack);
    }
  }

  /**
   * 节点更新
   * @param options
   */
  private onUpdated(el: HTMLElement, options: EditorControllerOptions): void {
    if (options.onUpdated) {
      this.editorObserver = new MutationObserver((mutations) => {
        // 非初始化
        if (this.isMounted) {
          mutations.forEach((mutation) => {
            options.onUpdated?.(this, mutation);
          });
        }
      });
      el &&
        this.editorObserver.observe(el, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
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
  }

  /**
   * 600ms触发
   * @param value
   * @param options
   */
  private onChange(value: string, options: EditorControllerOptions): void {
    options.onChange?.(value);
  }

  // 销毁
  public destroy(): void {
    super.destroy();
    this.editorObserver?.disconnect();
    this.editorObserver = null;
  }
}
