import ApiEvent from '@/api';
import { INote } from '@/typings/note';
import { readonly, ref } from 'vue';
import { syncConfigs } from './configs';
import defaultJson from './default.json';
import { AppLoadStatus } from '@/typings/app';
import { addNote, saveNote, setNoteList } from './note';
import database from '@/database';
import { downloadFile } from '@xynotes/utils';

declare const __APP_VERSION__: string;

/**
 * 配置
 */
const state = ref({ loadStatus: AppLoadStatus.configsLoading, version: __APP_VERSION__ });

// 修改状态
export const setLoadStatus = (status: AppLoadStatus) => {
  state.value.loadStatus = status;
};

/**
 * 同步数据
 */
export const syncApp = async () => {
  setLoadStatus(AppLoadStatus.configsLoading);
  // 同步配置
  return syncConfigs()
    .then(async (configs) => {
      // 同步笔记信息
      return ApiEvent.api
        .apiFetchNoteListData({ updateTime: 0, order: configs.NOTE_LIST_SORT.value, pageSize: 50 })
        .then((list) => {
          if (list.length === 0) {
            addNote(defaultJson as INote);
            saveNote(defaultJson as INote, false);
          } else {
            setNoteList(list);
          }
        });
    })
    .finally(() => {
      // 结束加载
      setLoadStatus(AppLoadStatus.finish);
    });
};

/**
 * 备份
 * @returns
 */
export const backupAppData = async () => {
  console.info('[backup]');
  return database
    .backup()
    .then((database) => {
      const backupData = {
        version: state.value.version,
        database
      };
      return backupData;
    })
    .catch((e) => {
      console.error('[backup]', e);
    });
};

/**
 * 恢复
 * @param backupData
 * @returns
 */
export const recoveryAppData = async (backupData: { version: string; database: any }) => {
  return database.recovery(backupData.database).then(() => {
    return syncApp();
  });
};
export const appStoreState = readonly(state);
