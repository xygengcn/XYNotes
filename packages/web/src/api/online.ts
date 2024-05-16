import { IConfigsColunm } from '@/typings/config';
import { INote } from '@/typings/note';
import { getCookie } from '@/utils';
import is from '@/utils/is';
import { object } from '@/utils/object';

/**
 * 在线数据保存
 */

class ApiEventOnline {
  // 由于网络多次失败问题，会停止网络同步状态
  private ignoreOnlineSync: boolean = false;
  // 由于网络多次失败问题，记录失败次数
  private onlineSyncErrorCount: number = 0;

  // 基础拉取
  private async fetch<T extends any = any>(url: string, body: any = {}): Promise<T> {
    if (
      window.GlobalConfig?.REMOTE_ONLINE_SYNC !== 'true' ||
      !is.url(window.GlobalConfig?.REMOTE_BASE_URL) ||
      this.ignoreOnlineSync
    ) {
      return Promise.resolve(null);
    }
    const uri = new URL(url, window.GlobalConfig.REMOTE_BASE_URL);
    return fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.GlobalConfig.REMOTE_AUTHORIZATION || getCookie('Authorization') || '',
        DeviceId: '',
        source: 'Note_Service'
      },
      body: JSON.stringify(body)
    })
      .then(async (response) => {
        if (!response.ok) {
          throw response;
        }
        const body = await response.json();
        if (body.code === 200) {
          this.onlineSyncErrorCount = 0;
          this.ignoreOnlineSync = false;
          return body.data;
        }
        body.userMsg && window.$ui.toast(body.userMsg);
        throw body;
      })
      .catch(async (e) => {
        // 记录失败次数
        this.onlineSyncErrorCount++;
        if (this.onlineSyncErrorCount >= 3) {
          this.ignoreOnlineSync = true;
          console.error('[online] fetch 触发熔断机制', this.onlineSyncErrorCount);
        }
        console.error('[online] fetch', this.onlineSyncErrorCount, 'Error:', e);
        if (e instanceof Response) {
          const body = await e.json().catch(() => e);
          throw {
            ...e,
            status: e.status,
            message: e.statusText,
            data: body
          };
        }
        throw e;
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
    const content = object.omit(note, ['attachment']);
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
  async apiDeleteNote(note: INote): Promise<boolean> {
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
    const content = object.omit(note, ['attachment']);
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
}
const apiEventOnline = new ApiEventOnline();
export default apiEventOnline;
