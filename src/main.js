import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/style/master.css";
import "@/assets/style/theme-dark.css";
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
        window.vue = this;
        window.$plugins = plugins;
    }
}, ).$mount('#app')