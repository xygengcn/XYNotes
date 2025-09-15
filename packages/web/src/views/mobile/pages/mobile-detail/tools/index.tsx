import { useNoteTags } from '@/components/note-tags';
import { UploadService } from '@/services/upload';
import { Icon } from '@xynotes/components';
import { useEditor, type MarkdownEditorInstance } from '@xynotes/editor';
import type { Note } from '@xynotes/store';
import { isCheckOnlineSync } from '@xynotes/store/configs';
import { defineComponent, type PropType } from 'vue';
import { useMobileDetailGallery } from '../gallery';
import './index.scss';
export const MobileDetailTools = defineComponent({
  name: 'MobileDetailTools',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup(props) {
    const { editorFocus, setImage, editor } = useEditor() as MarkdownEditorInstance;
    const { showMobileDetailGalleryView, MobileDetailGalleryView } = useMobileDetailGallery();
    const { show: showNoteTags, view: NoteTagsView } = useNoteTags(props.note);

    /**
     * 选择图片文件
     */
    const handleSelectImageFile = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      UploadService.select({ accept: 'image/*' }).then((files) => {
        UploadService.upload(files, (file) => {
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

    const handleClickAddTag = () => {
      showNoteTags();
    };

    return () => (
      <div class={{ 'mobile-detail-tools': true, focus: editorFocus.value }}>
        <div class="mobile-detail-tools-item">
          <Icon type="photo" size={26} onClick={handleSelectImageFile}></Icon>
        </div>
        <div class="mobile-detail-tools-item" v-show={isCheckOnlineSync()}>
          <Icon type="gallery" size={24} onClick={showMobileDetailGalleryView}></Icon>
        </div>
        <div class="mobile-detail-tools-item">
          <Icon type="todo" size={24} onClick={handleClickAddTodo}></Icon>
        </div>
        <div class="mobile-detail-tools-item" onClick={handleClickAddTag}>
          <Icon type="tags" size={24}></Icon>
        </div>
        <NoteTagsView></NoteTagsView>
        <MobileDetailGalleryView></MobileDetailGalleryView>
      </div>
    );
  }
});
