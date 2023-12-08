import apiEvent from '@/api';
import Editor from '@/components/common/editor';
import noteEventBus from '@/event-bus';
import { Note } from '@/services/note';
import { useNotesStore } from '@/store/notes.store';
import { debounceMap } from '@/utils/debounce-throttle';
import { getDeviceType, TimeFormat } from 'js-lark';
import { computed, defineComponent, nextTick, onBeforeMount, onBeforeUnmount, ref, watch } from 'vue';
import Input from '../common/input';
import './index.scss';

const NoteEditor = defineComponent({
  name: 'NoteEditor',
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
    /**
     * 编辑器
     */
    const refEditor = ref<typeof Editor>();

    /**
     * store
     */
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
    let saveNoteDebounce: Function;

    /**
     * 字数
     */
    const textLength = ref(0);

    /**
     * 样式
     */
    const style = computed(() => {
      if (getDeviceType() !== 'mobile') {
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

    /**
     * 监听nid变化
     */
    watch(
      () => props.nid,
      () => {
        refEditor.value?.setValue(activeNote.value?.text || '');
        // 拉取最新的
        nextTick(() => {
          handleQueryNoteItem();
        });
        // 防抖
        saveNoteDebounce = debounceMap(
          props.nid,
          (note: Note) => {
            if (props.nid === note.nid) {
              note.save();
            }
          },
          3000
        );
      },
      { immediate: true }
    );
    /**
     * 拉取最新的内容
     */

    const handleQueryNoteItem = () => {
      refEditor.value.setLoading(true);
      return apiEvent
        .apiFetchNoteDetailData(props.nid)
        .then((result) => {
          if (result?.nid === props.nid) {
            refEditor.value.setValue(result.text || '');
            store.updateNote(result);
            return;
          }
        })
        .finally(() => {
          if (refEditor.value) {
            refEditor.value.setLoading(false);
          }
        });
    };

    /**
     * 修改数据
     * @param value
     */
    const handleChangeValue = (value: string) => {
      if (value) {
        activeNote.value?.set({ text: value });
        saveNoteDebounce(activeNote.value);
      }
    };

    /**
     * 修改标题
     * @param title
     */
    const handleChangeTitle = (title: string) => {
      if (title) {
        activeNote.value?.set({ title });
        saveNoteDebounce(activeNote.value);
      }
    };

    /**
     * 失去焦点
     */
    const handleEditorBlur = () => {
      activeNote.value.save();
    };

    /**
     * 事件
     * @param text
     */
    const insertValue = (text: string) => {
      text?.trim() && refEditor.value.insertValue(text);
    };
    onBeforeMount(() => {
      // 注册插入
      noteEventBus.on('insert', insertValue);
    });
    onBeforeUnmount(() => {
      // 注销事件
      noteEventBus.off('insert', insertValue);
      saveNoteDebounce = null;
    });

    return () => (
      <div class="note-editor">
        <div class="note-editor-header">
          <span class="note-editor-header__time">{TimeFormat(activeNote.value?.updatedAt, 'yyyy年MM月dd HH:mm')}</span>
          {!!textLength.value && <span class="note-editor-header__count">统计: {textLength.value}</span>}
        </div>
        <div class="note-editor-title" style={style.value} v-show={props.titleVisible}>
          <div class="note-editor-title-content">
            <Input value={activeNote.value.title} onChange={handleChangeTitle} />
          </div>
        </div>
        <div class="note-editor-content">
          <Editor
            value={activeNote.value.text || ''}
            id={activeNote.value.nid}
            ref={refEditor}
            onChange={handleChangeValue}
            onBlur={handleEditorBlur}
            onCounter={(count: number) => {
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
