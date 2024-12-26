import { Editor, useEditor } from '@xynotes/editor';
import '@xynotes/editor/style.css';
import { NoteStatus } from '@xynotes/typings';
import { activeNote, notesStoreState, queryNote, setActiveNoteId } from '@xynotes/store/note';
import { defineComponent, nextTick, onBeforeMount, ref, watch } from 'vue';
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

    const { onChange, getContent, onBlur, setContent, state, getCounter, getData } = useEditor();

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
      return queryNote(props.nid)
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
      console.log(1111, getData());
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
      if (!notesStoreState.value.activeNoteId && props.nid) {
        setActiveNoteId(props.nid);
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
