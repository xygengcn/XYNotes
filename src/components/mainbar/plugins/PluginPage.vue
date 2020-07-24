<template>
    <page :title="data.name" :icon="'el-icon-s-grid'" class="plugin">
        <ul>
            <li class="btn">
                <el-button type="success" v-if="!data.status" @click="pluginSwitch(true)">开启</el-button>
                <el-button type="danger" v-if="data.status" @click="pluginSwitch(false)">关闭</el-button>
            </li>
        </ul>
    </page>
</template>

<script>
import page from "@/components/mainbar/common/Page";
export default {
    components: {
        page,
    },
    methods: {
        pluginSwitch(status) {
            this.data.status = status;
        },
    },
    computed: {
        data() {
            let plugins = this.$store.state.data.plugins;
            return plugins.find((item) => {
                return item.id == this.$route.params.id;
            });
        },
    },
};
</script>

<style scoped>
.plugin ul li {
    margin: 15px 0px;
}
.btn {
    text-align: center;
}
</style>