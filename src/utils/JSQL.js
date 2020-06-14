var JSQL = function (dbName) {
    this.dbName = dbName;
    this.storeName = "";
    this.v = 1;
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!indexedDB) {
        alert("浏览器不支持indexedDB");
        return null;
    }
    this.init = (storeName, v, data = null) => {
        this.v = v;
        this.storeName = storeName;
        this.db = null;
        var request = this.indexedDB.open(this.dbName, this.v); //打开数据库
        return new Promise((resolve, reject) => {
            request.onsuccess = e => {
                this.db = e.target.result;
                var data1 = {
                    id: 1,
                    title: 88,
                    text: 88,
                    created: new Date(),
                    update: 123
                }
                resolve(this);
            };
            request.onerror = e => {
                console.error("数据库打开失败:", e);
                reject(e);
            };
            request.onupgradeneeded = e => {
                this.db = e.target.result;
                if (!this.db.objectStoreNames.contains(this.storeName)) {
                    let dbStore = this.db.createObjectStore(this.storeName, {
                        keyPath: "nid"
                    });
                    dbStore.createIndex("title", "title", {
                        unique: false
                    });
                    dbStore.createIndex("text", "text", {
                        unique: false
                    });
                }
                if (data) {
                    e.target.transaction.oncomplete = (event) => {
                        this.insert(data);
                    }
                }
            }

        })
    }
    //增加数据
    this.insert = (data) => {
        var db = this.db;
        return new Promise((resolve, reject) => {
            if (db != null) {
                var result = null;
                var store = db.transaction(this.storeName, "readwrite").objectStore(this.storeName);
                if (Array.isArray(data)) {
                    data.forEach(item => {
                        result = store.add(item);
                    })
                } else {
                    result = store.add(data);
                }
                result.onsuccess = e => {
                    console.log("添加数据成功");
                    resolve(e);
                };
                result.onerror = e => {
                    console.log("添加数据失败");
                    reject(e);
                };
            }
        })
    };
    //修改
    this.put = (data) => {
        var db = this.db;
        return new Promise((resolve, reject) => {
            var result = db.transaction(this.storeName, "readwrite").objectStore(this.storeName).put(data);
            result.onsuccess = e => {
                console.log("成功");
                resolve(e);
            };
            result.onerror = e => {
                reject(e);
            };
        })
    };
    //查询
    this.fetchAll = () => {
        var list = [];
        var db = this.db;
        return new Promise((resolve, reject) => {
            var store = db.transaction(this.storeName, "readwrite").objectStore(this.storeName);
            var cursor = store.openCursor();
            cursor.onsuccess = e => {
                var result = e.target.result;
                if (result) {
                    list.push(result.value);
                    result.continue();
                } else {
                    list = list === undefined ? [] : list;
                    resolve(list);
                }
            };
        })
    };
    this.select = (index, value) => {
        var db = this.db;
        return new Promise((resolve, reject) => {
            if (value)
                var request = db.transaction(this.storeName, "readonly").objectStore(this.storeName).index(index).get(value);
            else
                var request = db.transaction(this.storeName, "readonly").objectStore(this.storeName).get(index);
            request.onerror = function (e) {
                reject(e);
            };
            request.onsuccess = function (e) {
                var result = e.target.result === undefined ? [] : e.target.result;
                resolve(result);
            };
        })
    }
    //删除
    this.delete = (index) => {
        var db = this.db;
        return new Promise((resolve, reject) => {
            var result = db.transaction(this.storeName, "readwrite").objectStore(this.storeName).delete(index);
            result.onsuccess = e => {
                console.log("删除事务成功", e);
                if (result.result) {
                    resolve(result.result);
                }
            };
            result.onerror = e => {
                console.log("删除事务失败", e);
                reject(e);
            };
        })
    },
    //删除数据库
    this.deleteDB = () => {
        return new Promise((resolve, reject) => {
            var result = this.indexedDB.deleteDatabase(this.dbName); 
            result.onsuccess = e => {
                console.log("删除成功", e);
                if (result.result) {
                    resolve(result.result);
                }
            };
            result.onerror = e => {
                console.log("删除失败", e);
                reject(e);
            };
        })
    }


}
export default JSQL;

// var db = new JSQL('XYNOTES');
// var data = [{
//     id: 2,
//     title: 1,
//     text: 123123,
//     created: new Date(),
//     update: 123
// }, {
//     id: 1,
//     title: 1,
//     text: 123123,
//     created: new Date(),
//     update: 123
// }]
// var data1 = {
//     id: 13,
//     title: 88,
//     text: 88,
//     created: new Date(),
//     update: 123
// }

// db.init("notes", 2).then((e) => {
//     //e.insert2(data);
//     e.fetchAll().then(res => {
//         console.log(res)
//     })
//     // e.put(data1);
//     //e.delete(13)
//     // e.select(10).then(res => {
//     //      console.log(res)
//     // })
// });