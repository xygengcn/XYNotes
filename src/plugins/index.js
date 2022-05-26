/**
 * xy笔记插件拓展
 * 版本v2.0.0
 */
import Vue from "vue";
import store from "../store";
var vue = new Vue();
var plugins = function() {
    this.pages = {};
    this.options = {};
    this.localOptions = {};
    //读取本地配置
    this.localOption = (plugins) => {
        for (let item of plugins) {
            this.localOptions[item.id] = item.options;
        }
    };
    //获取插入配置
    this.option = (plugins) => {
        if (plugins.id) {
            this.options[plugins.id] = this.options[plugins.id] || {};
            this.options[plugins.id]["options"] = this.options[plugins.id]["options"] || {};
            this.localOptions[plugins.id] = this.localOptions[plugins.id] || {};
            for (let key in plugins.options) {
                if (typeof plugins.options[key] == "object") {
                    this.localOptions[plugins.id][key] = this.localOptions[plugins.id][key] || null;
                    this.options[plugins.id]["options"][key] = this.localOptions[plugins.id][key] || plugins.options[key]
                }
                if (typeof plugins.options[key] == "string") {
                    this.options[plugins.id]["options"][key] = this.options[plugins.id][key] || {};
                    this.localOptions[plugins.id][key] = this.localOptions[plugins.id][key] || {};
                    this.options[plugins.id]["options"][key].label = this.localOptions[plugins.id][key].label || key;
                    this.options[plugins.id]["options"][key].value = this.localOptions[plugins.id][key].value || plugins.options[key];
                }
            }
            store.commit("ADD_PLUGINS_Page", {
                id: plugins.id,
                page: plugins.pages || {}
            });
        }
        return this;
    };
    this.css = (css) => {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        try {
            style.appendChild(document.createTextNode(css));
        } catch (ex) {
            style.styleSheet.cssText = css;
        }
        document.querySelector('head').appendChild(style);
    };
    this.html = (arr) => {
        var keys = ["childs", "element", "data"];
        let el = document.createElement("div");
        let create = (el, arr) => {
            arr.forEach(item => {
                var element = document.createElement(item.element);
                for (let key in item) {
                    if (keys.indexOf(key) == -1) {
                        element[key] = item[key];
                    }
                    if (key == "data") {
                        for (let dataKey in item[key]) {
                            element["data-" + dataKey] = item[key][dataKey];
                        }
                    }
                }
                if (item.childs) {
                    create(element, item.childs)
                }
                el.appendChild(element);
            });
        }
        create(el, arr);
        return el.innerHTML;
    };
    //接口
    this.hook = (hook, args = []) => {
        let h = eval("plugins." + hook);
        if (typeof h == "function") {
            var funcArray = Object.getOwnPropertyNames(h.prototype);
            var obj = new h(...args);
            for (var funcName of funcArray) {
                if (!obj.hasOwnProperty(funcName) && funcName != "constructor") {
                    let func = eval("obj." + funcName);
                    if (typeof func == "function") {
                        func.call(vue, this.options[funcName].options || {}, ...args);
                    }
                }
            }
        } else {
            console.error("插件：" + hook + '生命周期不存在！');
        }
    };
    //新插件插入
    this.extend = (plugin) => {
        if (plugin.id && typeof plugin.id == "string") {
            this.option(plugin);
            var plugin_prototype = Object.getOwnPropertyNames(plugin);
            plugin_prototype.forEach(item => {
                if (typeof plugin[item] == "function") {
                    let h = eval("plugins." + item);
                    if (typeof h == "function") {
                        h.prototype[plugin.id] = plugin[item];
                    } else {
                        console.error("插件：" + item + '生命周期不存在！')
                    }
                }
            })
        } else {
            console.error("插件：没有命名插件")
        }
    };
    //安装插件
    this.install = (plugin = {}) => {
        return new Promise(resolve => {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = 'async';
            script.src = plugin.url + "?v=" + plugin.version;
            script.id = 'plugin-script-' + plugin.id;
            script.dataset.name = plugin.name;
            document.body.appendChild(script);
            if (script.readyState) { //IE
                script.onreadystatechange = function() {
                    if (script.readyState == 'complete' || script.readyState == 'loaded') {
                        script.onreadystatechange = null;
                        resolve();
                    }
                }
            } else { //非IE
                script.onload = function() {
                    resolve();
                }
            }
        })

    };
    //初始化插件
    this.init = (array) => {
        this.localOption(array);
        return new Promise((resolve) => {
            Promise.all(array.map((element) => {
                if (element.status) {
                    return this.install(element)
                }
            })).then(() => {
                resolve();
            })
        })
    };
    //数据处理
    this.handle = (array = []) => {
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
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = i + 1; j < array.length; j++) {
                if (array[i].id == array[j].id && versionCompare(array[i].version, array[j].version)) {
                    array[i].options = JSON.parse(JSON.stringify(array[j].options));
                    array[i].status = array[j].status;
                    array.splice(j--, 1);
                }
                if (array[i].id == array[j].id && !versionCompare(array[i].version, array[j].version)) {
                    array[j].options = JSON.parse(JSON.stringify(array[i].options));
                    array[j].status = array[i].status;
                    array.splice(i--, 1);
                }
            }
        }
        return array;
    }
};

/**
 * 接口集
 */

/**
 * 界面初始化
 */
plugins.start = function() {
    this.name = "start";

}

/**
 * 路由跳转前
 */
plugins.beforeEach = function(args) {


}

/**
 * 路由跳转后
 */
plugins.afterEach = function(args) {


}

/**
 * 自动保存后
 */
plugins.saved = function(data) {

}

/**
 * 进入自定义页面后
 */
plugins.enterPage = function(data) {

}
export default new plugins;