/**
 * xy笔记插件拓展
 */
var plugins = {
    name:'XYNotes',
    init: (hook,args=[]) => {
        let h = eval("plugins." + hook);
        if (typeof h == "function") {
            var funcArray = Object.getOwnPropertyNames(h.prototype);
            var obj = new h(...args);
            for (var funcName of funcArray) {
                if (!obj.hasOwnProperty(funcName) && funcName != "constructor") {
                    let func = eval("obj." + funcName);
                    if (typeof func == "function")
                        func.call(obj,...args);
                }
            }
        } else {
            console.error(hook + '生命周期不存在！')
        }
    },
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
    install:(url)=>{
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
    }
};

/**
 * 测试
 */
plugins.start = function () {
   
}

/**
 * 路由跳转前
 */
plugins.beforeEach =function (args){
    

}

// exports.install = function (Vue, opt) {
//     Vue.prototype.$plugins = plugins;
// }
export default plugins;