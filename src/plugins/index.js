/**
 * xy笔记插件拓展
 * 需要将window.vue指向vue对象
 */
var plugins = function() {
    this.options = {};
    this.localOptions = {};
    //读取本地配置
    this.localOption = (plugins) => {
        for (let item of plugins) {
            this.localOptions[item.id] = item.options;
        }
    };
    //获取插入配置
    this.option = (options) => {
        if (options.id) {
            this.options[options.id] = this.options[options.id] || {};
            this.localOptions[options.id] = this.localOptions[options.id] || {};
            for (let key in options) {
                if (key == "id" || typeof options[key] == "object") {
                    this.localOptions[options.id][key] = this.localOptions[options.id][key] || null;
                    this.options[options.id][key] = this.localOptions[options.id][key] || options[key]
                }
                if (key != "id" && typeof options[key] == "string") {
                    this.options[options.id][key] = this.options[options.id][key] || {};
                    this.localOptions[options.id][key] = this.localOptions[options.id][key] || {};
                    this.options[options.id][key].label = this.localOptions[options.id][key].label || key;
                    this.options[options.id][key].value = this.localOptions[options.id][key].value || options[key];
                }

            }
            //this.options[options.id] = Object.assign(this.options[options.id] || {}, options);
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
    this.html = (el, arr) => {
        var keys = ["childs", "element", "data"];
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
                this.html(element, item.childs)
            }
            el.appendChild(element);
        });
    };
    //接口
    this.hook = (hook, args = []) => {
        let h = eval("plugins." + hook);
        return new Promise((resolve, reject) => {
            if (typeof h == "function") {
                var funcArray = Object.getOwnPropertyNames(h.prototype);
                var obj = new h(...args);
                for (var funcName of funcArray) {
                    if (!obj.hasOwnProperty(funcName) && funcName != "constructor") {
                        let func = eval("obj." + funcName);
                        if (typeof func == "function") {
                            resolve(func.call(window.vue, this.options[funcName] || {}, ...args));
                        }
                    }
                }
            } else {
                reject(hook + '生命周期不存在！');
                console.error(hook + '生命周期不存在！');
            }
        })
    };
    //新插件插入
    this.extend = (hook, name, func) => {
        if (name && typeof name == "string") {
            let h = eval("plugins." + hook);
            if (typeof h == "function") {
                if (typeof func == "function") {
                    h.prototype[name] = func;
                } else
                    console.error(name + '函数不存在！')
            } else {
                console.error(hook + '生命周期不存在！')
            }
        } else {
            console.error('没有命名接口')
        }

    };
    //安装插件
    this.install = (plugin = {}) => {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = plugin.url + "?v=" + plugin.version;
        script.id = 'plugin-script-' + plugin.id;
        script.dataset.name = plugin.name;
        document.body.appendChild(script);
    };
    //初始化插件
    this.init = (array) => {
        this.localOption(array);
        array.forEach(element => {
            if (element.status) {
                this.install(element);
            }
        });
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

// exports.install = function (Vue, opt) {
//     Vue.prototype.$plugins = plugins;
// }
export default new plugins;