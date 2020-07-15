/**
 * xy笔记插件拓展
 */
var plugins = {
    name: 'XYNotes',
    css: (css) => {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        try {
            style.appendChild(document.createTextNode(css));
        } catch (ex) {
            style.styleSheet.cssText = css;
        }
        document.querySelector('head').appendChild(style);
    },
    html: (el, arr) => {
        var keys = ["childs", "element"];
        arr.forEach(item => {
            var element = document.createElement(item.element);
            for (let key in item) {
                if (keys.indexOf(key) == -1) {
                    element[key] = item[key];
                }
            }
            if (item.childs) {
                this.html(element, item.childs)
            }
            el.appendChild(element);
        });
    },
    //接口
    hook: (hook, args = []) => {
        let h = eval("plugins." + hook);
        return new Promise((resolve, reject) => {
            if (typeof h == "function") {
                var funcArray = Object.getOwnPropertyNames(h.prototype);
                var obj = new h(...args);
                for (var funcName of funcArray) {
                    if (!obj.hasOwnProperty(funcName) && funcName != "constructor") {
                        let func = eval("obj." + funcName);
                        if (typeof func == "function")
                        resolve(func.call(obj, ...args));
                    }
                }
            } else {
                reject(hook + '生命周期不存在！');
            }
        })
    },
    //新插件插入
    extend: (hook, func) => {
        let h = eval("plugins." + hook);
        if (typeof h == "function") {
            if (typeof func == "function")
                h.prototype.func = func;
            else
                console.error(func + '不存在！')
        } else {
            console.error(hook + '生命周期不存在！')
        }
    },
    //安装插件
    install: (plugin = {}) => {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = plugin.url;
        script.id = plugin.id;
        script.dataset.name = plugin.name;
        document.body.appendChild(script);
    },
    //初始化插件
    init: (array) => {
        array.forEach(element => {
            if (element.status){
                plugins.install(element);
            }
        });
    }
};

/**
 * 接口集
 */

/**
 * 界面初始化
 */
plugins.start = function () {

}

/**
 * 路由跳转前
 */
plugins.beforeEach = function (args) {


}

// exports.install = function (Vue, opt) {
//     Vue.prototype.$plugins = plugins;
// }
export default plugins;