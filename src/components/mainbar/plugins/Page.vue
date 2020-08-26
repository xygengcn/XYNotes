<template>
    <page v-if="data" :title="data.name ||data.id" :icon="'el-icon-s-grid'" class="page">
        <div slot="body" v-html="html || data.html" class="body"></div>
        <div slot="footer" class="footer">
            <span @click="back()">返回列表</span>
        </div>
    </page>
</template>

<script>
import page from "@/components/mainbar/components/Page";
export default {
    data() {
        return {
            html: null,
        };
    },
    computed: {
        data() {
            return this.$store.state.plugins.page;
        },
    },
    components: {
        page,
    },
    methods: {
        back() {
            this.$store.commit("SET_PLUGINS_COMPONENT", "home");
        },
    },
    beforeMount() {
        this.$plugins.hook("enterPage", [
            (pageID, obj) => {
                if (pageID == this.pageID) {
                    if (typeof obj == "string") {
                        this.html = obj;
                    } else if (typeof obj == "object") {
                        this.html = this.$plugins.html(obj);
                    }
                }
            },
        ]);
    },
};
</script>

<style lang="scss" scoped>
.page {
    .body {
        width: 100%;
        position: relative;
    }
    .footer {
        text-align: center;
        line-height: 50px;
        cursor: pointer;
    }
}
</style>