import { useNotesStore } from '@/store/notes.store';
import { NoteStatus } from '@/typings/note';
import { Editor, useEditor } from '@xynotes/editor';
import '@xynotes/editor/dist/style.css';
import { computed, defineComponent, nextTick, onBeforeMount, ref, watch } from 'vue';
import './index.scss';

const NoteEditor = defineComponent({
  name: 'NoteEditor',
  props: {
    nid: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    /**
     * loading
     */
    const fetchNoteLoading = ref(false);

    /**
     * store
     */
    const store = useNotesStore();

    const { onChange, getContent, onBlur, setContent, state, getCounter } = useEditor();

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
        setContent(activeNote.value?.text || '');
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
      return store
        .queryNote(props.nid)
        .then((result) => {
          if (result?.nid === props.nid) {
            setContent(result.text || '');
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
    onChange(() => {
      const counter = getCounter();
      activeNote.value.set({ text: getContent(), status: NoteStatus.draft, counter: counter.words });
      activeNote.value.save(false);
    });

    /**
     * 失去焦点
     */
    onBlur(() => {
      activeNote.value.set({ text: getContent() });
      activeNote.value.save(false);
    });

    onBeforeMount(() => {
      if (!store.activeNoteId && props.nid) {
        store.setActiveNoteId(props.nid);
      }
    });

    return () => (
      <div class="note-editor">
        <div class="note-editor-header" data-content-top={state.top === 0}>
          {context.slots.header?.({ note: activeNote.value })}
        </div>
        <div class="note-editor-content">
          <Editor value={activeNote.value?.text || ''} id={props.nid} loading={fetchNoteLoading.value} />
        </div>
        <div class="note-editor-footer">{context.slots.footer?.({ note: activeNote.value })}</div>
      </div>
    );
  }
});

export default NoteEditor;
