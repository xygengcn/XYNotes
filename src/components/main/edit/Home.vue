<!-- 编辑区 -->
<template>
    <div class="EditHome">
        <div class="EditHeader">
            <input type="text" class="title" :value="activeNoteText.title" @blur="editTitle" placeholder="写下笔记标题" />
            <em class="tag">正在编辑</em>
        </div>
        <div class="EditContain">
            <textarea id="EditArea" class="EditArea" :value="activeNoteText.text" @blur="editNote" @input="autoSave" @keydown="handleEvent" placeholder="直接开始输入" ref="EditArea" @contextmenu.prevent="context_menu" @click="isContextMenu =false" :style="{'font-size':font.size+'px','line-height':font.lineHeight+'em'}"></textarea>
            <div class="contextmenu" :style="contextMenuStyle" v-show="isContextMenu">
                <ul>
                    <li @click="copy">复制</li>
                    <li @click="insertImg">图片</li>
                    <li>引用</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import markdown from "@/utils/markdown/markdown";
export default {
    components: {},
    data() {
        return {
            autosave: null,
            isSave: true, //防止多次保存
            contextMenuStyle: {},
            isContextMenu: false,
            selectText: "",
        };
    },
    computed: {
        activeNoteText() {
            return this.$store.state.note;
        },
        font() {
            return this.$store.state.data.fonts;
        },
    },
    watch: {},
    methods: {
        //编辑文本
        editNote: function (e) {
            if (!this.isSave) {
                this.save(e);
                clearTimeout(this.autosave);
                this.saveToSql();
            }
        },
        //更新标题
        editTitle: function (e) {
            var text = e.target.value;
            this.$store.commit("setTitle", text);
            this.editTime();
            this.saveToSql();
        },
        //更新时间
        editTime: function () {
            var time = this.$utils.time();
            this.$store.commit("setTime", time);
        },
        //无操作5s自动操作
        autoSave: function (e) {
            this.isSave = false;
            this.save(e);
            if (this.autosave != null) {
                clearTimeout(this.autosave);
            }
            this.autosave = setTimeout(() => {
                this.saveToSql();
            }, 5000);
        },
        //保存
        save(e) {
            var text = e.target.value;
            this.$store.commit("setText", text);
            this.string = markdown(text);
            this.$store.commit("setHtml", this.string);
            this.editTime();
            this.$store.commit("removeNote");
        },
        //保存到本地或者数据库
        saveToSql() {
            clearTimeout(this.autosave);
            this.isSave = true;
            if (this.$store.state.data.configs.isLocalStorage) {
                this.$store.dispatch("save");
            }

            console.log(
                "自动保存成功———" +
                    this.$utils.time(new Date(), "yyy-MM-dd HH:mm:ss")
            );

            /**
             * 自动保存Hook
             */
            this.$plugins.hook("saved", [this.activeNoteText]);
        },
        //键盘监听
        handleEvent(event) {
            if (event.keyCode === 83 && event.ctrlKey) {
                this.saveToSql();
                this.$message({
                    message: "保存成功",
                    type: "success",
                });
                event.preventDefault();
                event.returnValue = false;
                return false;
            }
            if (event.keyCode == 9) {
                this.insertText(this.$refs.EditArea, "\t");
                if (event.preventDefault) {
                    event.preventDefault();
                }
            }
        },
        //插入文本
        insertText(obj, tabStr) {
            if (document.selection) {
                var sel = document.selection.createRange();
                sel.text = tabStr;
            } else if (
                typeof obj.selectionStart === "number" &&
                typeof obj.selectionEnd === "number"
            ) {
                var startPos = obj.selectionStart,
                    endPos = obj.selectionEnd,
                    cursorPos = startPos,
                    tmpStr = obj.value;
                obj.value =
                    tmpStr.substring(0, startPos) +
                    tabStr +
                    tmpStr.substring(endPos, tmpStr.length);
                cursorPos += tabStr.length;
                obj.selectionStart = obj.selectionEnd = cursorPos;
            } else {
                obj.value += tabStr;
            }
        },
        //右键监听
        context_menu(e) {
            //获取选中文字
            this.selection = document.Selection
                ? document.selection.createRange().text
                : window.getSelection().toString();
            this.isContextMenu = true;
            this.contextMenuStyle = {
                left: e.clientX + "px",
                top: e.clientY + "px",
            };
        },
        //复制
        copy() {
            this.isContextMenu = false;
            this.$utils
                .copy(this.selection)
                .then(() => {
                    this.$message({
                        message: "复制成功",
                        type: "success",
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        insertImg() {
            this.isContextMenu = false;
            this.$prompt("图片地址", "插入图片", {
                confirmButtonText: "插入",
                cancelButtonText: "取消",
                inputPattern: /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/,
                inputErrorMessage: "图片地址不正确",
            })
                .then(({ value }) => {
                    this.insertText(this.$refs.EditArea, `![](${value})`);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消插入",
                    });
                });
        },
    },
};
</script>
<style lang='scss' scoped>
.EditHome {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;

    /* 标题 */
    .EditHeader {
        height: 60px;
        margin-top: 10px;
        padding: 0 50px;
        position: relative;

        .title {
            &::-webkit-input-placeholder,
            & {
                width: 100%;
                height: 60px;
                line-height: 60px;
                border: none;
                outline: none;
                font-family: caecilia, times, serif;
                font-size: 28px;
                font-weight: 300;
                color: #2dbe60;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .tag {
            position: absolute;
            font-style: normal;
            top: 0;
            bottom: 0;
            margin: auto;
            height: 1.5em;
            line-height: 1.5em;
            font-size: 12px;
            right: 50px;
            padding: 2px 5px;
            box-sizing: border-box;
            display: inline-block;
            background: #f7f7f7;
            color: #adacac;
        }
    }

    .EditContain {
        width: 100%;
        height: 100%;
        padding-left: 50px;
        box-sizing: border-box;

        /* 正文 */
        .EditArea {
            font-family: gotham, helvetica, arial, sans-serif;
            width: 100%;
            box-sizing: border-box;
            height: 100%;
            border: none;
            outline: none;
            border-top: 1px solid #f7f7f7;
            border-radius: 0;
            font-size: 14px;
            line-height: 1.5em;
            resize: none;
            padding: 15px 50px 50px 0px;
            -webkit-appearance: none;
            position: relative;
            color: #383838;
        }
    }
}

/*右键 */
.contextmenu {
    position: fixed;
    background: #fff;
    border: 1px solid #eee;
    box-shadow: $box-shadow;
    border-radius: 1px;
    border-radius: 3px;
    z-index: 999;

    ul {
        &,
        li {
            text-decoration: none;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        li {
            text-align: center;
            padding: 15px 20px;
            cursor: pointer;
            &:hover {
                background-color: $theme-color;
                color: #fff;
            }
        }
    }
}
</style>