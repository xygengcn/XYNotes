<template>
    <page title="关于" icon="el-icon-info">
        <div class="body" slot="body">
            <el-link href="https://xygeng.cn/post/294.html" target="_blank" :underline="false">关注博客</el-link>
            <div class="version">
                Copyright &copy; 2020 Version {{ version }} By
                <el-link href="https://github.com/xygengcn/XYNotes" target="_blank" :underline="false" class="github">XYGENGCN</el-link>
            </div>
        </div>
    </page>
</template>

<script>
import page from "@/components/mainbar/common/Page";
export default {
    components: {
        page,
    },
    computed: {
        version() {
            return this.$store.state.data.version;
        },
    },
};
</script>

<style lang="scss" scoped>
.body {
    margin: 40px 0px;
    text-align: center;
    .version {
        position: absolute;
        bottom: 0;
        width: 100%;
        margin: 10px 0px 20px;
        font-size: 12px;
        text-align: center;
    }
    .version .github {
        font-size: 12px;
        color: #878787;
    }
}
</style>