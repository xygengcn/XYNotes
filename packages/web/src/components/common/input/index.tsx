import { Note } from '@/services/note';
import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import './index.scss';

interface IInputProps {
  value?: string | number;
  oninput?: (value: string) => void;
  onchange?: (value: string) => void;
  onblur?: (e: Event) => void;
}

@Component
export default class Input extends VueComponent<IInputProps> {
  @Prop() private readonly value!: Note;

  /**
   * 输入计时器
   */
  private inputTimeOut: number | null = null;

  /**
   * 输入
   * @param e
   */
  private handleInput(e: InputEvent): void {
    this.$emit('input', (e.target as HTMLInputElement).value);
    this.handleChange(e);
  }

  /**
   * 失去焦点
   * @param e
   */
  private handleBlur(e: Event) {
    this.inputTimeOut && clearTimeout(this.inputTimeOut);
    this.$emit('blur', e);
  }

  /**
   * 500ms延迟
   *
   * @param e
   */
  private handleChange(e: InputEvent): void {
    if (this.inputTimeOut) {
      clearTimeout(this.inputTimeOut);
    }
    this.inputTimeOut = window.setTimeout(() => {
      this.$emit('change', (e.target as HTMLInputElement).value);
      this.inputTimeOut && clearTimeout(this.inputTimeOut);
    }, 500);
  }

  public render(): VNode {
    return (
      <div class="input" data-nodrag>
        <div class="input-content">
          <input
            class="input-content-inner"
            type="text"
            value={this.value}
            oninput={this.handleInput}
            onblur={this.handleBlur}
          />
        </div>
      </div>
    );
  }

  public beforeDestroy() {
    this.inputTimeOut && clearTimeout(this.inputTimeOut);
  }
}
