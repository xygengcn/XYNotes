import { DBDatabaseEvent, DBDatabaseEventType, IDatabaseModules } from './type';

export interface IDBDatabaseWhereOptions<T = Record<string, unknown>> {
  key?: IDBValidKey | IDBKeyRange;
  index?: keyof T; // 索引
  offset?: number;
  like?: Record<string, string | number>;
  attributes: Array<keyof T>;
  limit?: number; // 限制数量
}

/**
 * 数据筛选
 * @param datas
 * @param attributes
 * @returns
 */
const objArrayAttrbuteFilter = <T>(datas: Array<T>, attributes: Array<keyof T>): Array<T> => {
  if (!attributes.length) return datas;
  if (datas.length) {
    return datas.map((data) => {
      return attributes.reduce((result: T, attr: keyof T) => {
        result[attr] = data[attr];
        return result;
      }, {} as T);
    });
  }
  return [];
};

export default class DBDatabaseModule {
  // 事件
  private databaseEvent: DBDatabaseEvent = null;
  // 数据库句柄
  private dbDatabaseStore: IDBObjectStore;

  // 数据库表结构
  private dataModule!: IDatabaseModules;

  constructor(dbDatabaseStore: IDBObjectStore, dataModule: IDatabaseModules, event?: DBDatabaseEvent) {
    this.dbDatabaseStore = dbDatabaseStore;
    this.dataModule = dataModule;
    this.databaseEvent = event;
  }

  /**
   * 事件处理
   */
  private handleDatabaseEvent(event: DBDatabaseEventType, data?: any) {
    if (this.databaseEvent && typeof this.databaseEvent === 'function') {
      this.databaseEvent(event, { store: this.dbDatabaseStore, module: this.dataModule, data });
    }
  }

  /**
   * 批量更新与写入
   * @param datas
   * @returns
   */
  public bulkCreate<T>(datas: T[]): Promise<Event[]> {
    this.handleDatabaseEvent('bulkCreate', datas);
    const storePromise = datas.map((data) => {
      return new Promise<Event>((resolve, reject) => {
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
   * 数据更新
   * @param data
   * @returns
   */
  public update<T>(data: T): Promise<any> {
    this.handleDatabaseEvent('update', data);
    return new Promise((resolve, reject) => {
      const result = this.dbDatabaseStore.put(data);
      result.onsuccess = (e) => {
        resolve(e);
      };
      result.onerror = (e) => {
        reject(e);
      };
    });
  }

  /**
   * 批量拉取
   */
  public findAll<T = unknown>(options?: IDBDatabaseWhereOptions<T>): Promise<Array<T>> {
    this.handleDatabaseEvent('findAll', options);
    return new Promise((resolve, reject) => {
      let request: IDBRequest;
      // 判断是否有索引 且存在索引
      if (typeof options?.index === 'string' && this.dataModule.columns.find((col) => col.index === options.index)) {
        request = this.dbDatabaseStore.index(options.index).getAll(options?.key, options?.limit);
      } else {
        request = this.dbDatabaseStore.getAll(options?.key, options?.limit);
      }

      // 成功
      request.onsuccess = () => {
        resolve(objArrayAttrbuteFilter<T>(request.result, options?.attributes || []));
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
  public findAllLike<T = any>(options?: Pick<IDBDatabaseWhereOptions, 'limit' | 'like' | 'attributes'>): Promise<T[]> {
    this.handleDatabaseEvent('findAllLike', options);
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
            if (options.attributes?.length) {
              const value = options.attributes.reduce((result, attr) => {
                result[attr] = cursor.value[attr];
                return result;
              }, {} as T);
              list.push(value);
            } else {
              list.push(cursor.value);
            }
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
  public findByPk<T = Object>(key: IDBDatabaseWhereOptions['key']): Promise<T> {
    this.handleDatabaseEvent('findByPk', key);
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
    this.handleDatabaseEvent('clear');
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
    this.handleDatabaseEvent('count');
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
    this.handleDatabaseEvent('destory');
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
