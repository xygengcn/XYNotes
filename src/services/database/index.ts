/**
 * indexeddb数据库原型
 */

import DBDatabaseModule from './dbdabase';

export interface IDatabaseOptions {
  name: string;
  version: number;
  modules: IDatabaseModules[];
}

/**
 * 列属性
 */
export interface IDatabaseModulesColumn {
  name: string;
  index?: string;
  attributes?: {
    multiEntry?: boolean;
    unique?: boolean;
  };
}

export interface IDatabaseModules {
  name: string;
  primary: string;
  columns: Array<IDatabaseModulesColumn>;
}

export default class Database {
  // 数据库名
  private databaseName!: string;

  // 数据库版本
  private databaseVersion!: number;

  // 数据库模型
  private databaseModules!: Record<string, IDatabaseModules>;

  // 数据库句柄
  private database!: IDBDatabase;

  constructor(options: IDatabaseOptions) {
    this.databaseName = options.name;
    this.databaseVersion = options.version;
    if (!window.indexedDB) {
      throw new Error('浏览器不支持indexedDB');
    } else {
      this.databaseModules = options?.modules.reduce((obj: Record<string, IDatabaseModules>, module) => {
        obj[module.name] = module;
        return obj;
      }, {});
    }
  }

  /**
   * 数据库连接
   */
  private connectDatabase(): Promise<IDBDatabase> {
    if (!window.indexedDB) {
      return Promise.reject('浏览器不支持indexedDB');
    }
    if (this.database) {
      return Promise.resolve(this.database);
    }
    const request = indexedDB.open(this.databaseName, this.databaseVersion);
    return new Promise((resolve, reject) => {
      // 成功连接
      request.onsuccess = (e: Event) => {
        if (request.result) {
          this.database = request.result;
          resolve(this.database);
        } else {
          reject(e);
        }
      };
      // 失败
      request.onerror = (e) => {
        reject(e);
      };

      // 有更新
      request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
        if (request.result) {
          // 初始化所有表
          Object.values(this.databaseModules).forEach((module) => {
            if (!request.result.objectStoreNames.contains(module.name)) {
              const databasaeModule = request.result.createObjectStore(module.name, {
                keyPath: module.primary,
              });
              module.columns.forEach((column) => {
                if (column.index) {
                  databasaeModule.createIndex(column.name, column.index, column.attributes || {});
                }
              });
            }
          });
          request.transaction.oncomplete = () => {
            this.database = request.result;
            resolve(this.database);
          };
        } else {
          reject(e);
        }
      };
    });
  }

  /**
   *
   * 获取表连接
   *
   * @param moduleName
   * @returns
   */
  public module(moduleName: string): Promise<DBDatabaseModule> {
    if (!this.databaseModules[moduleName]) {
      return Promise.reject(`数据库未定义${moduleName}`);
    }
    return this.connectDatabase()
      .then((database) => {
        const databaseStore = database.transaction(moduleName, 'readwrite').objectStore(moduleName);
        return new DBDatabaseModule(databaseStore, this.databaseModules[moduleName]);
      })
      .catch((e) => {
        return Promise.reject(new Error(`数据库未定义${moduleName}: ${e}`));
      });
  }

  /**
   * 删库
   * @returns
   */
  public destroy(): IDBOpenDBRequest {
    return indexedDB.deleteDatabase(this.databaseName);
  }
}
