import ApiEvent from '@store/api';
import { readonly, ref, toRaw } from 'vue';
import { IConfigs, NoteListSortType } from '../typings/configs';

/**
 * 配置
 */
const state = ref<IConfigs>({
  // 桌面侧栏宽度
  SIDE_CONTAINER_MAX_WIDTH: 300,
  // 桌面端笔记列表排序
  NOTE_LIST_SORT: { value: NoteListSortType.updated, label: '更新时间' },
  // 在线同步地址
  REMOTE_BASE_URL: __VITE_APP_AXIOS_BASEURL__,
  // 资源地址
  REMOTE_RESOURCES_BASE_URL: __VITE_APP_RESOURCES_BASEURL__,
  // 是否同步在线
  REMOTE_ONLINE_SYNC: false,
  // 在线认证Authorization
  REMOTE_AUTHORIZATION: '',
  // 显示主界面快捷键
  SHORTCUT_KEY_SHOW: ''
});

/**
 * 保存配置
 * @param key
 * @param value
 */
const setConfig = <K extends keyof IConfigs = keyof IConfigs>(key: K, value: IConfigs[K], store: boolean = true) => {
  state.value[key] = value;
  if (store) {
    return ApiEvent.api.apiSaveOrUpdateConfigs([{ key, value: toRaw(value) }]);
  }
};

/**
 * 同步配置
 * @returns
 */
const syncConfigs = async () => {
  return ApiEvent.api.apiFetchConfigsData().then((configList) => {
    console.log('[sync] configs', configList);
    const configs = configList.reduce((obj, i) => {
      // 生产配置,不允许存储REMOTE_AUTHORIZATION
      if (__VITE_APP_ENV__ === 'production' && i.key === 'REMOTE_AUTHORIZATION') {
        return obj;
      }
      // 生产配置,不允许存储REMOTE_BASE_URL
      if (__VITE_APP_ENV__ === 'production' && i.key === 'REMOTE_BASE_URL') {
        if (state.value.REMOTE_BASE_URL) {
          return obj;
        }
      }
      // 转换
      obj[i.key] = i.value;
      return obj;
    }, {});
    state.value = { ...state.value, ...configs };

    return state.value;
  });
};

/**
 * 定义
 */
export const configsStoreState = readonly(state);

/**
 * 方法
 */
export const configsStoreAction = {
  setConfig,
  syncConfigs
};
