import { computed, getCurrentInstance } from 'vue';
import { useNotesStore } from './store';
import { INote } from '../typings/note';
/**
 * 笔记hook
 */
export function useNote() {
  const instance = getCurrentInstance();

  const store = useNotesStore();

  /**
   * 笔记id
   */
  const nid = computed(() => instance.props.nid as string);

  // 笔记详情
  const note = computed(() => {
    return nid.value ? store.notesList.get(nid.value) : null;
  });

  // 字数
  const counter = computed(() => {
    return note.value?.text.length || 0;
  });

  // 更新笔记
  const updateNote = (n: Partial<Omit<INote, 'nid'>>) => {
    store.updateNote({ ...n, nid: nid.value });
  };


  const saveNote = ()=>{
    
  }

  return {
    note,
    counter,
    updateNote
  };
}
