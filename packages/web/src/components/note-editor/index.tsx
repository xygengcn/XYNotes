import apiEvent from '@/api';
import Editor from '@/components/common/editor';
import noteEventBus from '@/event-bus';
import { Note } from '@/services/note';
import { useNotesStore } from '@/store/notes.store';
import { debounceMap } from '@/utils/debounce-throttle';
import { getDeviceType, TimeFormat } from 'js-lark';
import { computed, defineComponent, onBeforeMount, onBeforeUnmount, ref, watch } from 'vue';
import Input from '../common/input';
import './index.scss';

/**
 * 最大长度
 */
export const NoteEditorMaxWidth = 2048;

const NoteEditor = defineComponent({
  props: {
    nid: {
      type: String,
      required: true
    },
    titleVisible: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const refEditor = ref<typeof Editor>();

    const refTitle = ref<HTMLDivElement>();

    const store = useNotesStore();

    /**
     * 当前笔记
     */
    const activeNote = computed(() => {
      return store.activeNote;
    });

    /**
     * 节流事件
     */
    let debounce: Function;

    /**
     * 字数
     */
    const textLength = ref(0);

    /**
     * 样式
     */
    const style = computed(() => {
      if (getDeviceType() !== 'mobile') {
        if (refTitle) {
          const grap = refTitle.value.clientWidth - NoteEditorMaxWidth / 2;
          return {
            paddingLeft: Math.max(35, grap) + 'px',
            paddingRight: Math.max(35, grap) + 'px'
          };
        }
        return {
          paddingLeft: 35 + 'px',
          paddingRight: 35 + 'px'
        };
      }
      return {
        paddingLeft: 10 + 'px',
        paddingRight: 10 + 'px'
      };
    });

    watch(
      () => props.nid,
      () => {
        const store = useNotesStore();
        if (refEditor) {
          refEditor.value.editorLoading = true;
        }
        refEditor.value?.editorController?.setValue(activeNote.value?.text || '');
        /**
         * 拉取最新的内容
         */
        apiEvent
          .apiFetchNoteDetailData(props.nid)
          .then((result) => {
            if (result.nid === props.nid) {
              refEditor.value?.editorController?.setValue(result.text || '');
              store.updateNote(result);
              return;
            }
          })
          .finally(() => {
            if (refEditor.value) {
              refEditor.value.editorLoading = false;
            }
          });

        // 防抖
        debounce = debounceMap(
          props.nid,
          (note: Note) => {
            if (props.nid === note.nid) {
              note?.save();
            }
          },
          3000
        );
      },
      { immediate: true }
    );

    /**
     * 修改数据
     * @param value
     */
    const handleChangeValue = (value: string) => {
      if (value) {
        activeNote.value?.set({ text: value });
        debounce(activeNote.value);
      }
    };

    /**
     * 修改标题
     * @param title
     */
    const handleChangeTitle = (title: string) => {
      if (title) {
        activeNote.value?.set({ title });
        debounce(activeNote.value);
      }
    };

    /**
     * 事件
     * @param text
     */
    const insertValue = (text) => {
      text?.trim() && refEditor.value.editorController?.insertValue(text);
    };
    onBeforeMount(() => {
      noteEventBus.on('insert', insertValue);
    });
    onBeforeUnmount(() => {
      noteEventBus.off('insert', insertValue);
      debounce = null;
    });

    return () => (
      <div class="note-editor">
        <div class="note-editor-header">
          <span class="note-editor-header__time">{TimeFormat(activeNote.value?.updatedAt, 'yyyy年MM月dd HH:mm')}</span>
          {!!textLength.value && <span class="note-editor-header__count">统计: {textLength.value}</span>}
        </div>
        <div class="note-editor-title" ref={refTitle} style={style.value} v-show={props.titleVisible}>
          <div class="note-editor-title-content" style={{ maxWidth: NoteEditorMaxWidth + 'px' }}>
            <Input value={activeNote.value.title} onchange={handleChangeTitle} />
          </div>
        </div>
        <div class="note-editor-content">
          <Editor
            value={activeNote.value.text || ''}
            id={activeNote.value.nid}
            ref={refEditor}
            onChange={handleChangeValue}
            onCounter={(count) => {
              textLength.value = count;
            }}
          />
        </div>
        <div class="note-editor-footer"></div>
      </div>
    );
  }
});

export default NoteEditor;
