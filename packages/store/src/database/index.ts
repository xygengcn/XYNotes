import Database from 'ts-database';

// 数据库
const database = new Database({
  name: 'XYNOTES_V3',
  version: 2,
  modules: [
    { name: 'notes', primary: 'nid', columns: [] },
    { name: 'configs', primary: 'key', columns: [] },
    { name: 'notes_archive', primary: 'nid', columns: [] }
  ]
});

export default database;
