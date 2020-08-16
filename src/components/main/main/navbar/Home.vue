<!-- 工具栏 -->
<template>
    <div class="navbar" id="navbar" :style="{'width':width}">
        <div class="toolBar">
            <p style="padding: 0px 10px;">
                <el-button class="el-icon-s-fold" @click="Triggle" v-if="isTriggle &&!isMobie" title="侧收" plain></el-button>
                <el-button class="el-icon-s-unfold" @click="Triggle" v-if="!isTriggle &&!isMobie" title="侧展" plain></el-button>
                <el-button class="el-icon-view" @click="editMode(0)" v-if="mode != 0" title="预览模式" plain></el-button>
                <el-button class="el-icon-edit" @click="editMode(1)" v-if="mode == 0" title="编辑模式" plain></el-button>
                <el-button @click="editMode(2)" v-if="!isMobie" title="双屏模式" plain>MD</el-button>
                <el-button class="el-icon-unlock" v-if="!note.password" @click="lock()" title="未加密" plain></el-button>
                <el-button class="el-icon-lock" v-if="note.password" @click="lock()" title="已加密" plain></el-button>
                <el-button :class="note.mark?'el-icon-star-on':'el-icon-star-off'" @click="markNote(note)" title="标记" plain></el-button>
                <el-button class="el-icon-camera-solid" @click="screenShot" title="截屏" plain></el-button>
                <el-button class="el-icon-full-screen" @click="fullScreen" title="全屏" plain></el-button>
                <el-button @click="isShowFontDialog=true" title="字体" plain>Aa</el-button>
                <el-button class="el-icon-delete" aria-hidden="true" @click="delNote(note)" title="删除" plain></el-button>
            </p>
        </div>
        <FontDialog :isShow="isShowFontDialog" @close="isShowFontDialog=false"></FontDialog>
        <screenShot :img="img" @close="isShowScreenShotDialog =false" :isShow="isShowScreenShotDialog"></screenShot>
    </div>
</template>

<script>
import FontDialog from "@/components/main/main/navbar/FontDialog";
import screenShot from "@/components/main/main/navbar/ScreenShotDialog";
import html2canvas from "@/utils/html2canvas";
export default {
    props: ["isFullScreen", "mode"],
    components: {
        FontDialog,
        screenShot,
    },
    data() {
        return {
            isTriggle: true,
            isShowFontDialog: false,
            isShowScreenShotDialog: false,
            width: "100%",
            img: {
                url: "",
                download: "",
                name: "",
            },
        };
    },
    computed: {
        note() {
            return this.$store.state.note;
        },
        isMobie() {
            return this.$store.state.isMobie;
        },
    },
    updated() {
        if (!this.isMobie) {
            if (document.documentElement.clientWidth > 978) {
                this.width = "auto";
            } else {
                this.width = document.documentElement.clientWidth - 373 + "px";
            }
        }
    },
    methods: {
        //修改密码
        lock() {
            this.$prompt("请输入密码", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputType: "password",
                inputValue: this.note.password,
            })
                .then(({ value }) => {
                    this.$store.commit("SET_NOTE_PASSWORD", value);
                    this.$message({
                        type: "success",
                        message: "修改成功",
                    });
                })
                .catch((err) => {
                    this.$message({
                        type: "info",
                        message: err,
                        duration: 500,
                    });
                });
        },
        //删除
        delNote(item) {
            this.$confirm("是否删除笔记?", "提示", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                confirmButtonClass: "el-button--danger",
                type: "warning",
            })
                .then(() => {
                    this.$store.dispatch("DELETE_NOTE", item);
                    if (this.isMobie) {
                        this.$router.go(-1);
                    }
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        //切换编辑
        editMode(mode) {
            this.$emit("editMode", mode);
        },
        //标记
        markNote(item) {
            this.$store.commit("SET_NOTE_MARK", item);
        },
        //全屏
        fullScreen() {
            this.$emit("fullScreen", this.isFullScreen);
        },
        //侧栏伸缩
        Triggle() {
            this.isTriggle = !this.isTriggle;
            this.$emit("Triggle", this.isTriggle);
        },
        //截图
        screenShot() {
            if (this.mode == 0) {
                this.HtmlToImage();
            } else {
                this.$notify({
                    title: "编辑模式不可截图分享",
                    type: "warning",
                });
            }
        },
        //生成图片
        HtmlToImage() {
            let el = document.querySelector("#screenArea");
            var option = {
                useCORS: true,
                scale: 2,
            };
            this.$store.commit("SET_LOADING", true);

            html2canvas(el, option).then((canvas) => {
                this.$store.commit("SET_LOADING", false);
                this.img.url = canvas.toDataURL("image/png");
                this.img.download = this.$utils.base64ImgtoFile(
                    this.img.url,
                    this.note.title
                );
                this.img.name = this.img.download.name;
                this.img.download = this.$utils.dataToUrl(this.img.download);
                this.isShowScreenShotDialog = true;
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.navbar {
    height: 65px;
    line-height: 65px;
    margin: 15px 0px;
    display: flex;
    box-sizing: border-box;
    padding: 0px 40px;

    .toolBar {
        height: 100%;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        display: flex;
        align-items: center;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    button:hover,
    button:focus,
    .active {
        border-color: $theme-color;
        color: $theme-color;
        outline: 0;
    }

    button {
        box-sizing: border-box;
        font-size: 1em;
        border: none;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);

        &:hover {
            box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.1);
        }
    }
}
</style>
