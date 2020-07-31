<template>
    <div class="plugin item noselect">
        <div class="itemHeader">
            <div class="title">
                <span>{{ data.name }}</span>
                <em class="tag">{{ data.version }}</em>
            </div>
            <el-tag type="success" size="mini" v-if="!data.status">
                <span>未安装</span>
            </el-tag>
            <el-tag type="primary" size="mini" v-if="data.status">
                <span>已安装</span>
            </el-tag>
        </div>
        <div class="itemContent">
            <small>{{ data.intro }}</small>
        </div>
        <div class="itemTool">
            <p class="author">{{ data.author }}</p>
            <el-dropdown trigger="click" @command="handle">
                <span class="el-dropdown-link">
                    <i class="el-icon-setting btn-setting"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="beforeHandleCommand('more')" v-if="data.status && !isEmptyObj(data.options)">配置</el-dropdown-item>
                    <el-dropdown-item v-for="(item,key) in pages" :key="key" :command="beforeHandleCommand('to',key)">{{item.name||key}}</el-dropdown-item>
                    <el-dropdown-item :command="beforeHandleCommand('install')" :divided="true">{{!data.status?"安装":"卸载"}}</el-dropdown-item>
                    <el-dropdown-item :command="beforeHandleCommand('remove')">删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data"],
    methods: {
        handle(command) {
            switch (command.command) {
                case "remove":
                    this.$store.commit("DELETE_PLUGIN", this.data);
                    break;
                case "install":
                    this.install(this.data);
                    break;
                case "more":
                    if (this.isMobie) {
                        this.$router.push({
                            path: `/m/plugins/${this.data.id}`,
                        });
                    } else {
                        this.$router.push({
                            path: `/plugins/${this.data.id}`,
                        });
                    }
                    break;
                case "to":
                    this.to(command.params);
                    break;
            }
        },
        beforeHandleCommand(method, params) {
            return {
                params: params,
                command: method,
            };
        },
        install(plugin) {
            this.$confirm("改变插件状态将会重载环境，是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "info",
            })
                .then(() => {
                    this.$store.dispatch("PLUGIN_INSTALL_UNSTALL", plugin);
                    this.$utils.reload();
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消安装",
                    });
                });
        },
        isEmptyObj(obj) {
            for (var key in obj) {
                if ({}.hasOwnProperty.call(obj, key)) return false;
            }
            return true;
        },
        to(name) {
            if (this.isMobie) {
                this.$router.push({
                    path: `/m/plugins/${this.data.id}/${name}`,
                });
            } else {
                this.$router.push({
                    path: `/plugins/${this.data.id}/${name}`,
                });
            }
        },
    },
    computed: {
        isMobie() {
            return this.$store.state.isMobie;
        },
        pages() {
            let plugin = this.$plugins.options[this.data.id] || {};
            return plugin.pages || {};
        },
    },
};
</script>

<style lang="scss" scoped>
.item {
    box-sizing: border-box;
    padding: 15px 24px;
    border: 1px solid transparent;
    border-bottom: 1px solid #d9d9d9;
    position: relative;
    color: #333;
    cursor: pointer;

    &:hover {
        border-color: $theme-color;
    }
    .itemHeader {
        display: flex;
        justify-content: space-between;
        .title .tag {
            font-style: normal;
            color: #adacac;
            font-size: 14px;
            margin-left: 10px;
        }
    }

    .itemContent {
        margin: 15px 0px;
        color: #878787;
        overflow: hidden;

        small {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }
    .itemTool {
        display: flex;
        align-items: center;
        margin: 10px 0px 0px;

        i.btn-setting {
            color: #878787;
            font-size: 18px;
            margin: 0px 10px;
        }
        .author {
            flex: 1;
            font-weight: 600;
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            color: #878787;
            margin: 0px;
        }
    }
}
</style>