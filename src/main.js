import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import "./assets/style/master.css";
import "./assets/style/theme-dark.css";
import "./assets/style/mobie.css";

Vue.use(ElementUI);

const utils = require("./utils/utils.js");
const plugins = require("@/plugins/index.js");

Vue.use(utils);

Vue.prototype.$plugins = plugins.default;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    window.xy = this.$plugins;
  }
}, ).$mount('#app')