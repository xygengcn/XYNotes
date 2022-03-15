<template>
    <el-dialog :visible.sync="isShow" :show-close="false" :close-on-click-modal="false" width="70%" center :modal-append-to-body="false" custom-class="imgShareDialog">
        <span slot="title">
            <i class="note-camera"></i>笔记截图分享
        </span>
        <div class="dialog-body">
            <img :src="img.url" class="downloadImg" />
        </div>
        <span slot="footer" class="dialog-footer">
            <a :href="img.download" :download="img.name">
                <el-button @click="close()" plain>保存截图</el-button>
            </a>
            <el-button @click="close()" plain>取消分享</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: ["img", "isShow"],
    data() {
        return {};
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
};
</script>

<style lang="scss" scoped>
.imgShareDialog {
    color: #878787;
    border-radius: 5px;

    i {
        margin: 0px 10px;
        color: #878787;
    }
    .dialog-body {
        max-height: 40vh;
        border: 1px solid $theme-color;
        overflow: auto;
        .downloadImg {
            width: 100%;
            margin: 0px auto;
        }
    }
    .dialog-footer {
        button {
            margin: 10px;
        }
    }
}
</style>