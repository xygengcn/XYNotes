import { Editor, useEditor, type MarkdownEditorInstance } from '@xynotes/editor';
import '@xynotes/editor/style.css';
import { activeNote, notesStoreState, queryNote, setActiveNoteId } from '@xynotes/store/note';
import { NoteStatus } from '@xynotes/typings';
import { defineComponent, nextTick, onBeforeMount, onMounted, ref, watch } from 'vue';
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

    const { onChange, onBlur, setContent, getContent, state, getMarkdown, onUpload, setImage, editor, focus } =
      useEditor() as MarkdownEditorInstance;

    /**
     * 监听nid变化
     */
    watch(
      () => props.nid,
      () => {
        setContent(activeNote.value?.content || activeNote.value?.text || '');
        // 拉取最新的
        nextTick(() => {
          handleQueryNoteDetail();
        });
      }
    );

    /**
     * 拉取最新的内容
     */
    const handleQueryNoteDetail = async () => {
      fetchNoteLoading.value = true;
      return queryNote(props.nid)
        .then((result) => {
          console.log('[拉取最新内容]', props.nid, activeNote.value?.nid, result);
          if (result?.nid === activeNote.value?.nid) {
            setContent(result.content || result.text || '');
          }
          if (!result) {
            setContent(activeNote.value.content || activeNote.value?.text);
          }
        })
        .finally(() => {
          fetchNoteLoading.value = false;
          nextTick(() => {
            focus();
          });
        });
    };

    /**
     * 修改数据
     * @param value
     */
    onChange(() => {
      const text = getMarkdown();
      activeNote.value.set({
        content: getContent() as object,
        text: '',
        status: NoteStatus.draft,
        intro: text?.trim()?.slice(0, 50) || ''
      });
      activeNote.value.save(false);
    });

    /**
     * 挂载
     */
    onMounted(() => {
      // 加载完在拉取
      handleQueryNoteDetail();
    });

    /**
     * 失去焦点
     */
    onBlur(() => {
      const text = getMarkdown();
      activeNote.value.set({
        content: getContent() as object,
        text: '',
        intro: text?.trim()?.slice(0, 50) || ''
      });
      activeNote.value.save(false);
    });

    onBeforeMount(() => {
      if (!notesStoreState.value.activeNoteId && props.nid) {
        setActiveNoteId(props.nid);
      }
    });

    onUpload((files: FileList) => {
      setImage({
        src: URL.createObjectURL(files[0]),
        alt: files[0].name
      });
    });

    return () => (
      <div class="note-editor">
        <div class="note-editor-header" data-content-top={state.top === 0}>
          {context.slots.header?.({
            note: activeNote.value,
            onEnter: () => {
              editor.value.commands.focus();
            }
          })}
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
