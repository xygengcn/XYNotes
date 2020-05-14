<template>
    <div>
        <div class="header">
            <div class="left">
                <el-tooltip class="item" effect="dark" :content="note.mark?'取消标记':'标记'" placement="bottom">
                    <el-button :class="note.mark?'el-icon-star-on':'el-icon-star-off'" plain @click="markNote(note)"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除笔记" placement="bottom">
                    <el-button class="el-icon-delete" aria-hidden="true" plain @click="delNote(note)"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="网页截图" placement="bottom">
                    <el-button class="el-icon-camera-solid" plain></el-button>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="通知" placement="bottom">
                        <el-button class="el-icon-bell" plain></el-button>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="更多" placement="bottom">
                    <el-button class="el-icon-more" plain></el-button>
                </el-tooltip>
            </div>
            <div class="right">
                <el-tooltip class="item" :class="{active:mode==0}" effect="dark" :content="'浏览模式'" placement="bottom">
                    <el-button v-text="'浏览模式'" plain  @click="editMode(0)"></el-button>
                </el-tooltip>
                 <el-tooltip class="item" :class="{active:mode==1}" effect="dark" :content="'编辑模式'" placement="bottom">
                    <el-button v-text="'编辑模式'" plain  @click="editMode(1)"></el-button>
                </el-tooltip>
                <el-tooltip class="item" :class="{active:mode==2}" effect="dark" content="双屏模式" placement="bottom">
                    <el-button plain @click="editMode(2)">MD</el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                mode:0
               
            };
        },
        computed: {
            note() {
                return this.$store.state.note;
            }
        },
        methods: {
            delNote(item) {
                this.$store.commit("delNote", item);
            },
            editMode(mode){
                this.mode =mode;
                this.$emit("editMode",mode);
            },
             markNote(item) {
                this.$store.commit("markNote", item);
            }
        }
    };
</script>
<style lang='css' scoped>
    .header {
        height: 65px;
        line-height: 65px;
        padding: 15px;
        display: flex;
    }

    .header .left {
        flex: 1;
    }

    .header button:hover,
    .header button:focus,
    .active {
        border-color: #2dbe60;
        color: #2dbe60;
        outline: 0;
    }

    .header button {
        font-size: 1em;
    }
</style>