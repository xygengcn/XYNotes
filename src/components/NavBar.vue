<!-- 工具栏 -->
<template>
    <div class="header" :style="{'width':width}">
        <div class="toolBar">
            <el-button class="el-icon-s-fold" @click="Triggle" v-if="isTriggle &&!isMobie" plain></el-button>
            <el-button class="el-icon-s-unfold" @click="Triggle" v-if="!isTriggle &&!isMobie" plain></el-button>
            <el-button :class="note.mark?'el-icon-star-on':'el-icon-star-off'" @click="markNote(note)" plain>
            </el-button>
            <el-button class="el-icon-delete" aria-hidden="true" @click="delNote(note)" plain></el-button>
            <el-button class="el-icon-camera-solid" @click="screenShot" plain></el-button>
            <el-button class="el-icon-full-screen" @click="fullScreen" plain></el-button>
            <el-button @click="isShow=true" plain>Aa</el-button>
            <el-button class="el-icon-view" @click="editMode(0)" v-if="mode == 1" plain></el-button>
            <el-button class="el-icon-edit" @click="editMode(1)" v-if="mode != 1" plain></el-button>
            <el-button plain @click="editMode(2)" v-if="!isMobie">MD</el-button>
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
                isShow: false,
                width: "100%"
            };
        },
        computed: {
            note() {
                return this.$store.state.note;
            },
            isMobie() {
                return this.$store.state.isMobie;
            }
        },
        created() {
            if (!this.isMobie) {
                if (document.documentElement.clientWidth > 978) {
                    this.width = "auto"
                } else {
                    this.width = document.documentElement.clientWidth - 373 + "px"
                }
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
                    if(this.isMobie){
                        this.$router.go(-1);
                    }
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
        margin: 15px 0px;
        padding: 0px 50px;
        display: flex;
        box-sizing: border-box;
    }

    .mobie .header {
        height: 50px;
        line-height: 50px;
        flex-direction: column;
        margin: 20px 0px 10px;
        padding: 0px 20px;
    }

    .header .toolBar {
        height: 100%;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
    }

    .header .toolBar::-webkit-scrollbar {
        display: none;
    }

    .header .toolBar {
        display: flex;
        align-items: center;
    }

    .header button:hover,
    .header button:focus,
    .active {
        border-color: #2dbe60;
        color: #2dbe60;
        outline: 0;
    }

    .header button {
        box-sizing: border-box;
        font-size: 1em;
        border: none;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .1);
    }

    .pc .header button:hover {
        box-shadow: 0 2px 8px 2px rgba(0, 0, 0, .1);
    }

    .el-button+.el-button {
        margin-left: 20px;
    }
</style>
