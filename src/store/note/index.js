import storage from '@/store/data/data';
export default {
    mutations: {
        //选择笔记
        SET_NOTE_ACTIVE(state, item) {
            state.note = item;
        },
        //删除笔记
        DELETE_NOTE: function(state, item) {
            for (var i = 0, len = state.data.notes.length; i < len; i++) {
                if (state.data.notes[i] == item) {
                    if (state.data.notes[i] == state.note && i + 1 < len) {
                        state.note = state.data.notes[i + 1];
                    }
                    state.data.notes.splice(i, 1);
                    break;
                }
            }
        },
        //标记笔记
        SET_NOTE_MARK: function(state, item) {
            item.mark = !item.mark;
            this.dispatch("SAVE_TO_LOCAL", item);
        },
        //加密
        SET_NOTE_PASSWORD(state, password) {
            state.note.password = password;
            this.dispatch("SAVE_TO_LOCAL", state.note);
            console.success("笔记《" + state.note.title + "》已修改密码");
        },
        //添加笔记
        ADD_NOTE(state) {
            var temp = {
                nid: new Date().getTime(),
                title: '示例',
                text: '这里也有一些内容在这里呢！',
                html: '这里也有一些内容在这里呢！',
                mark: false,
                share: false,
                reminded: '',
                store: "local",
                password: "",
                created: new Date().getTime(),
                updated: new Date().getTime()
            };
            if (state.data.configs.sortKey.order == "desc") {
                state.data.notes.unshift(temp);
            } else {
                state.data.notes.push(temp);
            }
            state.note = temp;
        },
        //设置初始文本
        SET_NOTE_TEXT(state, text) {
            state.note.text = text;
        },
        //设置html文本
        SET_NOTE_HTML(state, html) {
            state.note.html = html;
        },
        //设置时间
        SET_NOTE_TIME(state, time) {
            state.note.updated = time;
        },
        //设置笔记标题
        SET_NOTE_TITLE: function(state, text) {
            state.note.title = text;

        },
        //检查删除空笔记
        CLEAN_BLANK_NOTE: function(state) {
            if (state.note.title == "" && state.note.text == "") {
                state.data.notes = state.data.notes.filter(function(item) {
                    return item !== state.note;
                })
            }
        },
        SET_DATA_ALL(state, data) {
            state.data = data;
        },
        //设置所有笔记
        SET_NOTE_ALL(state, data = state.data.notes) {
            var sortkey = state.data.configs.sortKey
            //排序
            let compare = () => {
                return (a, b) => {
                    var aa = a[sortkey.key];
                    var bb = b[sortkey.key];
                    if (sortkey.order == "desc") {
                        return bb - aa;
                    } else {
                        return aa - bb;
                    }
                };
            };
            state.data.notes = data.sort(compare());
        },
        ADD_NOTE_READ(state, id) {
            state.notesRead.push(id);
            state.notesRead = Array.from(new Set(state.notesRead));
        }
    },
    actions: {
        DELETE_NOTE(content, note) {
            content.commit("DELETE_NOTE", note);
            let configs = content.state.data.configs;
            storage.del(configs.isLocalStorage, configs.isWebStorage, note, content.state.data.notes);
            console.success("笔记《" + note.title + "》删除成功");
        },
        SAVE_TO_LOCAL(content, note = content.state.note) {
            let configs = content.state.data.configs;
            content.commit("SET_NOTE_ALL");
            storage.save(configs.isLocalStorage, configs.isWebStorage, note, content.state.data.notes);
            console.success("已自动保存笔记《" + note.title + "》");
        },
    }

}