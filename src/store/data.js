//数据保存处理中心
var storage ={};


exports.install = function (Vue) {
    Vue.prototype.$storage = storage;
}