<!-- 插件库 -->
<template>
    <component :is="component"></component>
</template>

<script>
import home from "./home";
import options from "./options";
import page from "./page";
export default {
    components: { home, options, page },
    computed: {
        component() {
            return this.$store.state.plugins.component;
        },
    },
};
</script>

<style lang='scss' scoped>
</style>