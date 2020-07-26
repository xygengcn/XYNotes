import Vue from 'vue'
import Vuex from 'vuex'
import note from "./note/index"
import plugin from "./plugin/index"
Vue.use(Vuex)

import storage from './data/data';
const sysConfig = require("../../package.json");
var defaultData = require("./default.json");
const isMobie = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
) ? true : false;




export default new Vuex.Store({
    state: {
        data: defaultData,
        note: defaultData.notes[0],
        isMobie: isMobie, //判断移动设备
        loading: { //加载状态
            status: false,
            text: "拼命加载中"
        }
    },
    mutations: {
        ...note,
        ...plugin.mutations,

        SET_DATA_ITEM(state, {
            key,
            value
        }) {
            state.data[key] = value
        },
        //修改加载状态
        setLoading(state, status, text = "拼命加载中") {
            state.loading.status = status;
            state.loading.text = text;
        },

        //设置排序
        setOrder(state, order) {
            state.data.configs.listSort = order;
        }

    },
    actions: {
        ...plugin.action,
        SAVE_DATA_ITEM(content, key) {
            localStorage.setItem("XYNOTES" + key.toUpperCase(), JSON.stringify(content.state.data[key]));
        },
        del(content, note) {
            let configs = content.state.data.configs;
            storage.del(configs.isLocalStorage, configs.isWebStorage, note, content.state.data.notes);
        },
        save(content) {
            let configs = content.state.data.configs;
            storage.save(configs.isLocalStorage, configs.isWebStorage, content.state.note, content.state.data.notes);
        },
        //恢复数据
        recover(content, data) {
            content.commit('setLoading', true);
            storage.recover(data.notes).then(() => {
                content.commit("setData", data);
                content.dispatch("SAVE_DATA_ITEM", "configs");
                content.dispatch("SAVE_DATA_ITEM", "fonts");
                content.commit('setLoading', false);
            });
        },
        init(content) {
            let keys = ['configs', 'fonts', 'plugins'];
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
            content.commit("SET_DATA_ITEM", {
                key: "version",
                value: sysConfig.version
            });
            return new Promise((resolve) => {
                if (content.state.data.configs.isLocalStorage) {
                    storage.init(content.state.data.notes).then(res => {
                        content.commit("setNotes", {
                            notes: res,
                            sortkey: content.state.data.configs.listSort
                        });
                        resolve();
                    })
                }
            })
        }
    },
    modules: {}
})