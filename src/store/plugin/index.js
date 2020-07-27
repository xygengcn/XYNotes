export default {
    mutations: {
        //添加插件
        addPlugin(state, plugin) {
            state.data.plugins.push(plugin);
        },
        SET_PLUGIN_STATUS(state, plugin) {
            plugin.status = !plugin.status;
        },
        DELETE_PLUGIN(state, plugin) {
            for (var i = 0, len = state.data.plugins.length; i < len; i++) {
                if (state.data.plugins[i] == plugin) {
                    state.data.plugins.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem("XYNOTESPLUGINS", JSON.stringify(state.data.plugins));
        },
        SET_PLUGINS(state) {
            let plugins = JSON.parse(localStorage.getItem("XYNOTESPLUGINS")) || [];

            plugins = plugins.concat(state.data.plugins);

            let versionCompare = function(a, b) {
                a = a.split(".");
                b = b.split(".");
                if (a.length > b.length) {
                    return true;
                } else if (a.length < b.length) {
                    return false;
                } else {
                    for (let key in a) {
                        if (a[key] > b[key]) {
                            return true;
                        }
                        if (a[key] < b[key]) {
                            return false;
                        }
                    }
                    return false;
                }
            }
            for (let i = 0; i < plugins.length - 1; i++) {
                for (let j = i + 1; j < plugins.length; j++) {
                    if (plugins[i].id == plugins[j].id && versionCompare(plugins[i].version, plugins[j].version)) {
                        plugins[i].options = JSON.parse(JSON.stringify(plugins[j].options));
                        plugins[i].status = plugins[j].status;
                        plugins.splice(j--, 1);
                    }
                    if (plugins[i].id == plugins[j].id && !versionCompare(plugins[i].version, plugins[j].version)) {
                        plugins[j].options = JSON.parse(JSON.stringify(plugins[i].options));
                        plugins[j].status = plugins[i].status;
                        plugins.splice(i--, 1);
                    }
                }
            }
            state.data.plugins = plugins;
        }
    },
    action: {
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