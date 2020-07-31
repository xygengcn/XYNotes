import Vue from 'vue'
import Vuex from 'vuex'
import note from "./note/index"
import plugin from "./plugin/index"
Vue.use(Vuex)

import storage from './data/data';
const sysConfig = require("../../package.json");
var defaultData = require("./default.json");
var isMobie = false;
if (document.body.clientWidth < 1024) {
    isMobie = true;
}
export default new Vuex.Store({
    state: {
        data: defaultData,
        note: defaultData.notes[0],
        isMobie: isMobie, //判断移动设备
        loading: { //加载状态
            status: false,
            text: "拼命加载中"
        },
        history: []
    },
    mutations: {
        ...note.mutations,
        ...plugin.mutations,
        SET_DATA_ITEM(state, {
            key,
            value
        }) {
            state.data[key] = value
        },
        //修改加载状态
        SET_LOADING(state, status, text = "拼命加载中") {
            state.loading.status = status;
            state.loading.text = text;
        },
        //设置排序
        SET_ORDER(state, order) {
            state.data.configs.sortKey = order;
        }

    },
    actions: {
        ...note.actions,
        ...plugin.actions,
        //保存data数据部分
        SAVE_DATA_ITEM(content, key) {
            localStorage.setItem("XYNOTES" + key.toUpperCase(), JSON.stringify(content.state.data[key]));
        },
        //恢复数据
        BACKUP_RECOVER(content, data) {
            content.commit('SET_LOADING', true);
            storage.recover(data.notes).then(() => {
                content.commit("SET_DATA_ALL", data);
                content.dispatch("SAVE_DATA_ITEM", "configs");
                content.dispatch("SAVE_DATA_ITEM", "fonts");
                content.commit('SET_LOADING', false);
            });
        },
        //初始化操作
        START_INIT(content) {
            let keys = ['configs', 'fonts'];
            keys.forEach((item) => {
                let key = "XYNOTES" + item.toUpperCase()
                if (localStorage.getItem(key)) {
                    content.commit("SET_DATA_ITEM", {
                        key: item,
                        value: JSON.parse(localStorage.getItem(key))
                    });
                } else {
                    localStorage.setItem(key, JSON.stringify(content.state.data[item]));
                }
            })
            content.commit("SET_PLUGINS", defaultData.plugins);
            content.commit("SET_DATA_ITEM", {
                key: "version",
                value: sysConfig.version
            });
            return new Promise((resolve) => {
                if (content.state.data.configs.isLocalStorage) {
                    storage.init(content.state.data.notes).then(res => {
                        content.commit("SET_NOTE_ALL", {
                            notes: res,
                            isfirst: true
                        });
                        resolve();
                    })
                }
            })
        }
    },
    modules: {}
})