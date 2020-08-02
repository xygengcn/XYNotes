export default {
    mutations: {
        //添加插件
        ADD_PLUGIN(state, plugin) {
            state.data.plugins.push(plugin);
            this.dispatch("SAVE_DATA_ITEM", "plugins");
        },
        SET_PLUGIN_STATUS(state, plugin) {
            plugin.status = !plugin.status;
        },
        //删除插件
        DELETE_PLUGIN(state, plugin) {
            for (var i = 0, len = state.data.plugins.length; i < len; i++) {
                if (state.data.plugins[i] == plugin) {
                    state.data.plugins.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem("XYNOTESPLUGINS", JSON.stringify(state.data.plugins));
            console.success("已成功删除插件：" + plugin.id);
        },
        SET_PLUGINS(state) {
            let plugins = JSON.parse(localStorage.getItem("XYNOTESPLUGINS")) || [];
            plugins = plugins.concat(state.data.plugins);
            state.data.plugins = $plugins.handle(plugins);
        }
    },
    actions: {
        PLUGIN_INSTALL_UNSTALL(content, plugin) {
            content.commit("SET_PLUGIN_STATUS", plugin);
            content.dispatch("SAVE_DATA_ITEM", "plugins");
        },
        SAVE_PLUGIN_OPTIONS(content, {
            plugin,
            options
        }) {
            plugin.options = options;
            content.dispatch("SAVE_DATA_ITEM", "plugins");
        }
    }

}