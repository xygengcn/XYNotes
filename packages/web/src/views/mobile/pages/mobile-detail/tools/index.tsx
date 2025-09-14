import { Icon } from '@xynotes/components';
import { defineComponent } from 'vue';
import './index.scss';
import { useEditor, type MarkdownEditorInstance } from '@xynotes/editor';
import { UploadService } from '@/services/upload';
import { useMobileKeyboardEvent } from './keyborad-event';
import { useMobileDetailGallery } from '../gallery';
import { isCheckOnlineSync } from '@xynotes/store/configs';
export const MobileDetailTools = defineComponent({
  name: 'MobileDetailTools',
  setup() {
    const { keyBoardHeight } = useMobileKeyboardEvent();
    const { editorFocus, setImage } = useEditor() as MarkdownEditorInstance;

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

    const { showMobileDetailGalleryView, MobileDetailGalleryView } = useMobileDetailGallery();

    return () => (
      <div
        class={{ 'mobile-detail-tools': true, focus: editorFocus.value }}
        // 键盘弹出时显示
        v-Show={!(editorFocus.value && keyBoardHeight.value > 10)}
      >
        <div class="mobile-detail-tools-item">
          <Icon type="photo" size={26} onClick={handleSelectImageFile}></Icon>
        </div>
        <div class="mobile-detail-tools-item" v-show={isCheckOnlineSync()}>
          <Icon type="gallery" size={24} onClick={showMobileDetailGalleryView}></Icon>
        </div>

        <MobileDetailGalleryView></MobileDetailGalleryView>
      </div>
    );
  }
});
