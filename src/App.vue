<template>
    <div id="app" :class="{'dark':isDark}" v-loading="loading.status" :element-loading-text="loading.text" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <router-view></router-view>
    </div>
</template>
<script>
import { Loading } from "element-ui";
export default {
    data() {
        return {
            isLoading: false,
        };
    },
    computed: {
        isMobie() {
            return this.$store.state.isMobie;
        },
        isDark() {
            return this.$store.state.data.configs.isDark;
        },
        plugins() {
            return this.$store.state.data.plugins;
        },
        loading() {
            return this.$store.state.loading;
        },
    },
    created() {
        this.$store.commit("SET_LOADING_Tips", true, "正在加载插件");
        this.$store.dispatch("START_INIT");
        console.debug("开始加载插件环境");
        this.$plugins.init(this.plugins).then(() => {
            this.$store.commit("SET_LOADING_Tips", false);
            this.$plugins.hook("start");
            console.success("插件成功加载完成");
        });
    },
};
</script>