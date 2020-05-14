var utils ={}

utils.getTime = function (timestamp, format) {
    var date = timestamp ? timestamp : new Date();
    var timestamp = date.getTime();
    var year = String(date.getFullYear()).padStart(4, "0"); //获取当前年份
    var month = date.getMonth() + 1; //获取当前月份
    var day = date.getDate(); //获取当前日
    var weekday = date.getDay(); //获取当前星期几
    var hour = date.getHours(); //获取小时
    var minute = date.getMinutes(); //获取分钟
    var second = date.getSeconds().toString().padStart(2, "0"); //获取秒
    switch (format) {
        case 'yyy-MM-dd HH:mm:ss': return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second; break;
        case 'yyy-MM-dd': return year + "-" + month + "-" + day; break;
        case 'HH:mm:ss': return hour + ":" + minute + ":" + second; break;
        default: return timestamp; break;
    }
}

exports.install = function (Vue, opt) {
    Vue.prototype.$utils = utils;
}