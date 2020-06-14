<!-- 工具栏 -->
<template>
    <div class="header">
        <div class="left">
            <el-tooltip class="item" effect="dark" :content="'收起侧栏'" placement="bottom" v-if="isTriggle &&!isMobie">
                <el-button class="el-icon-s-fold" size="mini" @click="Triggle" plain>
                </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="'展开侧栏'" placement="bottom" v-if="!isTriggle &&!isMobie">
                <el-button class="el-icon-s-unfold" size="mini" @click="Triggle" plain>
                </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="note.mark?'取消标记':'标记'" placement="bottom"
                :disabled="isMobie">
                <el-button :class="note.mark?'el-icon-star-on':'el-icon-star-off'" @click="markNote(note)" size="mini"
                    plain>
                </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除笔记" placement="bottom" :disabled="isMobie">
                <el-button class="el-icon-delete" aria-hidden="true" @click="delNote(note)" size="mini" plain>
                </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="网页截图" placement="bottom" :disabled="isMobie">
                <el-button class="el-icon-camera-solid" size="mini" @click="screenShot" plain></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="全屏" placement="bottom" :disabled="isMobie">
                <el-button class="el-icon-full-screen" size="mini" @click="fullScreen" plain></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="字体" placement="bottom" :disabled="isMobie">
                <el-button size="mini" plain @click="isShow=true">Aa</el-button>
            </el-tooltip>

        </div>
        <div class="right">
            <el-tooltip class="item" effect="dark" content="预览" placement="bottom" :disabled="isMobie" v-if="mode == 1">
                <el-button size="mini" plain class="el-icon-view" @click="editMode(0)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom" :disabled="isMobie" v-if="mode != 1">
                <el-button size="mini" plain class="el-icon-edit" @click="editMode(1)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="双屏模式" placement="bottom" :disabled="isMobie"
                :class="{active:mode==2}" v-if="!isMobie">
                <el-button size="mini" plain @click="editMode(2)">MD</el-button>
            </el-tooltip>
        </div>
        <FontDialog :isShow="isShow" @close="isShow=false"></FontDialog>
    </div>
</template>

<script>
    import FontDialog from "../components/FontDialog"
    export default {
        props: ['isFullScreen'],
        components: {
            FontDialog
        },
        data() {
            return {
                mode: 0,
                isTriggle: true,
                isShow: false
            };
        },
        computed: {
            note() {
                return this.$store.state.note;
            },
            isMobie() {
                return this.$store.state.isMobie ? true : false;
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

    .mobie .header {
        flex-direction: column;
        height: auto;
        line-height: 44px;
        padding: 10px 20px;
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