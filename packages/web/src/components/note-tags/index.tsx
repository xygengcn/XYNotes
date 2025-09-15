import { Drawer, Icon } from '@xynotes/components';
import type { Note } from '@xynotes/store';
import { NoteStatus } from '@xynotes/typings';
import { defineComponent, ref, type PropType } from 'vue';
import './index.scss';
import { NoteTagsInput } from './input';
const NoteTagsContent = defineComponent({
  name: 'NoteTagsContent',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  setup: (props) => {
    const refList = ref<HTMLElement>();

    const handleClickDeleteTag = (tag: string) => {
      props.note.tags = props.note.tags?.filter((item) => item !== tag);
    };

    /**
     * 输入
     * @param value
     */
    const handleClickAddTag = (value: string) => {
      props.note.tags?.push(value);
    };

    return () => (
      <div class="note-tags-content">
        <div class="note-tags-content-list" ref={refList}>
          {props.note?.tags?.map((tag) => (
            <div class="note-tags-content-list-item">
              <span>#{tag}</span>
              <Icon type="delete" size={8} onclick={handleClickDeleteTag.bind(this, tag)}></Icon>
            </div>
          ))}
          <NoteTagsInput onInput={handleClickAddTag}></NoteTagsInput>
        </div>
      </div>
    );
  }
});

export function useNoteTags(note: Note) {
  /**
   * 是否显示抽屉
   */
  const visible = ref(false);

  const show = () => {
    visible.value = true;
  };

  const hide = () => {
    visible.value = false;
  };

  /**
   * 保存
   */
  const handleClickSubmit = () => {
    note.set({ tags: note.tags, status: NoteStatus.draft });
    note.save(true);
    hide();
  };

  const view = () => {
    return (
      <Drawer class="note-tags-drawer" visible={visible.value} onClose={hide}>
        <div class="note-tags-drawer-wrapper">
          <div class="note-tags-drawer-wrapper-header">
            <span class="active" onClick={hide}>
              取消
            </span>
            <span class="title">
              <Icon type="tags" size={24}></Icon>
            </span>
            <span class="active" onClick={handleClickSubmit}>
              确定
            </span>
          </div>
          <NoteTagsContent note={note} />
        </div>
      </Drawer>
    );
  };

  return {
    hide,
    show,
    view
  };
}
