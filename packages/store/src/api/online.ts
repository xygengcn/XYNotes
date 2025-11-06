import { changeAppNetworkStatus, isCheckOnlineSync } from '@store/state/app';
import { configsStoreState } from '@store/state/configs';
import { IUploadFile } from '@store/typings/assets';
import { IConfigsColunm } from '@store/typings/configs';
import { INote } from '@xynotes/typings';
import { Cookie, omit } from '@xynotes/utils';
import axios, { AxiosError } from 'axios';

/**
 * 在线数据保存
 */

// 定义API响应格式
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
  userMsg: string;
}

class ApiEventOnline {
  // 由于网络多次失败问题，记录失败次数
  private onlineSyncErrorCount: number = 0;

  // 基础拉取
  private async fetch<T extends unknown = any>(url: string, body: any = {}, configs: any = {}): Promise<T> {
    // 忽略同步
    if (!isCheckOnlineSync.value) {
      return Promise.resolve(null as any);
    }

    // 获取基础URL
    const baseURL = configsStoreState.value.REMOTE_BASE_URL;
    return axios
      .post<ApiResponse<T>>(url, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: configsStoreState.value.REMOTE_AUTHORIZATION || Cookie.getCookie('Authorization') || '',
          'X-App-DeviceId': '',
          'X-App-Source': 'Note_Service',
          ...(configs.headers || {})
        },
        baseURL,
        timeout: configs.timeout || 5000 // 1秒超时
      })
      .then((response) => {
        const data = response.data;
        if (data.code === 200) {
          this.onlineSyncErrorCount = 0;
          // 由于网络多次失败问题，会停止网络同步状态
          changeAppNetworkStatus(true);
          return data.data;
        }
        data.userMsg && window.$ui.toast(data.userMsg);
        throw data;
      })
      .catch((error: AxiosError) => {
        // 记录失败次数
        this.onlineSyncErrorCount++;
        if (this.onlineSyncErrorCount >= 3) {
          // 由于网络多次失败问题，会停止网络同步状态
          changeAppNetworkStatus(false);
          console.error('[online] fetch 触发熔断机制', this.onlineSyncErrorCount);
        }
        console.error('[online] fetch', this.onlineSyncErrorCount, 'Error:', error);

        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
          window.$ui.toast('请求超时，请检查网络连接');
          throw new Error('请求超时');
        }

        if (error.response) {
          const response = error.response;
          throw {
            status: response.status,
            message: response.statusText,
            data: response.data
          };
        }
        throw error;
      });
  }

  // 拉取笔记数据
  async apiFetchNoteListData(content: {
    updateTime: number;
    pageSize: number;
    order: 'updatedAt' | 'createdAt';
  }): Promise<INote[]> {
    return this.fetch('/note/list/query', content)
      .then((result) => {
        return result || [];
      })
      .catch((e) => {
        console.error('[online] list', e);
        return [];
      });
  }

  // 拉取笔记细节
  async apiFetchNoteDetailData(nid: string): Promise<INote> {
    return this.fetch('/note/detail/query', { nid })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.error('[online] detail', e);
        throw e;
      });
  }

  // 更新或新建笔记
  async apiSaveOrUpdateNote(note: INote): Promise<INote> {
    const content = omit(note, ['attachment']);
    content.updatedAt = Date.now();
    return this.fetch('/note/detail/save', { note: content })
      .then((result) => {
        console.log('[online] save', result);
        return result;
      })
      .catch((e) => {
        console.error('[online] save', e);
        throw e;
      });
  }

  // 删除笔记
  async apiArchiveNote(note: INote): Promise<boolean> {
    return this.fetch('/note/detail/delete', { nid: note.nid })
      .then((result) => {
        console.log('[online] delete', result);
        return result;
      })
      .catch((e) => {
        console.error('[online] delete', e);
        return false;
      });
  }

  // 同步笔记
  async apiSyncNote(note: INote): Promise<INote> {
    const content = omit(note, ['attachment']);
    return this.fetch('/note/detail/sync', { note: content })
      .then((result) => {
        console.log('[online] save', result);
        return result;
      })
      .catch((e) => {
        console.error('[online] save', e);
        throw e;
      });
  }

  // 拉取配置
  async apiFetchConfigsData(): Promise<IConfigsColunm[]> {
    return Promise.resolve([]);
  }

  // 更新配置
  async apiSaveOrUpdateConfigs(configs: IConfigsColunm[]): Promise<any> {}

  // 上传文件
  async apiFetchResourceUpload(file: File): Promise<IUploadFile> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('origin', configsStoreState.value.REMOTE_RESOURCES_BASE_URL || location.origin);
    // 开始上传
    return this.fetch('/note/assets/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 30 * 1000 // 20秒超时
    })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log('[上传失败]', e);
        throw e;
      });
  }

  /**
   * 拉取文件列表
   * @returns
   */
  async apiFetchResourceList(): Promise<{ data: IUploadFile[]; next: string }> {
    // 开始上传
    return this.fetch(
      '/note/assets/list',
      {
        limit: 20,
        next: '',
        origin: location.origin
      },
      {
        timeout: 30 * 1000 // 20秒超时
      }
    )
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log('[上传失败]', e);
      });
  }
}

const apiEventOnline = new ApiEventOnline();
export default apiEventOnline;
