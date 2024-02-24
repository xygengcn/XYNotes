import { useConfigsStore } from '@/store/config.store';
import { IConfigsColunm } from '@/typings/config';
import { INote } from '@/typings/note';

/**
 * 在线数据保存
 */

class ApiEventOnline  {
  // 基础拉取
  private async fetch<T extends any = any>(url: string, body: any = {}): Promise<T> {
    const configStore = useConfigsStore();
    if (!configStore.remoteBaseUrl) {
      return Promise.resolve(null);
    }
    return fetch(configStore.remoteBaseUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
        DeviceId: '',
        source: 'Note_service'
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
        if (e instanceof Response) {
          const body = await e.json();
          throw {
            ...e,
            data: body
          };
        }
        throw e;
      });
  }
  // 拉取笔记数据
  async apiFetchNoteListData(): Promise<INote[]> {
    return this.fetch('/notes/all/list')
      .then((result) => {
        return result || [];
      })
      .catch((e) => {
        console.error('[online]. list', e);
        return [];
      });
  }

  // 拉取笔记细节
  async apiFetchNoteDetailData(nid: string): Promise<INote> {
    return this.fetch('/notes/detail', { nid })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.error('[online] detail', e);
        return [];
      });
  }

  // 更新或新建笔记
  async apiSaveOrUpdateNote(note: INote): Promise<any> {
    return this.fetch('/notes/save', { note })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.error('[online] save', e);
        return [];
      });
  }

  // 删除笔记
  async apiDeleteNote(note: INote): Promise<any> {
    return this.fetch('/notes/delete', { nid: note.nid })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.error('[online] save', e);
        return [];
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
