import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import storage from './data';
const sysConfig = require("../../package.json");
var defaultData = require("./default.json");
const isMobie = navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
)?true:false;
export default new Vuex.Store({
  state: {
    data: defaultData,
    note: defaultData.notes[0],
    isMobie: isMobie
  },
  mutations: {
    //选择笔记
    setActive(state, item) {
      state.note = item;
    },
    //删除笔记
    delNote: function (state, item) {
      for (var i = 0, len = state.data.notes.length; i < len; i++) {
        if (state.data.notes[i] == item) {
          if (state.data.notes[i] == state.note) {
            state.note = state.data.notes[0];
          }
          state.data.notes.splice(i, 1);
          break;
        }
      }
      this.dispatch("del", item);
    },
    //标记笔记
    markNote: function (state, item) {
      item.mark = !item.mark;
      this.dispatch("save");
    },
    //添加笔记
    addNote(state) {
      var temp = {
        nid: new Date().getTime(),
        title: '示例',
        text: '这里也有一些内容在这里呢！',
        html: '这里也有一些内容在这里呢！',
        mark: false,
        share: false,
        reminded: '',
        created: new Date(),
        updated: new Date()
      };
      state.data.notes.push(temp);
      state.note = temp;
    },
    //设置初始文本
    setText(state, text) {
      state.note.text = text;
    },
    //设置html文本
    setHtml(state, html) {
      state.note.html = html;
    },
    //设置时间
    setTime(state, time) {
      state.note.updated = time;
    },
    //设置笔记标题
    setTitle: function (state, text) {
      state.note.title = text;

    },
    //检查删除空笔记
    removeNote: function (state) {
      if (state.note.title == "" && state.note.text == "") {
        state.data.notes = state.data.notes.filter(function (item) {
          return item !== state.note;
        })
        state.note = state.data.notes[0];
      }
    },
    //初始数据
    setData(state, data) {
      state.data = data;
      this.dispatch("save");
    },
    setNotes(state, notes) {
      state.data.notes = notes;
      state.note = state.data.notes[0];
    },
    setConfigs(state, configs) {
      state.data.configs = configs;
    },
    setFont(state, font) {
      state.data.font = font;
    }

  },
  actions: {
    del(content, note) {
      let configs = content.state.data.configs;
      storage.del(configs.isLocalStorage, configs.isWebStorage, note, content.state.data.notes);
    },
    save(content) {
      console.log(content.state.data);
      let configs = content.state.data.configs;
      storage.save(configs.isLocalStorage, configs.isWebStorage, content.state.note, content.state.data.notes);
    },
    configSave(content) {
      let configs = content.state.data.configs;
      configs.version = sysConfig.version;
      localStorage.setItem("XYNOTESCONFIGS", JSON.stringify(configs));
    },
    fontSave(content) {
      localStorage.setItem("XYNOTESFONT", JSON.stringify(content.state.data.font));
    },
    init(content) {
      if (localStorage.getItem("XYNOTESCONFIGS")) {
        content.commit("setConfigs", JSON.parse(localStorage.getItem("XYNOTESCONFIGS")))

      } else {
        localStorage.setItem("XYNOTESCONFIGS", JSON.stringify(content.state.data.configs));
      }
      if (localStorage.getItem("XYNOTESFONT")) {
        content.commit("setFont", JSON.parse(localStorage.getItem("XYNOTESFONT")))
      } else {
        localStorage.setItem("XYNOTESFONT", JSON.stringify(content.state.data.font));
      }
      if (content.state.data.configs.isLocalStorage) {
        storage.init(content.state.data.notes).then(res => {
          content.commit("setNotes", res);
        })
      }
    }
  },
  modules: {}
})