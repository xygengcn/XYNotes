import { Checkbox, Drawer, Icon, Loading, Viewer } from '@xynotes/components';
import { computed, ref } from 'vue';
import './index.scss';
import { ApiEvent } from '@xynotes/store';
import type { IUploadFile } from 'node_modules/@xynotes/store/dist/typings/assets';
import { useEditor, type MarkdownEditorInstance } from '@xynotes/editor';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

export function useMobileDetailGallery() {
  /**
   * 是否显示抽屉
   */
  const visibleMoreDrawer = ref(false);
  const loading = ref(false);
  const { setImage } = useEditor() as MarkdownEditorInstance;

  /**
   * 图片列表
   */
  const imageList = ref<{ src: string; checked: boolean; alt?: string }[]>([]);
  /**
   * 是否已选择图片
   */
  const isSelected = computed(() => {
    return imageList.value.some((item) => item.checked);
  });

  const show = () => {
    visibleMoreDrawer.value = true;
    loading.value = true;
    imageList.value = [];
    ApiEvent.api
      .apiFetchResourceList()
      .then((result) => {
        if (result.data) {
          imageList.value = result.data.map((item: IUploadFile) => ({
            src: item.originUrl,
            checked: false,
            alt: item.name
          }));
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const hide = () => {
    visibleMoreDrawer.value = false;
  };

  /**
   * 添加图片
   * @returns
   */
  const addImage = () => {
    const selectedImages = imageList.value.filter((item) => item.checked);
    if (selectedImages.length === 0) return;
    for (const img of selectedImages) {
      setImage({
        src: img.src,
        alt: img.alt
      });
    }
    hide();
  };

  const MobileDetailGalleryView = () => {
    return (
      <Drawer
        class="mobile-detail-gallery-drawer"
        visible={visibleMoreDrawer.value}
        onClose={() => {
          visibleMoreDrawer.value = false;
        }}
      >
        <div class="mobile-detail-gallery">
          <div class="mobile-detail-gallery-header">
            <span class="active" onClick={hide}>
              取消
            </span>
            <span class="title">在线图库</span>
            <span class={{ active: true, inactive: !isSelected.value }} onClick={addImage}>
              添加
            </span>
          </div>
          <div class="mobile-detail-gallery-list">
            <Loading v-show={loading.value}></Loading>
            {/* 空页面 */}
            <div class="mobile-detail-gallery-list-empty" v-show={imageList.value.length === 0}>
              <Icon type="list-empty" size={100}></Icon>
              <span>在线图库暂无图片</span>
            </div>
            <RecycleScroller
              class="mobile-detail-gallery-list-scroller"
              items={imageList.value}
              item-size={(document.body.clientWidth - 40) / 3}
              gridItems={3}
              keyField="src"
              v-slots={{
                default: (props) => {
                  return (
                    <div class="mobile-detail-gallery-list-item">
                      <div class="mobile-detail-gallery-list-item-wrapper">
                        <Checkbox v-model:value={props.item.checked}></Checkbox>
                        <Viewer src={props.item.src}></Viewer>
                      </div>
                    </div>
                  );
                }
              }}
            ></RecycleScroller>
          </div>
        </div>
      </Drawer>
    );
  };

  return {
    MobileDetailGalleryView,
    showMobileDetailGalleryView: show,
    hideMobileDetailGalleryView: hide
  };
}
