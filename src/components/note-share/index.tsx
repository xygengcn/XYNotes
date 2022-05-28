import { Note } from '@/services/note';
import { VueComponent } from '@/shims-vue';
import { VNode } from 'vue';
import { Component, Prop, Ref } from 'vue-property-decorator';
import './index.scss';
import { screenshot, screenshotCopy } from '@/utils/image';
import Loading from '../common/loading';
import Dialog from '../common/dialog';
import { downloadFile } from '@/utils/file';
import { copyText } from '@/utils';
import Editor from '../common/editor';

interface IScreenshotProps {
  width?: string;
  height?: string;
  menu?: string[];
}

@Component({
  name: 'Screenshot',
})
export class Screenshot extends VueComponent<IScreenshotProps> {
  /**
   * 菜单
   */
  @Prop({ default: () => ['md', 'image', 'copyText', 'copyImage', 'copyJson'] })
  private readonly menu!: string[];

  /**
   * 长宽
   */
  @Prop({ default: '65%' }) private readonly width!: string;
  @Prop({ default: '80%' }) private readonly height!: string;

  /**
   * 编辑器
   */
  @Ref() private readonly refScreenshotPreview!: Editor;

  /**
   * 弹窗
   */
  @Ref() private readonly refDialog!: Dialog;
  /**
   * 当前笔记
   */
  private note: Note | null = null;

  /**
   * 加载
   */
  private loading = false;

  /**
   * 显示
   * @param note
   */
  public show(note: Note): void {
    this.note = note;
    this.refDialog.show();
  }

  /**
   * 下载
   */
  private handleClickDownalodScreenshot(): Promise<any> {
    this.loading = true;
    // 生成截图
    return screenshot(this.refScreenshotPreview.editorContent, this.note?.title).then(() => {
      this.loading = false;
    });
  }

  /**
   * 复制图片
   * @returns
   */
  private handleClickCopyImage() {
    this.loading = true;
    // 生成截图
    return screenshotCopy(this.refScreenshotPreview.editorContent).then(() => {
      this.loading = false;
      window.$ui.toast('复制图片成功');
    });
  }

  /**
   * markdown下载
   */
  private handleClickDownloadMarkdown() {
    downloadFile(this.note?.text || '', `${this.note?.title || 'XYNote'}.md`);
  }

  /**
   * 复制文本
   */
  private handleClickCopyText() {
    copyText(this.note?.text || '');
    window.$ui.toast('复制文本成功');
  }

  /**
   * 复制数据结构
   */
  private handleClickCopyJson() {
    copyText(JSON.stringify(this.note) || '');
    window.$ui.toast('复制数据成功');
  }

  public render(): VNode {
    return (
      <Dialog width={this.width} height={this.height} ref="refDialog" class="note-share-dialog">
        <div class="note-share-content">
          <div class="note-share-content-top">
            <span>{this.note?.title}</span>
          </div>
          <div class="note-share-content-preview">
            <Editor ref="refScreenshotPreview" value={this.note?.text || ''} type="preview" />
          </div>
          <div class="note-share-content-bottom">
            {this.menu.includes('md') && (
              <span class="button" onclick={this.handleClickDownloadMarkdown}>
                Markdown
              </span>
            )}
            {this.menu.includes('copyText') && (
              <span
                class="button"
                vDebounce={() => {
                  this.handleClickCopyText();
                }}
              >
                复制文本
              </span>
            )}
            {this.menu.includes('image') && (
              <span class="button" onclick={this.handleClickDownalodScreenshot}>
                下载图片
              </span>
            )}
            {this.menu.includes('copyImage') && (
              <span class="button" onclick={this.handleClickCopyImage}>
                复制图片
              </span>
            )}
            {this.menu.includes('copyJson') && (
              <span
                class="button"
                vDebounce={() => {
                  this.handleClickCopyJson();
                }}
              >
                复制数据
              </span>
            )}
          </div>
          {this.loading && (
            <div class="note-share-content-loading">
              <Loading text="加载中" />
            </div>
          )}
        </div>
      </Dialog>
    );
  }
}

let noteShareDialogInstance: Screenshot | null = null;
export default function showShareNoteDialog(note: Note, propsData: IScreenshotProps = {}): Screenshot {
  if (!noteShareDialogInstance) {
    const panel = document.querySelector('#Screenshot');
    if (panel) {
      document.removeChild(panel);
    }
    const el = document.createElement('div');
    el.id = 'Screenshot';
    document.body.appendChild(el);
    noteShareDialogInstance = new Screenshot({ propsData }).$mount(el);
  }
  noteShareDialogInstance.show(note);
  return noteShareDialogInstance;
}
