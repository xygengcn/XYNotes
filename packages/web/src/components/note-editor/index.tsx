import apiEvent from '@/api';
import Editor from '@/components/common/editor-plus';
import { useNotesStore } from '@/store/notes.store';
import { NoteStatus } from '@/typings/note';
import { computed, defineComponent, nextTick, onBeforeMount, ref, watch } from 'vue';
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
  setup(props, context) {
    /**
     * 编辑器
     */
    const refEditor = ref<typeof Editor>();

    /**
     * loading
     */
    const fetchNoteLoading = ref(false);

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
     * 监听nid变化
     */
    watch(
      () => props.nid,
      () => {
        refEditor.value?.setValue(activeNote.value?.text || '');
        // 拉取最新的
        nextTick(() => {
          handleQueryNoteDetail();
        });
      },
      { immediate: true }
    );

    /**
     * 拉取最新的内容
     */
    const handleQueryNoteDetail = async () => {
      fetchNoteLoading.value = true;
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
          fetchNoteLoading.value = false;
        });
    };

    /**
     * 修改数据
     * @param value
     */
    const handleChangeValue = (value: string) => {
      activeNote.value.set({ text: value, status: NoteStatus.draft });
      activeNote.value.save(false);
    };

    /**
     * 失去焦点
     */
    const handleEditorBlur = (value: string) => {
      activeNote.value.set({ text: value });
      activeNote.value.save(false);
    };

    /**
     * 事件
     * @param text
     */
    const handleEditorPaste = (text: string) => {
      activeNote.value.set({ status: NoteStatus.draft, text });
    };
    onBeforeMount(() => {
      if (!store.activeNoteId && props.nid) {
        store.setActiveNoteId(props.nid);
      }
    });

    return () => (
      <div class="note-editor">
        <div class="note-editor-header" data-content-top={refEditor.value?.scrollerState.top === 0}>
          {context.slots.header?.({ note: activeNote.value })}
        </div>
        <div class="note-editor-content">
          <Editor
            value={activeNote.value?.text || ''}
            id={props.nid}
            ref={refEditor}
            loading={fetchNoteLoading.value}
            onChange={handleChangeValue}
            onBlur={handleEditorBlur}
            onPaste={handleEditorPaste}
            onCounter={(count: number) => {
              activeNote.value.counter = count;
            }}
          />
        </div>
        <div class="note-editor-footer">{context.slots.footer?.({ note: activeNote.value })}</div>
      </div>
    );
  }
});

export default NoteEditor;
