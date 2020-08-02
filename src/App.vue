<template>
    <div id="app" :class="{'mobie':isMobie,'dark':isDark}">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
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