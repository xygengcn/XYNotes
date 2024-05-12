import { IConfigsColunm } from '@/typings/config';
import { INote } from '@/typings/note';
import is from '@/utils/is';

/**
 * 在线数据保存
 */

class ApiEventOnline {
  // 基础拉取
  private async fetch<T extends any = any>(url: string, body: any = {}): Promise<T> {
    if (window.GlobalConfig?.REMOTE_ONLINE_SYNC !== 'true' || !is.url(window.GlobalConfig?.REMOTE_BASE_URL)) {
      return Promise.resolve(null);
    }
    const uri = new URL(url, window.GlobalConfig.REMOTE_BASE_URL);
    return fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.GlobalConfig.REMOTE_AUTHORIZATION || '',
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
          return body.data;
        }
        body.userMsg && window.$ui.toast(body.userMsg);
        throw body;
      })
      .catch(async (e) => {
        console.error('[[online]] fetch', e);
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
  async apiFetchNoteListData(): Promise<INote[]> {
    return this.fetch('/note/all/list')
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
    return this.fetch('/note/detail', { nid })
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
    return this.fetch('/note/save', { note })
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
    return this.fetch('/note/delete', { nid: note.nid })
      .then((result) => {
        console.log('[online] delete', result);
        return result;
      })
      .catch((e) => {
        console.error('[online] delete', e);
        return false;
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
