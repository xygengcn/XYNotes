import database from '@store/database';
import eventBus from '@store/events';
import { AppLoadStatus, AppMode } from '@store/typings/app';
import { is } from '@xynotes/utils';
import { computed, readonly, ref } from 'vue';
import { configsStoreAction, configsStoreState } from './configs';

declare const __APP_VERSION__: string;

/**
 * 配置
 */
const state = ref({
  // 加载状态
  loadStatus: AppLoadStatus.configsLoading,

  // 版本
  version: __APP_VERSION__,

  // 网络状态
  networkStatus: window.navigator.onLine,

  // 模式
  mode: is.mobile() || is.tablet() ? AppMode.mobile : AppMode.desktop,

  // 桌面端全屏模式
  desktopFullScreen: false
});

/**
 * 是否网络在线
 */
const isCheckOnlineSync = computed(() => {
  if (!state.value.networkStatus) {
    return false;
  }
  if (configsStoreState.value.REMOTE_ONLINE_SYNC === true && is.url(configsStoreState.value.REMOTE_BASE_URL)) {
    return true;
  }
  return false;
});

/**
 * 设置桌面端全屏模式
 * @param flag 是否启用全屏模式
 */
const setDesktopFullScreen = (flag: boolean) => {
  state.value.desktopFullScreen = flag;
};

/**
 * 修改网络状态
 * @param status
 */
const changeAppNetworkStatus = (status: boolean) => {
  state.value.networkStatus = status;
};

// 修改状态
const setLoadStatus = (status: AppLoadStatus) => {
  state.value.loadStatus = status;
};

/**
 * 同步数据
 */
const syncApp = async () => {
  setLoadStatus(AppLoadStatus.configsLoading);
  // 同步配置
  return configsStoreAction
    .syncConfigs()
    .then(async (configs) => {
      // 结束加载
      setLoadStatus(AppLoadStatus.synced);
      // 同步事件
      eventBus.emit('app:synced');
    })
    .finally(() => {
      // 结束加载
      setLoadStatus(AppLoadStatus.finish);
    });
};

/**
 * 事件同步完成
 * @param cb
 */
const onAppSynced = (cb: () => void) => {
  console.log('[onAppSynced]');
  if (state.value.loadStatus >= AppLoadStatus.synced) {
    return cb();
  }
  eventBus.once('app:synced', cb);
};

/**
 * 备份
 * @returns
 */
const backupAppData = async () => {
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
const recoveryAppData = async (backupData: { version: string; database: any }) => {
  return database.recovery(backupData.database).then(() => {
    return syncApp();
  });
};

/**
 * 初始化数据
 */
const initAppData = async () => {
  return database.drop();
};

// 数据
const appStoreState = readonly(state);

const appStoreAction = {
  syncApp,
  backupAppData,
  recoveryAppData,
  initAppData,
  setDesktopFullScreen,
  changeAppNetworkStatus,
  setLoadStatus
};

export { appStoreAction, appStoreState, isCheckOnlineSync, onAppSynced };

// 监听网络变化
window.addEventListener('online', () => {
  changeAppNetworkStatus(navigator.onLine);
});
// 监听屏幕旋转
window.screen.orientation?.addEventListener('change', () => {
  window.location.reload();
  state.value.mode = is.mobile() || is.tablet() ? AppMode.mobile : AppMode.desktop;
  console.log('[screen]', state.value.mode);
});
