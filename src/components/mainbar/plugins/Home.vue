<template>
    <div id="plugins">
        <page :title="'插件库'" :icon="'el-icon-s-grid'">
            <div slot="header-right">
                <addPlugin></addPlugin>
            </div>
            <ul slot="body">
                <li class="ListItem" v-for="(item, index) in data" :key="index">
                    <plugin :data="item" :id="'plugin-' + item.id"></plugin>
                </li>
                <li v-if="data.length == 0" class="blank">插件为空</li>
            </ul>
        </page>
    </div>
</template>

<script>
import page from "@/components/mainbar/common/Page";
import plugin from "@/components/mainbar/plugins/Plugin";
import addPlugin from "@/components/mainbar/plugins/AddPlugin";
export default {
    components: {
        page,
        plugin,
        addPlugin,
    },
    computed: {
        data() {
            return this.$store.state.data.plugins;
        },
    },
    methods: {},
};
</script>

<style scoped>
#plugins {
    position: relative;
    height: 100%;
}
</style>