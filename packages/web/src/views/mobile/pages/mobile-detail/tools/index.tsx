import { UploadService } from '@/services/upload';
import { Icon } from '@xynotes/components';
import { useEditor, type MarkdownEditorInstance } from '@xynotes/editor';
import { isCheckOnlineSync } from '@xynotes/store/configs';
import { defineComponent } from 'vue';
import { useMobileDetailGallery } from '../gallery';
import './index.scss';
export const MobileDetailTools = defineComponent({
  name: 'MobileDetailTools',
  setup() {
    const { editorFocus, setImage, editor } = useEditor() as MarkdownEditorInstance;

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

    const { showMobileDetailGalleryView, MobileDetailGalleryView } = useMobileDetailGallery();

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

        <MobileDetailGalleryView></MobileDetailGalleryView>
      </div>
    );
  }
});
