import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/style/master.css";
import "@/assets/style/theme-dark.scss";
import "@/assets/style/mobie.scss";

import plugins from "@/plugins/index.js";

Vue.use(ElementUI);

const utils = require("./utils/utils.js");


Vue.use(utils);

Vue.prototype.$plugins = plugins;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        window.$plugins = plugins;
        console.oldLog = console.log;
        console.oldError = console.error;
        console.oldDebug = console.debug;
        console.oldInfo = console.info;
        console.success = function(str) {
            console.oldLog(...arguments);
            store.commit("ADD_LOGS", {
                msg: str,
                type: "success"
            });
        }
        console.log = function(str) {
            console.oldLog(...arguments);
            store.commit("ADD_LOGS", {
                msg: str,
                type: "log"
            });
        }
        console.info = function(str) {
            console.oldInfo(...arguments);
            store.commit("ADD_LOGS", {
                msg: str,
                type: "info"
            });
        }
        console.error = function(str) {
            console.oldError(...arguments);
            store.commit("ADD_LOGS", {
                msg: str,
                type: "error"
            });
        }
        console.debug = function(str) {
            console.oldDebug(...arguments);
            store.commit("ADD_LOGS", {
                msg: str,
                type: "debug"
            });
        }
    }
}, ).$mount('#app')