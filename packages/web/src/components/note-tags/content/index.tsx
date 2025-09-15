import { Icon } from '@xynotes/components';
import { Note } from '@xynotes/store';
import { defineComponent, type PropType, ref } from 'vue';
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
              <Icon type="delete" size={10} onclick={handleClickDeleteTag.bind(this, tag)}></Icon>
            </div>
          ))}
          <NoteTagsInput onInput={handleClickAddTag}></NoteTagsInput>
        </div>
      </div>
    );
  }
});

export default NoteTagsContent;
