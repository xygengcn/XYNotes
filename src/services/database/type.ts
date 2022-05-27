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

export type DBDatabaseEventType =
  | 'bulkCreate'
  | 'update'
  | 'findAll'
  | 'findAllLike'
  | 'findByPk'
  | 'clear'
  | 'count'
  | 'drop'
  | 'destory';
export type DBDatabaseEvent = (
  event: DBDatabaseEventType,
  content: { store: IDBObjectStore; module: IDatabaseModules; data?: any }
) => void;
