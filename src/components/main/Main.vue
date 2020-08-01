<template>
    <div class="main">
        <navbar @editMode="editMode" @fullScreen="fullScreen =!fullScreen" @Triggle="Triggle" :mode="mode"></navbar>
        <div class="mainContent" :class="{fullScreen:fullScreen}">
            <EditTextarea v-if="mode==1 || mode ==2" class="panel" id="EditTextarea"></EditTextarea>
            <ViewTextarea v-if="mode==0 || mode ==2" class="panel" id="ViewTextarea" :activeNoteText="note" @editMode="editMode"></ViewTextarea>
            <div class="closeFullScreen" v-if="fullScreen" @click="fullScreen =false">
                <el-tooltip effect="dark" content="关闭全屏" placement="top">
                    <i class="el-icon-circle-close"></i>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>
<script>
import navbar from "@/components/main/navbar/Home";
import EditTextarea from "@/components/main/edit/Home";
import ViewTextarea from "@/components/main/view/Home";
export default {
    components: {
        navbar,
        EditTextarea,
        ViewTextarea,
    },
    data() {
        return {
            mode: 0,
            fullScreen: false,
        };
    },
    computed: {
        note() {
            return this.$store.state.note;
        },
    },
    methods: {
        editMode(mode) {
            this.mode = mode;
        },
        Triggle(is) {
            this.$emit("Triggle", is);
        },
    },
    mounted() {
        this.$store.commit("ADD_NOTE_HISTORY", this.note.nid);
    },
};
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    height: 100%;
    max-height: 100%;
    flex-direction: column;
}
.mainContent {
    flex: 1;
    height: 100%;
    display: flex;
    position: relative;
    margin-bottom: 20px;
    overflow: hidden;
}

.mainContent .panel {
    flex: 1;
    min-width: 50%;
}

.fullScreen {
    position: fixed;
    background: #fff;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}

.closeFullScreen {
    width: 3em;
    height: 3em;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
    margin: auto;
    cursor: pointer;
    color: #888;
}

.closeFullScreen i {
    font-size: 3em;
}

.closeFullScreen:hover {
    opacity: 0.8;
    border: none;
}
</style>