<!-- 移动端编辑功能 -->
<template>
    <div class="mobie-note-toolbar">
        <el-button class="el-icon-unlock" v-if="!note.password" @click="lock()" title="未加密" plain></el-button>
        <el-button class="el-icon-lock" v-if="note.password" @click="lock()" title="已加密" plain></el-button>
        <el-button :class="note.mark?'el-icon-star-on':'el-icon-star-off'" @click="markNote(note)" title="标记" plain></el-button>
        <el-button class="el-icon-camera-solid" @click="screenshot" title="截屏" plain></el-button>
        <el-button @click="isShowFontDialog=true" title="字体" plain>Aa</el-button>
        <el-button class="el-icon-delete" aria-hidden="true" @click="delNote(note,true)" title="删除" plain></el-button>
        <font-drawer :isShow="isShowFontDialog" @close="isShowFontDialog=false"></font-drawer>
        <screenShotDailog :img="img" @close="isShowScreenShotDialog =false" :isShow="isShowScreenShotDialog"></screenShotDailog>
    </div>
</template>

<script>
import func from "./index.js";
import fontDrawer from "@/components/mainPanel/main/navbar/fontDrawer";
import screenShotDailog from "@/components/mainPanel/main/navbar/screenShotDialog";
export default {
    components: { screenShotDailog, fontDrawer },
    data() {
        return {
            isShowFontDialog: false,
            isShowScreenShotDialog: false,
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
        mode() {
            return this.$store.state.noteMode;
        },
    },
    methods: {
        ...func,
    },
};
</script>

<style lang='scss' scoped>
.mobie-note-toolbar {
    display: flex;
    justify-content: space-around;

    .el-button {
        border: none;
        font-size: 1em;
        padding: 4px 20px;
    }
}
</style>