<!-- 工具栏 -->
<template>
    <div class="navbar" id="navbar" :style="{'width':width}">
        <div class="toolBar">
            <p style="padding: 0px 10px;">
                <el-button class="el-icon-s-fold" @click="Triggle" v-if="isTriggle &&!isMobie" plain></el-button>
                <el-button class="el-icon-s-unfold" @click="Triggle" v-if="!isTriggle &&!isMobie" plain></el-button>
                <el-button class="el-icon-view" @click="editMode(0)" v-if="mode != 0" plain></el-button>
                <el-button class="el-icon-edit" @click="editMode(1)" v-if="mode == 0" plain></el-button>
                <el-button plain @click="editMode(2)" v-if="!isMobie">MD</el-button>
                <el-button :class="note.mark?'el-icon-star-on':'el-icon-star-off'" @click="markNote(note)" plain></el-button>
                <el-button class="el-icon-camera-solid" @click="screenShot" plain></el-button>
                <el-button class="el-icon-full-screen" @click="fullScreen" plain></el-button>
                <el-button @click="isShow=true" plain>Aa</el-button>
                <el-button class="el-icon-delete" aria-hidden="true" @click="delNote(note)" plain></el-button>
            </p>
        </div>
        <FontDialog :isShow="isShow" @close="isShow=false"></FontDialog>
    </div>
</template>

<script>
import FontDialog from "@/components/main/navbar/FontDialog";
export default {
    props: ["isFullScreen"],
    components: {
        FontDialog,
    },
    data() {
        return {
            mode: 0,
            isTriggle: true,
            isShow: false,
            width: "100%",
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
        editMode(mode) {
            this.mode = mode;
            this.$emit("editMode", mode);
        },
        markNote(item) {
            this.$store.commit("SET_NOTE_MARK", item);
        },
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
            this.$emit("screenShot");
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
