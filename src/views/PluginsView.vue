<template>
    <div id="plugins">
        <page-view :title="'插件库'" :icon="'el-icon-s-grid'">
            <ul>
                <li class="ListItem" v-for="(item,index) in data" :key="index">
                    <plugin-item :data="item"></plugin-item>
                </li>
                <li v-if="data.length==0" class="blank">文章为空</li>
            </ul>
        </page-view>

        <addPlugin></addPlugin>
    </div>
</template>

<script>
import PageView from "@/components/PageView";
import PluginItem from "@/components/plugins/PluginItem";
import addPlugin from "@/components/plugins/AddPlugin";
export default {
    components: {
        PageView,
        PluginItem,
        addPlugin
    },
    data() {
        return {};
    },
    computed: {
        data() {
            return this.$store.state.data.plugins;
        }
    },
    methods: {}
};
</script>

<style scoped>
#plugins {
    position: relative;
    height: 100%;
}
</style>