import { Checkbox, Icon, Loading, Viewer } from '@xynotes/components';
import { useEditor, type MarkdownEditorInstance } from '@xynotes/editor';
import { ApiEvent, type IUploadFile } from '@xynotes/store';
import { computed, defineComponent, ref } from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import './index.scss';
export default defineComponent({
  name: 'NoteGalleryDrawer',
  emits: ['close'],
  setup(_, context) {
    const loading = ref(true);
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

    const hide = () => {
      context.emit('close');
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

    return () => (
      <div class="note-gallery-drawer">
        <div class="note-gallery-drawer-header">
          <span class="active" onClick={hide}>
            取消
          </span>
          <span class="title">在线图库</span>
          <span class={{ active: true, inactive: !isSelected.value }} onClick={addImage}>
            添加
          </span>
        </div>
        <div class="note-gallery-drawer-list">
          <Loading v-show={loading.value}></Loading>
          {/* 空页面 */}
          <div class="note-gallery-drawer-list-empty" v-show={imageList.value.length === 0}>
            <Icon type="list-empty" size={100}></Icon>
            <span>在线图库暂无图片</span>
          </div>
          <RecycleScroller
            class="note-gallery-drawer-list-scroller"
            items={imageList.value}
            item-size={(document.body.clientWidth - 40) / 3}
            gridItems={3}
            keyField="src"
            v-slots={{
              default: (props) => {
                return (
                  <div class="note-gallery-drawer-list-item">
                    <div class="note-gallery-drawer-list-item-wrapper">
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
    );
  }
});
