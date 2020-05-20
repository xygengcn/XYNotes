<!-- 工具栏 -->
<template>
    <div>
        <div class="header">
            <div class="left">
                <el-tooltip class="item" effect="dark" :content="'收起侧栏'" placement="bottom" v-if="isTriggle">
                    <el-button class="el-icon-s-fold" size="mini" @click="Triggle" plain>
                    </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="'展开侧栏'" placement="bottom" v-if="!isTriggle">
                    <el-button class="el-icon-s-unfold" size="mini" @click="Triggle" plain>
                    </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="note.mark?'取消标记':'标记'" placement="bottom">
                    <el-button :class="note.mark?'el-icon-star-on':'el-icon-star-off'" @click="markNote(note)"
                        size="mini" plain>
                    </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除笔记" placement="bottom">
                    <el-button class="el-icon-delete" aria-hidden="true" @click="delNote(note)" size="mini" plain>
                    </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="网页截图" placement="bottom">
                    <el-button class="el-icon-camera-solid" size="mini" @click="screenShot" plain></el-button>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
                    <el-button class="el-icon-full-screen" size="mini" @click="fullScreen" plain></el-button>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="更多" placement="bottom">
                    <el-button class="el-icon-more" size="mini" plain></el-button>
                </el-tooltip>
            </div>
            <div class="right">
                <el-tooltip class="item" :class="{active:mode==0}" effect="dark" :content="'浏览模式'" placement="bottom">
                    <el-button v-text="'浏览模式'" @click="editMode(0)" size="mini" plain></el-button>
                </el-tooltip>
                <el-tooltip class="item" :class="{active:mode==1}" effect="dark" :content="'编辑模式'" placement="bottom">
                    <el-button v-text="'编辑模式'" @click="editMode(1)" size="mini" plain></el-button>
                </el-tooltip>
                <el-tooltip class="item" :class="{active:mode==2}" effect="dark" content="双屏模式" placement="bottom">
                    <el-button @click="editMode(2)" size="mini" plain>MD模式</el-button>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['isFullScreen'],
        data() {
            return {
                mode: 0,
                isTriggle: true
            };
        },
        computed: {
            note() {
                return this.$store.state.note;
            }
        },
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
            editMode(mode) {
                this.mode = mode;
                this.$emit("editMode", mode);
            },
            markNote(item) {
                this.$store.commit("markNote", item);
            },
            fullScreen() {
                this.$emit("fullScreen", this.isFullScreen);
            },
            //侧栏伸缩
            Triggle() {
                this.isTriggle = !this.isTriggle;
                this.$emit('Triggle', this.isTriggle)
            },
            //截图
            screenShot() {
                this.$emit('screenShot');
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