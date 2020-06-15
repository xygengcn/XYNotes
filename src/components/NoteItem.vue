<!-- 列表样式 -->
<template>
    <div class="itemContent noselect" :class="{'itemActive':data === note}">
        <div class="title">{{data.title}}</div>
        <div class="itemTime">
            <span>{{$utils.timeToDate(data.updated)}}</span>
        </div>
        <small class="content">{{data.text | subInfor}}</small>
        <div class="itemTool" v-if="!isMobie">
            <i :class="data.mark?'el-icon-star-on':'el-icon-star-off'" :title="data.mark?'取消标记':'标记'"
                @click="markNote(data)"></i>
            <i class="el-icon-delete" aria-hidden="true" title="删除笔记" @click="delNote(data)"></i>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["data"],
        methods: {
            delNote(item) {
                this.$confirm('是否删除笔记?', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    confirmButtonClass: "el-button--danger",
                    type: 'warning'
                }).then(() => {
                    this.$store.commit("delNote", item);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            markNote(item) {
                this.$store.commit("markNote", item);
            }
        },
        computed: {
            note() {
                return this.$store.state.note;
            },
            isMobie() {
                return this.$store.state.isMobie;
            }
        },
        filters: {
            subInfor: function (value) {
                if (value.length && value.length < 50) return value;
                else return value.substring(0, 50) + "...";
            }
        }
    }
</script>
<style scoped>
    .itemContent {
        box-sizing: border-box;
        padding: 20px 24px;
        border: 2px solid transparent;
        border-bottom: 2px #eeeeee solid;
        position: relative;
    }

    .mobie .itemContent {
        box-shadow: 0 2px 8px 2px rgba(0, 0, 0, .1);
        margin: 10px;
        border-radius: 4px;
    }

    .pc .itemContent:hover,
    .pc .itemActive {
        border-color: #2dbe60;
    }

    .itemContent:hover i {
        color: #2dbe60;
    }

    .itemContent .itemTool {
        text-align: center;
        margin: 10px 24px;
        color: #fff;
        position: absolute;
        right: 0px;
        top: 0px;
        height: 30px;
        line-height: 30px;
    }

    .itemContent .itemTool i {
        margin: 0px 5px;
        font-size: 20px;
    }

    .itemContent .title {
        font-family: gotham, helvetica, arial, sans-serif;
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

    .itemContent .content,
    .itemTime {
        color: #878787;
    }

    .itemContent .itemTime {
        margin-bottom: 10px;
        font-size: 10px;
    }
</style>