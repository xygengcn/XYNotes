import type { INote } from '@xynotes/typings';
import EventEmitter from 'eventemitter3';
import { getCurrentInstance, onBeforeUnmount } from 'vue';
import { Broadcast } from './broadcast-channel';

type INoteEvent = {
  'note:update': (note: Readonly<INote>) => void;
  'note:delete': (note: Readonly<INote>) => void;
  'note:create': (note: Readonly<INote>) => void;
};

const emitter = new EventEmitter<INoteEvent>();
const broadcast = new Broadcast<INoteEvent>();

broadcast.onMessage((e) => {
  console.log('[broadcast]', e.data);
  if (e.data.origin !== broadcast.clientId) {
    emitter.emit(e.data.action, ...e.data.args);
  }
});

export const useNoteEventBus = (noteId?: string) => {
  /**
   * 监听笔记更新事件
   */
  let noteUpdateCb: (note: INote) => void;
  const onNoteUpdate = (cb: (note: INote) => void) => {
    emitter.on(
      'note:update',
      (noteUpdateCb = (note) => {
        if (noteId && note.nid !== noteId) return;
        cb(note);
      })
    );
  };
  /**
   * 监听笔记删除事件
   */
  let noteDeleteCb: (note: INote) => void;
  const onNoteDelete = (cb: (note: INote) => void) => {
    emitter.on(
      'note:delete',
      (noteDeleteCb = (note) => {
        if (noteId && note.nid !== noteId) return;
        cb(note);
      })
    );
  };

  /**
   * 在组件内，销毁监听
   */
  const instance = getCurrentInstance();
  if (instance) {
    onBeforeUnmount(() => {
      noteUpdateCb && emitter.off('note:update', noteUpdateCb);
      noteDeleteCb && emitter.off('note:delete', noteDeleteCb);
    });
  }

  return {
    onNoteUpdate,
    onNoteDelete
  };
};

/**
 * 触发更新笔记事件
 *
 * 此函数通过emitter触发一个名为'note:update'的事件，并将更新后的笔记对象作为参数传递给事件监听器
 * 这使得其他部分可以根据更新后的笔记信息执行相应的逻辑
 *
 * @param note 更新后的笔记对象，应包含所有必要的信息如笔记ID、内容、最后修改时间等
 */
export function updateNoteEvent(note: INote) {
  emitter.emit('note:update', note);
  broadcast.broadcast('note:update', note);
}

/**
 * 触发删除笔记事件
 *
 * 此函数通过事件发射器(emitter)触发一个名为'note:delete'的事件，将指定的笔记对象传递给事件监听器
 * 它允许其他部分的代码在接收到此事件时，执行相应的操作，例如从列表中移除笔记、更新界面等
 *
 * @param note 要删除的笔记对象，符合INote接口
 */
export function deleteNoteEvent(note: INote) {
  emitter.emit('note:delete', note);
}

/**
 * 注册一个监听笔记删除事件的回调函数
 *
 * 当笔记删除事件('note:delete')发生时，emitter将调用此回调函数通过这个函数，开发者可以
 * 在笔记删除时执行自定义的逻辑，比如更新界面或进行数据备份
 *
 * @param cb 当笔记删除事件发生时要执行的回调函数，它接受一个INote类型的参数
 */
export const onNoteDelete = (cb: (note: INote) => void) => {
  emitter.on('note:delete', cb);
};
/**
 * 注册一个监听笔记更新事件的函数
 *
 * 当笔记更新事件发生时，传入的回调函数会被调用，以处理相应的更新事件
 * 这个函数主要用于在笔记应用中，实现实时监听和响应笔记更新的功能
 *
 * @param cb 一个回调函数，当笔记更新事件发生时会被调用接收一个INote类型的参数
 */
export const onNoteUpdate = (cb: (note: INote) => void) => {
  emitter.on('note:update', cb);
};
