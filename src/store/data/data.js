//数据保存处理中心
import JSQL from './JSQL'
var storage = {
    dateBaseName: 'XYNOTES',
    noteListName: 'notes',
    orderName: {
        config: 'XYNOTESCONFIGS',
        font: 'XYNOTESFONTS',
        plugin: 'XYNOTESPLUGINS'
    }
};
//初始化数据
storage.init = function (data) {
    let db = new JSQL(storage.dateBaseName);
    return new Promise((resolve, reject) => {
        db.init(storage.noteListName, 1, data).then(e => {
            e.fetchAll().then(res => {
                if (res.length == 0) {
                    if (localStorage.getItem(storage.noteListName)) {
                        resolve(localStorage.getItem(storage.noteListName));
                    } else {
                        resolve([]);
                    }
                } else {
                    resolve(res);
                }
            })
        })
    })
}
//删除文章
storage.del = function (isLocal = true, isWeb = false, note, notes) {
    if (isLocal) {
        let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        let db = new JSQL(storage.dateBaseName)
        if (indexedDB) {
            db.init(storage.noteListName, 1, notes).then((e) => {
                e.delete(note.nid);
            }).catch(e => {
                console.log(e);
            })
        } else {
            this.localStorage(storage.noteListName, notes);
        }
    }
}
//保存文章
storage.save = function (isLocal = true, isWeb = false, note, notes) {
    if (isLocal) {
        let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        let db = new JSQL(storage.dateBaseName)
        if (indexedDB) {
            db.init(storage.noteListName, 1, notes).then((e) => {
                e.put(note);
            }).catch(e => {
                console.log(e);
            })
        } else {
            this.localStorage(storage.noteListName, notes);
        }
    }
}
//恢复数据
storage.recover = function (data) {
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    let db = new JSQL(storage.dateBaseName)
    localStorage.removeItem(storage.noteListName);
    return new Promise((resolve) => {
        if (indexedDB) {
            db.deleteDB().then(e => {
                db.init(storage.noteListName, 1, data).then(e => {
                    resolve(e)
                })
                resolve(e)
            });
        }
    })
}
//恢复出厂
storage.clean = function () {
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    let db = new JSQL(storage.dateBaseName)
    localStorage.removeItem(storage.noteListName);
    for (let item in storage.orderName) {
        localStorage.removeItem(storage.orderName[item]);
    }
    return new Promise((resolve, reject) => {
        if (indexedDB) {
            db.deleteDB().then(res => {
                resolve(res);
            });
        }
    })
}

storage.localStorage = function (key, object) {
    if (typeof object === 'object') {
        localStorage.setItem(key, JSON.stringify(object));
    } else {
        localStorage.setItem(key, object);
    }
}

storage.getStorage = function (key, isObject = true) {
    if (isObject) {
        return JSON.parse(localStorage.getItem(key));
    } else {
        return localStorage.getItem(key); //string
    }
}
export default storage;