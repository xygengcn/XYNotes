//数据保存处理中心
import JSQL from '../utils/JSQL'
var storage = {};

storage.init = function (data) {
    let db = new JSQL('XYNOTES');
    return new Promise((resolve, reject) => {
        db.init('notes', 1, data).then(e => {
            e.fetchAll().then(res => {
                if (res.length == 0) {
                    if (localStorage.getItem("notes")) {
                        resolve(localStorage.getItem("notes"));
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
storage.del = function (isLocal = true, isWeb = false, note, notes) {
    if (isLocal) {
        let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        let db = new JSQL('XYNOTES')
        if (indexedDB) {
            db.init("notes", 1, notes).then((e) => {
                e.delete(note.nid);
            }).catch(e => {
                console.log(e);
            })
        } else {
            this.localStorage("notes", notes);
        }
    }
}
storage.save = function (isLocal = true, isWeb = false, note, notes) {
    if (isLocal) {
        let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        let db = new JSQL('XYNOTES')
        if (indexedDB) {
            db.init("notes", 1, notes).then((e) => {
                e.put(note);
            }).catch(e => {
                console.log(e);
            })
        } else {
            this.localStorage("notes", notes);
        }
    }
}
storage.recover = function (data) {
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    let db = new JSQL('XYNOTES')
    localStorage.removeItem("notes");
    return new Promise((resolve)=>{
        if (indexedDB) {
            db.deleteDB().then(e=>{
                db.init('notes', 1, data).then(e => {
                    resolve(e)
                })
                resolve(e)
            });
        }
    })
}
storage.clean = function () {
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    let db = new JSQL('XYNOTES')
    localStorage.removeItem("notes");
    localStorage.removeItem("XYNOTESCONFIGS");
    localStorage.removeItem("XYNOTESFONT");
    return new Promise((resolve,reject)=>{
        if (indexedDB) {
            db.deleteDB().then(res=>{
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