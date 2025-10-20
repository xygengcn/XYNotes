import { UploadService } from '@/services/upload';
import { Icon } from '@xynotes/components';
import { useEditor, type MarkdownEditorInstance } from '@xynotes/editor';
import type { Note } from '@xynotes/store';
import { isCheckOnlineSync } from '@xynotes/store/configs';
import { stopPropagation } from '@xynotes/utils';
import { defineComponent, type PropType } from 'vue';
import { showNoteGalleryDrawer } from '../../../plugins/gallery';
import './index.scss';
export const MobileDetailTools = defineComponent({
  name: 'MobileDetailTools',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup() {
    const { editorFocus, setImage, editor, setCodeBlock, setTable } = useEditor() as MarkdownEditorInstance;

    /**
     * 选择图片文件
     */
    const handleSelectImageFile = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      UploadService.select({ accept: 'image/*' }).then((files) => {
        UploadService.upload(files, (file) => {
          file &&
            setImage({
              src: file.originUrl,
              alt: file.name
            });
        });
      });
    };

    /**
     * 添加任务
     */
    const handleClickAddTodo = () => {
      editor.value.chain().focus().toggleTaskList().run();
    };

    /**
     * 添加表格
     */
    const handleClickAddTable = () => {
      setTable();
    };

    /**
     * 创建思维导图
     */
    const handleClickCreateMindMap = () => {
      setCodeBlock('mindmap', '- 主题1\n  - 主题2\n  - 主题3');
    };

    /**
     * 添加倒数日
     */
    const handleClickAddDays = () => {
      editor.value.chain().createDaysNodeDrawer().run();
    };

    return () => (
      <div class={{ 'mobile-detail-tools': true, focus: editorFocus.value }} onClick={stopPropagation}>
        <div class="mobile-detail-tools-item">
          <Icon type="photo" size={26} onClick={handleSelectImageFile}></Icon>
        </div>
        <div class="mobile-detail-tools-item" v-show={isCheckOnlineSync()}>
          <Icon type="gallery" size={24} onClick={showNoteGalleryDrawer}></Icon>
        </div>
        <div class="mobile-detail-tools-item">
          <Icon type="todo" size={24} onClick={handleClickAddTodo}></Icon>
        </div>
        <div class="mobile-detail-tools-item" onClick={handleClickCreateMindMap}>
          <Icon type="mind" size={24}></Icon>
        </div>
        <div class="mobile-detail-tools-item" onClick={handleClickAddTable}>
          <Icon type="table" size={24}></Icon>
        </div>
        <div class="mobile-detail-tools-item" onClick={handleClickAddDays}>
          <Icon type="days" size={24}></Icon>
        </div>
      </div>
    );
  }
});
