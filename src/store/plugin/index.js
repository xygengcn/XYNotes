export default {
    mutations: {
        //设置页面
        SET_PLUGINS_COMPONENT(state, component) {
            state.plugins.component = component
        },
        //添加插件
        ADD_PLUGIN(state, plugin) {
            state.data.plugins.push(plugin);
            this.dispatch("SAVE_DATA_ITEM", "plugins");
        },
        //安装
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
        //保存配置
        SET_PLUGINS(state) {
            let plugins = JSON.parse(localStorage.getItem("XYNOTESPLUGINS")) || [];
            plugins = plugins.concat(state.data.plugins);
            state.data.plugins = $plugins.handle(plugins);
        },
        //当前编辑插件
        SET_PLUGIN(state, plugin) {
            state.plugins.plugin = plugin;

        },
        //进入页面
        SET_PLUGINS_PAGE(state, page) {
            state.plugins.page = page;
        },
        //页面加入缓存
        ADD_PLUGINS_Page(state, {
            id,
            page
        }) {
            state.plugins.pages[id] = page;
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