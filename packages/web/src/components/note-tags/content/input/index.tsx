import { defineComponent, nextTick, ref } from 'vue';
import './index.scss';

export const NoteTagsInput = defineComponent({
  name: 'NoteTagsInput',
  emits: ['input'],
  setup(_, context) {
    const editorStatus = ref(false);
    const refInput = ref<HTMLInputElement>();
    const value = ref('');
    const handleInput = () => {
      if (value.value.trim()) {
        context.emit('input', value.value);
      }
      editorStatus.value = false;
      value.value = '';
    };
    return () => (
      <div class="note-tags-input">
        <input
          ref={refInput}
          type="text"
          v-show={editorStatus.value}
          v-model={value.value}
          onBlur={handleInput}
          onKeydown={(e) => {
            if (e.key === 'Enter') {
              handleInput();
            }
          }}
        />
        <span
          v-show={!editorStatus.value}
          onclick={() => {
            editorStatus.value = true;
            nextTick(() => {
              refInput.value?.focus();
            });
          }}
        >
          添加标签
        </span>
      </div>
    );
  }
});
