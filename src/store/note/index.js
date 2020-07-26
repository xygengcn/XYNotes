export default {
    //选择笔记
    setActive(state, item) {
        state.note = item;
    },
    //删除笔记
    delNote: function(state, item) {
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
    markNote: function(state, item) {
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
            created: new Date().getTime(),
            updated: new Date().getTime()
        };
        if (state.data.configs.listSort.order == "desc") {
            state.data.notes.unshift(temp);
        } else {
            state.data.notes.push(temp);
        }
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
    setTitle: function(state, text) {
        state.note.title = text;

    },
    //检查删除空笔记
    removeNote: function(state) {
        if (state.note.title == "" && state.note.text == "") {
            state.data.notes = state.data.notes.filter(function(item) {
                return item !== state.note;
            })
            state.note = state.data.notes[0];
        }
    },
    setData(state, data) {
        state.data = data;
    },
    //设置所有笔记
    setNotes(state, notes = state.data.notes) {

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
        state.data.notes = notes.sort(compare());
        state.note = state.data.notes[0];
    }
}