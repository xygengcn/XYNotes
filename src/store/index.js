import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var data = {
  status: 'success',
  user: 'localhost',
  version: '1.0.0',
  configs: {},
  notes: []
}
data.configs = {
  isUser: false,
  isLocalStorage: true,
  isWebStorage: false
}
data.notes = [{
    title: 'XY笔记本',
    text: 'XY笔记本是XY博客新尝试的一个轻量级的本地笔记本，是一款基于vue框架的笔记本，默认支持markdown语法，存储本地隐私安全，支持截图分享等。',
    html: 'XY笔记本是XY博客新尝试的一个轻量级的本地笔记本，是一款基于vue框架的笔记本，默认支持markdown语法，存储本地隐私安全，支持截图分享等。',
    share: false,
    mark: false,
    reminded: '',
    created: 1574844708303,
    updated: 1574844708302
  },
  {
    title: '示例',
    text: '这里也有一些内容在这里呢!',
    html: '这里也有一些内容在这里呢!',
    mark: true,
    share: false,
    reminded: '',
    created: 1574844708310,
    updated: 1574844708302
  }
];
export default new Vuex.Store({
  state: {
    data: data,
    note: data.notes[0],
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
      this.dispatch("isLocalStorageSave");
    },
    //标记笔记
    markNote: function (state, item) {
      item.mark = !item.mark;
      this.dispatch("isLocalStorageSave");
    },
    //添加笔记
    addNote(state) {
      var temp = {
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
    },
    setNotes(state,notes){
      state.data.notes =notes;
      state.note =state.data.notes[0];
    },
    setConfigs(state,configs){
      state.data.configs =configs;
    }

  },
  actions: {
    isLocalStorageSave(content) {
      localStorage.setItem("XYNOTESDATA", JSON.stringify(content.state.data.notes));
    },
    configSave(content) {
      localStorage.setItem("XYNOTESCONFIGS", JSON.stringify(content.state.data.configs));
    }
  },
  modules: {}
})