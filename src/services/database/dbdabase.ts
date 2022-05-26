import { IDatabaseModules } from '.';

export interface IWhereOptions {
  key?: IDBValidKey | IDBKeyRange;
  index?: string; // 索引
  offset?: number;
  like?: { [key: string]: string | number };
  limit?: number; // 限制数量
  where?: [string, string];
}

export default class DBDatabaseModule {
  // 数据库句柄
  private dbDatabaseStore: IDBObjectStore;

  // 数据库表结构
  private dataModule!: IDatabaseModules;

  constructor(dbDatabaseStore: IDBObjectStore, dataModule: IDatabaseModules) {
    this.dbDatabaseStore = dbDatabaseStore;
    this.dataModule = dataModule;
  }

  /**
   * 批量更新与写入
   * @param datas
   * @returns
   */
  public bulkCreate<T>(datas: T[]): Promise<any> {
    const storePromise = datas.map((data) => {
      return new Promise((resolve, reject) => {
        const result = this.dbDatabaseStore.put(data);
        result.onsuccess = (e) => {
          resolve(e);
        };
        result.onerror = (e) => {
          reject(e);
        };
      });
    });
    return Promise.all(storePromise);
  }

  /**
   * 批量拉取
   */
  public findAll<T = any>(options?: IWhereOptions): Promise<T> {
    return new Promise((resolve, reject) => {
      let request: IDBRequest;
      // 判断是否有索引 且存在索引
      if (options?.index && this.dataModule.columns.find((col) => col.index === options.index)) {
        request = this.dbDatabaseStore.index(options?.index).getAll(options?.key, options?.limit);
      } else {
        request = this.dbDatabaseStore.getAll(options?.key, options?.limit);
      }

      // 成功
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (e) => {
        reject(e);
      };
    });
  }

  /**
   *
   * 通过关键词来批量拉取
   *
   * 全部遍历一次
   */
  public findAllLike<T = any>(options?: Pick<IWhereOptions, 'limit' | 'like'>): Promise<T[]> {
    if (Object.keys(options?.like || {}).length === 0) {
      return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
      const request = this.dbDatabaseStore.openCursor();
      const list: Array<T> = [];
      request.onerror = (e) => {
        reject(e);
      };
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          const result = Object.entries(options?.like || {}).some(([key, value]) => {
            return cursor.value[key]?.includes(value);
          });
          if (result) {
            list.push(cursor.value);
          }
          // 有限制
          if (options?.limit && list.length >= options.limit) {
            resolve(list);
          } else {
            cursor.continue();
          }
        } else {
          resolve(list);
        }
      };
    });
  }

  /**
   * 通过主键查找
   * @returns
   */
  public findByPk<T = Object>(key: IWhereOptions['key']): Promise<T> {
    return new Promise((resolve, reject) => {
      const request = this.dbDatabaseStore.get(key as IDBValidKey);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (e: any) => {
        reject(e);
      };
    });
  }

  /**
   * 清空表
   */
  public clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.dbDatabaseStore.clear();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (e) => {
        reject(e);
      };
    });
  }

  /**
   * 获取表长度
   * @returns
   */
  public count(): Promise<number> {
    return new Promise((resolve, reject) => {
      const request = this.dbDatabaseStore.count();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (e) => {
        reject(e);
      };
    });
  }

  /**
   * 删除
   */
  public destory(key: IDBValidKey | IDBKeyRange): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.dbDatabaseStore.delete(key);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (e) => {
        reject(e);
      };
    });
  }
}
