<template>
    <page title="关于" icon="el-icon-info">
        <div class="body" slot="body">
            <div class="text marked" v-html="text"></div>
            <div class="version">
                <div class="blog">
                    <el-link href="https://xygeng.cn/post/294.html" target="_blank" :underline="false">关注博客</el-link>
                </div>
                Copyright &copy; 2020 Version {{ version }} By
                <el-link href="https://github.com/xygengcn/XYNotes" target="_blank" :underline="false" class="github">XYGENGCN</el-link>
            </div>
        </div>
    </page>
</template>
<script>
import page from "@/components/mainbar/components/Page";
import text from "@/components/mainbar/setting/about/updata.js";
import markdown from "@/utils/markdown/markdown";
export default {
    components: {
        page,
    },
    computed: {
        text() {
            return markdown(text);
        },
        version() {
            return this.$store.state.data.version;
        },
    },
};
</script>
<style lang="scss" scoped>
.body {
    .text {
        padding: 10px 10px;
        font-size: 14px;
        color: #878787;
    }
    .version {
        width: 100%;
        margin: 10px 0px 20px;
        font-size: 12px;
        text-align: center;
        .github {
            font-size: 12px;
            color: #878787;
        }
        .blog {
            margin: 40px 0px 10px;
            text-align: center;
        }
    }
}
</style>