<template>
    <page :title="data.name" :icon="'el-icon-s-grid'" class="plugin">
        <div slot="header-right">
            <el-link :href="data.url" :underline="false" download><i class="el-icon-download" title="下载插件"></i></el-link>
        </div>
        <div class="body" slot="body">
            <ul class="plugin-options" v-if="options">
                <li class="option-item" v-for="(value,key) in options" :key="key">
                    <ul>
                        <li><label :for="key">{{value.label}}</label></li>
                        <li><input type="text" :name="key" v-model="value.value"></li>
                    </ul>
                </li>
                <li class="btn">
                    <el-button type="success" @click="save(data)">保存配置</el-button>
                </li>
            </ul>
        </div>
    </page>
</template>

<script>
import page from "@/components/mainbar/components/Page";
export default {
    components: {
        page,
    },

    methods: {
        save() {
            this.$store.dispatch("SAVE_PLUGIN_OPTIONS", {
                plugin: this.data,
                options: this.options,
            });
            this.$message({
                message: "保存成功",
                type: "success",
            });
        },
    },
    computed: {
        data() {
            let plugins = this.$store.state.data.plugins;
            return (
                plugins.find((item) => {
                    return item.id == this.$route.params.id;
                }) || {}
            );
        },
        options() {
            return this.$plugins.options[this.$route.params.id]["options"];
        },
    },
    beforeMount() {
        if (!this.data.status) {
            this.$router.push("/plugins");
            return true;
        }
    },
};
</script>

<style lang="scss" scoped>
.plugin {
    .body {
        .plugin-options {
            .option-item {
                li {
                    margin: 15px 10px;

                    label {
                        text-align: right;
                        vertical-align: middle;
                        float: left;
                        font-size: 14px;
                        color: #606266;
                        line-height: 40px;
                        padding: 0 5px;
                        box-sizing: border-box;
                    }

                    input {
                        display: inline-block;
                        border: none;
                        border: 1px solid #dcdfe6;
                        padding: 0 15px;
                        width: 100%;
                        font-size: inherit;
                        height: 40px;
                        line-height: 40px;
                        box-sizing: border-box;
                        border-radius: 4px;
                    }
                }
            }
        }
        .btn {
            margin: 30px 10px;
            overflow: hidden;
            text-align: center;
            button {
                width: 100%;
            }
        }
    }
}
</style>