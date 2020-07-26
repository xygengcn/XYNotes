export default {
    mutations: {
        //添加插件
        addPlugin(state, plugin) {
            state.data.plugins.push(plugin);
        },
        setPluginStatus(state, plugin) {
            plugin.status = !plugin.status;
        }
    },
    action: {
        PLUGIN_INSTALL_UNSTALL(content, plugin) {
            content.commit("setPluginStatus", plugin);
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