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
        this.$store.dispatch("init");
        this.$plugins.init(this.plugins);
    },
};
</script>