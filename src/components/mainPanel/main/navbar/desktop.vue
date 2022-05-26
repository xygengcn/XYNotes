<!-- 桌面工具栏 -->
<template>
    <div class="navbar" id="navbar">
        <div class="toolBar">
            <p style="padding: 0px 10px;">
                <el-button class="el-icon-view" @click="setMode(0)" v-if="mode != 0" title="预览模式" plain></el-button>
                <el-button class="el-icon-edit" @click="setMode(1)" v-if="mode == 0" title="编辑模式" plain></el-button>
                <el-button @click="setMode(2)" title="双屏模式" plain>MD</el-button>
                <el-button class="el-icon-unlock" v-if="!note.password" @click="lock()" title="未加密" plain></el-button>
                <el-button class="el-icon-lock" v-if="note.password" @click="lock()" title="已加密" plain></el-button>
                <el-button :class="note.mark?'el-icon-star-on':'el-icon-star-off'" @click="markNote(note)" title="标记" plain></el-button>
                <el-button class="el-icon-camera-solid" @click="screenshot" title="截屏" plain></el-button>
                <el-button class="el-icon-full-screen" @click="fullScreen" title="全屏" plain></el-button>
                <el-button @click="isShowFontDialog=true" title="字体" plain>Aa</el-button>
                <el-button class="el-icon-delete" aria-hidden="true" @click="delNote(note)" title="删除" plain></el-button>
            </p>
        </div>
        <font-drawer :isShow="isShowFontDialog" @close="isShowFontDialog=false"></font-drawer>
        <screenShotDailog :img="img" @close="isShowScreenShotDialog =false" :isShow="isShowScreenShotDialog"></screenShotDailog>
    </div>
</template>

<script>
import fontDrawer from "@/components/mainPanel/main/navbar/fontDrawer";
import screenShotDailog from "@/components/mainPanel/main/navbar/screenShotDialog";
import func from "./index.js";
export default {
    props: {
        mode: {
            type: Number,
            default: 0,
        },
    },
    components: {
        fontDrawer,
        screenShotDailog,
    },
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
    },
    methods: {
        ...func,
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
    padding-left: 40px;

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
