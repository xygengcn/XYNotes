import Database from '@/services/database';

// 数据库
const database = new Database({
  name: 'XYNOTES_V3',
  version: 1,
  modules: [
    { name: 'notes', primary: 'nid', columns: [] },
    { name: 'configs', primary: 'key', columns: [] },
  ],
});

export default database;
