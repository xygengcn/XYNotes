import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop, Ref } from 'vue-property-decorator';
import './index.scss';
import Dialog from '../common/dialog';
import Icon from '../common/icon';
import { copyText } from '@/utils';
import noteEventBus from '@/event-bus';

interface IScreenshotProps {
  width?: string;
  height?: string;
}

@Component({
  name: 'Screenshot',
})
export class Screenshot extends VueComponent<IScreenshotProps> {
  /**
   * 弹窗
   */
  @Ref() private readonly refDialog!: Dialog;
  /**
   * 长宽
   */
  @Prop({ default: '400px' }) private readonly width!: string;
  @Prop({ default: '500px' }) private readonly height!: string;

  /**
   * 输入字符
   */
  private text = '';

  /**
   * 显示
   * @param note
   */
  public show(): void {
    this.refDialog.show();
  }

  /**
   * 复制
   */
  private handleClickCopy() {
    copyText(this.text || '');
    window.$ui.toast('复制文本成功');
    this.refDialog.close();
  }

  /**
   * 插入
   */
  private handleInsertEditor() {
    noteEventBus.emit('insert', this.text);
    this.refDialog.close();
  }

  private handleClose() {
    this.text = '';
  }

  private handleInput(e) {
    this.text = e.target.value;
  }

  public render(): VNode {
    return (
      <Dialog
        width={this.width}
        height={this.height}
        ref="refDialog"
        title={'格式刷'}
        class="parse-format-clear-dialog"
        onclose={this.handleClose}
      >
        <div class="parse-format-clear-content">
          <div class="parse-format-clear-content-textarea">
            <textarea
              value={this.text}
              id=""
              cols="30"
              rows="10"
              placeholder="粘贴需要清理格式的文本"
              onInput={this.handleInput}
            ></textarea>
          </div>

          <div class="parse-format-clear-content-bottom">
            <span>
              <Icon
                type="item-copy"
                onclick={this.handleClickCopy}
                v-tippy={{ placement: 'top', content: '复制' }}
              ></Icon>
            </span>
            <span>
              <Icon
                type="item-text-insert"
                onclick={this.handleInsertEditor}
                v-tippy={{ placement: 'top', content: '插入' }}
              ></Icon>
            </span>
          </div>
        </div>
      </Dialog>
    );
  }
}

let parseFormatClearDialogInstance: Screenshot | null = null;
export default function showParseFormatClearDialog(): Screenshot {
  if (!parseFormatClearDialogInstance) {
    const panel = document.querySelector('#parse-format-clear-dialog');
    if (panel) {
      document.removeChild(panel);
    }
    const el = document.createElement('div');
    el.id = 'parse-format-clear-dialog';
    document.body.appendChild(el);
    parseFormatClearDialogInstance = new Screenshot({}).$mount(el);
  }
  parseFormatClearDialogInstance.show();
  return parseFormatClearDialogInstance;
}
