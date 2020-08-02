<template>
    <page v-if="data" :title="data.name || pageID" :icon="'el-icon-s-grid'" class="plugin">
        <div slot="body" v-html="html || data.html" class="body"></div>
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
        pageID() {
            return this.$route.params.pageID;
        },
        data() {
            let plugin = this.$plugins.options[this.$route.params.id] || {};
            plugin["pages"] = plugin["pages"] || {};
            return plugin["pages"][this.pageID];
        },
    },
    components: {
        page,
    },
    methods: {},
    beforeCreate() {
        if (!this.data) {
            this.$router.push("/plugins");
            return true;
        }
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
.body {
    width: 100%;
    position: relative;
}
</style>