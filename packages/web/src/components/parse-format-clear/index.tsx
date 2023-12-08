import noteEventBus from '@/event-bus';
import { copyText } from '@/utils';
import { createApp, defineComponent, ref } from 'vue';
import Dialog from '../common/dialog';
import Icon from '../common/icon';
import './index.scss';

const ParseFormatClear = defineComponent({
  name: 'ParseFormatClear',
  setup(props) {
    /**
     * 输入字符
     */
    const text = ref('');

    const refDialog = ref<typeof Dialog>();
    /**
     * 复制
     */
    const handleClickCopy = () => {
      copyText(text.value || '');
      window.$ui.toast('复制文本成功');
      refDialog.value.handleClose();
    };

    /**
     * 插入
     */
    const handleInsertEditor = () => {
      noteEventBus.emit('insert', text.value);
      refDialog.value.handleClose();
    };

    /**
     * 关闭
     */
    const handleClose = () => {
      text.value = '';
    };

    /**
     * 关闭
     */
    const handleInput = (e) => {
      text.value = e.target.value;
    };

    return () => (
      <Dialog ref={refDialog} title={'格式刷'} class="parse-format-clear-dialog" onClose={handleClose}>
        <div class="parse-format-clear-content">
          <div class="parse-format-clear-content-textarea">
            <textarea
              value={text.value}
              id=""
              cols="30"
              rows="10"
              placeholder="粘贴需要清理格式的文本"
              onInput={handleInput}
            ></textarea>
          </div>

          <div class="parse-format-clear-content-bottom">
            <span>
              <Icon type="item-copy" onClick={handleClickCopy}></Icon>
            </span>
            <span>
              <Icon type="item-text-insert" onClick={handleInsertEditor}></Icon>
            </span>
          </div>
        </div>
      </Dialog>
    );
  }
});

export default function showParseFormatClearDialog() {
  const instance = document.querySelector('#parse-format-clear-dialog');
  if (instance) {
    document.body.removeChild(instance);
  }
  const el = document.createElement('div');
  el.id = 'parse-format-clear-dialog';
  document.body.appendChild(el);
  const app = createApp(ParseFormatClear, {
    onClose() {
      app.unmount();
      el && document.body.removeChild(el);
    }
  });
  app.mount(el);
}
