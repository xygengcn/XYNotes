<!-- 列表样式 -->
<template>
    <div class="note item" :class="{'itemActive':data === note}">
        <div class="title">{{data.title}}</div>
        <div class="itemTime">
            <span>{{$utils.timeToDate(data.updated)}}</span>
        </div>
        <div class="itemContent">
            <small>{{intro}}</small>
            <div class="itemContent-cover" v-if="cover">
                <img :src="cover[2]" :alt="cover[1]" />
            </div>
        </div>
        <div class="itemTool" v-if="!isMobie">
            <i :class="data.mark?'el-icon-star-on':'el-icon-star-off'" :title="data.mark?'取消标记':'标记'" @click="markNote(data)"></i>
            <i class="el-icon-delete" aria-hidden="true" title="删除笔记" @click="delNote(data)"></i>
        </div>
    </div>
</template>
<script>
export default {
    props: ["data"],
    methods: {
        delNote(item) {
            this.$confirm("是否删除笔记?", "提示", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                confirmButtonClass: "el-button--danger",
                type: "warning",
            })
                .then(() => {
                    this.$store.dispatch("DELETE_NOTE", item);
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                })
                .catch((e) => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        markNote(item) {
            this.$store.commit("SET_NOTE_MARK", item);
        },
    },
    computed: {
        note() {
            return this.$store.state.note;
        },
        isMobie() {
            return this.$store.state.isMobie;
        },
        cover() {
            let reg = /!\[(.*?)\]\((.*?)\)/;
            let result = this.data.text.match(reg);
            return result;
        },
        history() {
            return this.$store.state.history;
        },
        intro() {
            let isRead = this.history.find((item) => {
                return item == this.data.nid;
            });
            if (isRead ? true : false || !this.data.password) {
                return this.data.text;
            }
            return "********加密********";
        },
    },
};
</script>
<style lang="scss" scoped>
.item {
    box-sizing: border-box;
    padding: 20px 24px;
    border: 1px solid transparent;
    border-bottom: 1px solid #d9d9d9;
    position: relative;
    color: #333;
    cursor: pointer;

    &:hover,
    &.itemActive {
        border-color: $theme-color;
        & i {
            color: #2dbe60;
        }
    }

    .itemTool {
        text-align: center;
        margin: 20px 24px;
        color: #fff;
        position: absolute;
        right: 0px;
        top: 0px;
        height: 30px;
        line-height: 30px;

        i {
            margin: 0px 5px;
            font-size: 20px;
        }
    }

    .title {
        font-size: 18px;
        font-weight: 400;
        height: 30px;
        margin-bottom: 5px;
        max-height: 40px;
        overflow: hidden;
        overflow-wrap: break-word;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: break-word;
        line-height: 30px;
        width: 200px;
    }
    .itemContent {
        display: flex;
        color: #878787;
        small {
            flex: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
        }
        .itemContent-cover {
            position: relative;
            box-sizing: border-box;
            width: 80px;
            overflow: hidden;
            margin-left: 15px;
            max-height: 80px;
            img {
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: 0;
                transform: translate(-50%, -50%);
                height: 100%;
            }
        }
    }
    .itemTime {
        color: #878787;
        margin-bottom: 10px;
        font-size: 12px;
    }
}
</style>